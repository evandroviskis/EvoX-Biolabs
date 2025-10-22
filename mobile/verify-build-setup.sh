#!/bin/bash

# EvoX Biolabs - Build Verification Script
# This script checks if your environment is ready for Play Store build

echo \"========================================\"
echo \"   EvoX Biolabs Build Verification\"
echo \"========================================\"
echo \"\"

# Color codes
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
NC='\\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Check Node.js
echo \"Checking Node.js...\"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e \"${GREEN}✓${NC} Node.js installed: $NODE_VERSION\"
else
    echo -e \"${RED}✗${NC} Node.js not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check Yarn
echo \"Checking Yarn...\"
if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn -v)
    echo -e \"${GREEN}✓${NC} Yarn installed: $YARN_VERSION\"
else
    echo -e \"${RED}✗${NC} Yarn not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check Java
echo \"Checking Java...\"
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo -e \"${GREEN}✓${NC} Java installed: $JAVA_VERSION\"
else
    echo -e \"${RED}✗${NC} Java not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check keytool
echo \"Checking keytool...\"
if command -v keytool &> /dev/null; then
    echo -e \"${GREEN}✓${NC} keytool available\"
else
    echo -e \"${RED}✗${NC} keytool not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check ANDROID_HOME
echo \"Checking ANDROID_HOME...\"
if [ -n \"$ANDROID_HOME\" ]; then
    echo -e \"${GREEN}✓${NC} ANDROID_HOME set: $ANDROID_HOME\"
    
    if [ -d \"$ANDROID_HOME\" ]; then
        echo -e \"${GREEN}✓${NC} ANDROID_HOME directory exists\"
    else
        echo -e \"${RED}✗${NC} ANDROID_HOME directory not found\"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e \"${RED}✗${NC} ANDROID_HOME not set\"
    ERRORS=$((ERRORS + 1))
fi

# Check Android SDK
echo \"Checking Android SDK...\"
if [ -n \"$ANDROID_HOME\" ] && [ -d \"$ANDROID_HOME/platform-tools\" ]; then
    echo -e \"${GREEN}✓${NC} Android SDK platform-tools found\"
else
    echo -e \"${RED}✗${NC} Android SDK platform-tools not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check ADB
echo \"Checking ADB...\"
if command -v adb &> /dev/null; then
    ADB_VERSION=$(adb version | head -n 1)
    echo -e \"${GREEN}✓${NC} ADB available: $ADB_VERSION\"
else
    echo -e \"${YELLOW}⚠${NC} ADB not found in PATH (optional for build)\"
    WARNINGS=$((WARNINGS + 1))
fi

# Check Gradle wrapper
echo \"Checking Gradle...\"
if [ -f \"android/gradlew\" ]; then
    echo -e \"${GREEN}✓${NC} Gradle wrapper found\"
    
    # Check if executable
    if [ -x \"android/gradlew\" ]; then
        echo -e \"${GREEN}✓${NC} Gradle wrapper is executable\"
    else
        echo -e \"${YELLOW}⚠${NC} Making Gradle wrapper executable...\"
        chmod +x android/gradlew
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e \"${RED}✗${NC} Gradle wrapper not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check node_modules
echo \"Checking dependencies...\"
if [ -d \"node_modules\" ]; then
    echo -e \"${GREEN}✓${NC} node_modules installed\"
else
    echo -e \"${YELLOW}⚠${NC} node_modules not found - run 'yarn install'\"
    WARNINGS=$((WARNINGS + 1))
fi

# Check package.json
echo \"Checking package.json...\"
if [ -f \"package.json\" ]; then
    echo -e \"${GREEN}✓${NC} package.json found\"
    
    # Extract app name
    APP_NAME=$(grep '\"name\"' package.json | head -1 | cut -d '\"' -f 4)
    echo \"   App name: $APP_NAME\"
else
    echo -e \"${RED}✗${NC} package.json not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check Android configuration
echo \"Checking Android configuration...\"
if [ -f \"android/app/build.gradle\" ]; then
    echo -e \"${GREEN}✓${NC} build.gradle found\"
    
    # Check package name
    PACKAGE_NAME=$(grep 'applicationId' android/app/build.gradle | cut -d '\"' -f 2)
    echo \"   Package: $PACKAGE_NAME\"
    
    # Check version
    VERSION_CODE=$(grep 'versionCode' android/app/build.gradle | awk '{print $2}')
    VERSION_NAME=$(grep 'versionName' android/app/build.gradle | cut -d '\"' -f 2)
    echo \"   Version: $VERSION_NAME ($VERSION_CODE)\"
else
    echo -e \"${RED}✗${NC} build.gradle not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check gradle.properties
echo \"Checking signing configuration...\"
if [ -f \"android/gradle.properties\" ]; then
    echo -e \"${GREEN}✓${NC} gradle.properties found\"
    
    if grep -q \"EVOXBIOLABS_RELEASE_STORE_FILE\" android/gradle.properties; then
        echo -e \"${GREEN}✓${NC} Release signing configured\"
    else
        echo -e \"${YELLOW}⚠${NC} Release signing not configured\"
        WARNINGS=$((WARNINGS + 1))
    fi
else
    echo -e \"${RED}✗${NC} gradle.properties not found\"
    ERRORS=$((ERRORS + 1))
fi

# Check for keystore
echo \"Checking keystore...\"
if [ -f \"android/app/evoxbiolabs-release-key.keystore\" ]; then
    echo -e \"${GREEN}✓${NC} Release keystore found\"
    
    # Get keystore info
    KEYSTORE_SIZE=$(du -h android/app/evoxbiolabs-release-key.keystore | cut -f1)
    echo \"   Keystore size: $KEYSTORE_SIZE\"
else
    echo -e \"${YELLOW}⚠${NC} Release keystore not found - needs to be generated\"
    echo \"   Run: cd android/app && keytool -genkeypair -v -storetype PKCS12 -keystore evoxbiolabs-release-key.keystore ...\"
    WARNINGS=$((WARNINGS + 1))
fi

# Check documentation
echo \"Checking documentation...\"
DOC_COUNT=0
[ -f \"BUILD_FOR_PLAYSTORE.md\" ] && DOC_COUNT=$((DOC_COUNT + 1))
[ -f \"PLAYSTORE_DEPLOYMENT.md\" ] && DOC_COUNT=$((DOC_COUNT + 1))
[ -f \"PLAYSTORE_CHECKLIST.md\" ] && DOC_COUNT=$((DOC_COUNT + 1))
[ -f \"KEYSTORE_INFO.md\" ] && DOC_COUNT=$((DOC_COUNT + 1))

echo -e \"${GREEN}✓${NC} Documentation files: $DOC_COUNT/4 found\"

echo \"\"
echo \"========================================\"
echo \"           Summary\"
echo \"========================================\"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e \"${GREEN}✓ All checks passed!${NC}\"
    echo \"Your environment is ready for building.\"
elif [ $ERRORS -eq 0 ]; then
    echo -e \"${YELLOW}⚠ $WARNINGS warning(s) found${NC}\"
    echo \"You can proceed but review warnings above.\"
else
    echo -e \"${RED}✗ $ERRORS error(s) found${NC}\"
    echo -e \"${YELLOW}⚠ $WARNINGS warning(s) found${NC}\"
    echo \"Please fix errors before building.\"
fi

echo \"\"
echo \"Next steps:\"
echo \"1. Review: BUILD_FOR_PLAYSTORE.md\"
echo \"2. Generate keystore (if not done)\"
echo \"3. Build release: cd android && ./gradlew bundleRelease\"
echo \"4. Submit to Play Store\"
echo \"\"

exit $ERRORS

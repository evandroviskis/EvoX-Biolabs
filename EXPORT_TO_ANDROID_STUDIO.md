# 📱 Export to Android Studio - Complete Guide

## 📦 Step 1: Download the Project

### Option A: Download Archive (Recommended)
1. Download the compressed file: `evoxbiolabs-mobile-app.tar.gz` (64 MB)
2. Extract it on your computer:
   ```bash
   # On Mac/Linux
   tar -xzf evoxbiolabs-mobile-app.tar.gz
   
   # On Windows
   # Use 7-Zip or WinRAR to extract
   ```

### Option B: Download Individual Files
Download the entire `/app/mobile/` folder including:
- `src/` - Source code
- `android/` - Android configuration
- `ios/` - iOS files (optional)
- `package.json` - Dependencies
- All documentation files

---

## 🛠️ Step 2: Install Prerequisites

### Required Software:

1. **Android Studio** (Latest version)
   - Download: https://developer.android.com/studio
   - Install with default settings
   - Include Android SDK and Android Virtual Device

2. **Java JDK 17**
   - Download: https://www.oracle.com/java/technologies/downloads/#java17
   - Or use OpenJDK: https://adoptium.net/

3. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node -v`

4. **Yarn Package Manager**
   ```bash
   npm install -g yarn
   ```

---

## 🔧 Step 3: Set Up Environment Variables

### On macOS/Linux:

Add to `~/.zshrc` or `~/.bashrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Apply changes:
```bash
source ~/.zshrc  # or ~/.bashrc
```

### On Windows:

1. Open "System Properties" → "Environment Variables"
2. Add new system variable:
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
3. Edit `Path` variable, add:
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

Verify:
```bash
echo $ANDROID_HOME    # Mac/Linux
echo %ANDROID_HOME%   # Windows
```

---

## 📂 Step 4: Open Project in Android Studio

### Method 1: Import Existing Project

1. **Launch Android Studio**
2. Click **"Open"** or **"Open an Existing Project"**
3. Navigate to your extracted folder
4. Select the **`mobile/android`** folder
5. Click **"Open"**
6. Wait for Gradle sync to complete

### Method 2: Using Terminal

```bash
cd /path/to/mobile
open -a "Android Studio" android   # Mac
# or
start android                       # Windows
```

---

## 🔨 Step 5: Install Dependencies

### In Terminal (in the `mobile` folder):

```bash
# Navigate to mobile folder
cd mobile

# Install Node.js dependencies
yarn install

# This will take 2-5 minutes
```

### Expected Output:
```
✔ Resolving packages
✔ Fetching packages
✔ Linking dependencies
✔ Building fresh packages
Done in 180.50s
```

---

## 🎮 Step 6: Set Up Android Emulator

### Create Virtual Device:

1. In Android Studio: **Tools** → **Device Manager**
2. Click **"Create Device"**
3. Select device: **Pixel 6 Pro** (recommended)
4. System image: **Android 13 (API 33)** or higher
5. Click **"Finish"**
6. Start the emulator

### Or Use Physical Device:

1. Enable **Developer Options** on Android phone:
   - Settings → About Phone
   - Tap "Build Number" 7 times
2. Enable **USB Debugging**:
   - Settings → Developer Options → USB Debugging
3. Connect phone via USB
4. Accept debugging prompt on phone

Verify device:
```bash
adb devices
# Should show your device
```

---

## ▶️ Step 7: Run the App

### Method 1: Using Terminal (Recommended)

```bash
cd mobile

# Start Metro bundler
yarn start

# In another terminal, run Android
yarn android
```

### Method 2: Using Android Studio

1. Open `mobile/android` folder in Android Studio
2. Wait for Gradle sync
3. Click green **"Run"** button (▶️)
4. Select emulator or device
5. App will build and launch

### First Build Time:
- **5-10 minutes** (downloads dependencies)
- Subsequent builds: 30 seconds - 2 minutes

---

## ✅ Step 8: Verify App is Working

Once the app launches, you should see:

1. **Bottom tabs**: Calculator, Saved Peptides, Settings
2. **Calculator tab**: 
   - Input fields for peptide amount
   - Bacteriostatic water input
   - Syringe size dropdown
   - Calculate button
3. **Test a calculation**:
   - Peptide Amount: 5 mg
   - Bacteriostatic Water: 2 ml
   - Syringe Size: 1ml (100 units)
   - Desired Dose: 0.25 mg
   - Click "Calculate Dosage"
   - Should show: 0.1 ml (10 units)

---

## 🏗️ Step 9: Build Release for Play Store

### Generate Keystore (First Time Only):

```bash
cd mobile/android/app

keytool -genkeypair -v -storetype PKCS12 \
  -keystore evoxbiolabs-release-key.keystore \
  -alias evoxbiolabs-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=EvoX Biolabs, OU=Development, O=EvoX Biolabs, L=San Francisco, ST=California, C=US"
```

Enter passwords when prompted (use: `Evox2024SecureKey`)

**🔐 CRITICAL: Backup this keystore immediately!**

### Build Release AAB:

```bash
cd mobile/android

# Clean previous builds
./gradlew clean

# Build release
./gradlew bundleRelease

# Wait 2-5 minutes
```

### Find Output:

```
mobile/android/app/build/outputs/bundle/release/app-release.aab
```

This AAB file is what you upload to Google Play Store!

---

## 🐛 Troubleshooting

### Issue: Gradle sync fails

**Solution:**
```bash
cd mobile/android
./gradlew clean
# In Android Studio: File → Invalidate Caches → Restart
```

### Issue: "SDK location not found"

**Solution:**
Create `mobile/android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk   # Mac
# OR
sdk.dir=C\:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk  # Windows
```

### Issue: "Command not found: adb"

**Solution:** 
Add Android SDK to PATH (see Step 3)

### Issue: Metro bundler fails

**Solution:**
```bash
cd mobile
rm -rf node_modules
yarn install
yarn start --reset-cache
```

### Issue: App crashes on launch

**Solution:**
```bash
# Check logs
adb logcat | grep ReactNative

# Clear app data
adb shell pm clear com.evoxbiolabs.peptidecalculator
```

### Issue: "Unable to load script"

**Solution:**
```bash
# Ensure Metro is running
yarn start

# In another terminal
yarn android
```

---

## 📱 Step 10: Test on Physical Device

### Over USB:

1. Enable USB debugging (see Step 6)
2. Connect device via USB
3. Run: `yarn android`
4. App installs and launches

### Wireless (ADB over WiFi):

```bash
# Connect device via USB first
adb tcpip 5555
adb connect YOUR_PHONE_IP:5555
# Disconnect USB, run
yarn android
```

---

## 📋 Project Structure in Android Studio

```
android/
├── app/
│   ├── src/main/
│   │   ├── java/              # Native Android code (if any)
│   │   ├── res/
│   │   │   ├── values/
│   │   │   │   └── strings.xml    # App name
│   │   │   ├── mipmap-*/          # App icons
│   │   │   └── layout/            # Native layouts
│   │   └── AndroidManifest.xml    # Permissions, activities
│   ├── build.gradle          # App configuration ⭐
│   └── proguard-rules.pro    # Code shrinking
├── gradle/                   # Gradle wrapper
├── build.gradle             # Project-level config
├── gradle.properties        # Build properties ⭐
└── settings.gradle          # Project settings
```

**⭐ Key files to know:**
- `app/build.gradle` - Version, package name, signing
- `gradle.properties` - Keystore credentials

---

## 🎨 Android Studio Tips

### Useful Shortcuts:

- **⌘/Ctrl + Shift + F** - Search in project
- **⌘/Ctrl + O** - Open file
- **Shift + Shift** - Search everywhere
- **⌘/Ctrl + R** - Run app
- **⌘/Ctrl + F9** - Build project

### View Project Files:

1. Click **"Project"** tab on left
2. Select **"Android"** view (dropdown at top)
3. Expand `app` → `java` → your package

### View Logs:

1. Click **"Logcat"** tab at bottom
2. Filter: `com.evoxbiolabs`
3. See all console.log and errors

### Edit Code:

- React Native code: `mobile/src/`
- Native code: `mobile/android/app/src/main/`
- Use VS Code for React code, Android Studio for native

---

## 📝 Checklist

- [ ] Android Studio installed
- [ ] Java JDK installed
- [ ] Node.js and Yarn installed
- [ ] ANDROID_HOME set correctly
- [ ] Project downloaded and extracted
- [ ] Dependencies installed (`yarn install`)
- [ ] Emulator created or device connected
- [ ] App runs successfully
- [ ] All features tested
- [ ] Keystore generated and backed up
- [ ] Release AAB built successfully
- [ ] Ready for Play Store submission

---

## 🆘 Need More Help?

### Documentation:
- **BUILD_FOR_PLAYSTORE.md** - Complete Play Store guide
- **PLAYSTORE_CHECKLIST.md** - Pre-submission checklist
- **KEYSTORE_INFO.md** - Keystore security guide

### Resources:
- React Native Docs: https://reactnative.dev/docs/environment-setup
- Android Studio Guide: https://developer.android.com/studio/intro
- Troubleshooting: https://reactnative.dev/docs/troubleshooting

### Common Commands:

```bash
# Install dependencies
yarn install

# Start Metro
yarn start

# Run on Android
yarn android

# Clear cache
yarn start --reset-cache

# Check dependencies
yarn list

# Update dependencies
yarn upgrade

# Build release
cd android && ./gradlew bundleRelease

# Clean build
cd android && ./gradlew clean
```

---

## 🎉 Success!

Once you see the app running on your emulator/device with all three tabs working (Calculator, Saved Peptides, Settings), you're ready to:

1. ✅ Test all features thoroughly
2. ✅ Build release AAB
3. ✅ Prepare graphics assets
4. ✅ Submit to Google Play Store

**Follow BUILD_FOR_PLAYSTORE.md for the complete submission guide!**

---

© 2024 EvoX Biolabs - Built with React Native

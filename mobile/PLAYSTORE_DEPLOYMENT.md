# EvoX Biolabs Peptide Calculator - Google Play Store Deployment Guide

## 📱 App Information
- **App Name:** EvoX Biolabs Peptide Calculator
- **Package Name:** com.evoxbiolabs.peptidecalculator
- **Version:** 2.0.0 (Version Code: 1)
- **Platform:** Android (Bare React Native)

## ✨ Features
- ✅ Precise peptide dosage calculations
- ✅ Save and manage multiple peptide calculations
- ✅ Support for different syringe sizes (1ml, 0.3ml, 3ml)
- ✅ Local data storage (AsyncStorage)
- ✅ Professional UI with Material Icons
- ✅ Offline functionality
- ✅ Settings with language and theme options

## 🚀 Prerequisites

### 1. Development Environment Setup
```bash
# Install Node.js (v18 or higher)
# Install JDK 17
# Install Android Studio

# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### 2. Google Play Developer Account
- Cost: $25 (one-time registration fee)
- Sign up at: https://play.google.com/console/signup

## 📦 Building the App

### Step 1: Install Dependencies
```bash
cd /app/mobile
yarn install
```

### Step 2: Generate Release Keystore
```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore evoxbiolabs-release-key.keystore -alias evoxbiolabs-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Important:** Save the keystore password and alias password securely!

### Step 3: Configure Gradle for Release Signing

Edit `android/gradle.properties` and add:
```properties
EVOXBIOLABS_RELEASE_STORE_FILE=evoxbiolabs-release-key.keystore
EVOXBIOLABS_RELEASE_KEY_ALIAS=evoxbiolabs-key-alias
EVOXBIOLABS_RELEASE_STORE_PASSWORD=YOUR_KEYSTORE_PASSWORD
EVOXBIOLABS_RELEASE_KEY_PASSWORD=YOUR_KEY_PASSWORD
```

Edit `android/app/build.gradle` and update the signingConfigs:
```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        if (project.hasProperty('EVOXBIOLABS_RELEASE_STORE_FILE')) {
            storeFile file(EVOXBIOLABS_RELEASE_STORE_FILE)
            storePassword EVOXBIOLABS_RELEASE_STORE_PASSWORD
            keyAlias EVOXBIOLABS_RELEASE_KEY_ALIAS
            keyPassword EVOXBIOLABS_RELEASE_KEY_PASSWORD
        }
    }
}
```

### Step 4: Build Release APK/AAB

#### For APK (Testing):
```bash
cd android
./gradlew assembleRelease
```
APK Location: `android/app/build/outputs/apk/release/app-release.apk`

#### For AAB (Google Play Store - Recommended):
```bash
cd android
./gradlew bundleRelease
```
AAB Location: `android/app/build/outputs/bundle/release/app-release.aab`

## 📝 Google Play Store Submission

### 1. Create App Listing
1. Go to Google Play Console
2. Click "Create app"
3. Fill in:
   - App name: **EvoX Biolabs Peptide Calculator**
   - Default language: English (United States)
   - App or game: App
   - Free or paid: Free

### 2. Store Listing Details

#### App Description (Short):
```
Professional peptide dosage calculator for precise laboratory calculations. Calculate draw amounts for different syringe sizes with bacteriostatic water reconstitution.
```

#### App Description (Full):
```
EvoX Biolabs Peptide Calculator is a professional-grade mobile application designed for accurate peptide dosage calculations in research and laboratory environments.

KEY FEATURES:
✓ Precise Dosage Calculations - Calculate exact draw amounts based on peptide concentration, bacteriostatic water volume, and desired dose
✓ Multiple Syringe Sizes - Support for 1ml (100 units), 0.3ml (30 units), and 3ml (300 units) syringes
✓ Save & Manage - Store multiple peptide calculations with custom names for easy reference
✓ Professional Interface - Clean, intuitive design optimized for mobile use
✓ Offline Functionality - All calculations and saved data work without internet connection
✓ Detailed Results - View draw amounts in both ml and units

PERFECT FOR:
- Research laboratories
- Clinical settings
- Pharmaceutical professionals
- Health & wellness practitioners

SAFETY NOTE:
Always follow proper laboratory protocols and consult healthcare professionals. This calculator is intended for professional use in appropriate settings.

© 2024 EvoX Biolabs - Professional Peptide Dosages
```

#### Category:
- **Medical** or **Health & Fitness**

#### Tags:
- peptide calculator
- dosage calculator
- medical calculator
- laboratory tools
- peptide reconstitution

### 3. Graphics Assets Required

#### App Icon (512x512 PNG):
- Must be created (currently using default React Native icon)
- Should feature the EvoX Biolabs branding with calculator/medical theme

#### Feature Graphic (1024x500):
- Required for store listing
- Should showcase the app name and key features

#### Screenshots (Required - at least 2):
- Phone screenshots: 1080x1920 or similar (16:9 ratio)
- Recommended: 4-6 screenshots showing:
  1. Calculator screen with sample calculation
  2. Saved peptides list
  3. Settings screen
  4. Results display

#### Optional:
- Promo video (YouTube link)
- Tablet screenshots
- Android TV screenshots

### 4. Content Rating
1. Complete the content rating questionnaire
2. Expected rating: **Everyone** or **Low maturity**
3. Disclose that it's a medical/health calculator

### 5. App Content
- Privacy Policy URL (if collecting data)
- Target audience: Adults (18+)
- App access: All functionality available without restrictions

### 6. Pricing & Distribution
- Free app
- Available in: All countries (or select specific countries)
- Content rating: Based on questionnaire

### 7. Upload Release
1. Go to "Production" track
2. Click "Create new release"
3. Upload the AAB file: `app-release.aab`
4. Add release notes:
```
Version 2.0.0
- Initial release of EvoX Biolabs Peptide Calculator
- Professional peptide dosage calculations
- Support for multiple syringe sizes
- Save and manage calculations
- Offline functionality
```

## 🔧 Testing Before Submission

### Internal Testing
1. Create "Internal testing" track in Play Console
2. Upload AAB
3. Add email addresses of testers
4. Testers will receive invite link

### Closed Testing
1. Create "Closed testing" track
2. Upload AAB
3. Share test link with beta testers
4. Gather feedback before production release

## 📋 Pre-Launch Checklist

- [ ] Test app on multiple Android devices (different screen sizes)
- [ ] Verify all calculations are accurate
- [ ] Test save/delete functionality
- [ ] Check all navigation flows
- [ ] Ensure app icon displays correctly
- [ ] Verify app name appears correctly
- [ ] Test orientation changes (portrait/landscape)
- [ ] Check for memory leaks
- [ ] Verify offline functionality
- [ ] Review all text for typos
- [ ] Test on Android 5.0 (minimum SDK) through latest version
- [ ] Prepare all graphics assets
- [ ] Write privacy policy (if needed)
- [ ] Complete content rating questionnaire
- [ ] Review Google Play policies compliance

## 🔐 Security & Compliance

### Google Play Policies to Review:
1. **User Data**: Since app uses AsyncStorage (local only), minimal data collection
2. **Health Claims**: Ensure no medical claims beyond calculator functionality
3. **Restricted Content**: Medical apps must comply with health regulations
4. **Privacy Policy**: Required if any data collected/transmitted

### Data Safety Section:
- Data collection: None (all data stored locally)
- Data sharing: None
- Security practices: Data encrypted in transit (N/A for offline)
- Data deletion: User can clear app data

## 📈 Post-Launch

### Monitor:
1. Crash reports in Play Console
2. User reviews and ratings
3. Download statistics
4. Performance metrics

### Future Updates:
1. Increment version code and version name
2. Build new AAB
3. Upload to production track
4. Add release notes

## 🆘 Troubleshooting

### Build Failures:
```bash
# Clean build
cd android
./gradlew clean
./gradlew assembleRelease
```

### Dependency Issues:
```bash
cd /app/mobile
rm -rf node_modules
rm yarn.lock
yarn install
```

### Android Studio Issues:
1. File > Invalidate Caches / Restart
2. Sync Project with Gradle Files
3. Rebuild Project

## 📞 Support Resources

- React Native Docs: https://reactnative.dev/docs/getting-started
- Google Play Console Help: https://support.google.com/googleplay/android-developer
- Android Developer Docs: https://developer.android.com

## 🎉 Success!

Once approved (typically 1-7 days), your app will be live on Google Play Store!

**Store URL Format:**
https://play.google.com/store/apps/details?id=com.evoxbiolabs.peptidecalculator

---

© 2024 EvoX Biolabs

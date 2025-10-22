# 🧬 EvoX Biolabs Peptide Calculator - Mobile App

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.82.0-61DAFB.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![Platform](https://img.shields.io/badge/platform-Android-green.svg)

**Professional peptide dosage calculator for research and laboratory use**

[Features](#-features) • [Installation](#-installation) • [Build](#-build-for-play-store) • [Documentation](#-documentation)

</div>

---

## 📱 About

EvoX Biolabs Peptide Calculator is a native Android application built with React Native, designed for accurate peptide dosage calculations in professional research and laboratory environments.

**Package Name:** `com.evoxbiolabs.peptidecalculator`
**Version:** 2.0.0
**Platform:** Android 6.0+ (API 23+)

## ✨ Features

### 💉 Dosage Calculator
- Precise peptide dosage calculations
- Support for multiple syringe sizes:
  - 1ml (100 units)
  - 0.3ml (30 units)
  - 3ml (300 units)
- Bacteriostatic water volume configuration
- Real-time calculation results in ml and units
- Professional calculation interface

### 💾 Saved Peptides
- Save unlimited calculations
- Custom naming for each calculation
- View all saved calculations in card format
- Delete unwanted calculations
- Detailed view for each saved peptide
- Pull-to-refresh functionality

### ⚙️ Settings
- Language selection (English)
- Theme selection (Light/Dark)
- App information and version
- Feature highlights
- About EvoX Biolabs

### 🔒 Privacy & Security
- 100% offline functionality
- No data collection or tracking
- All data stored locally on device
- No permissions required
- No account needed

## 🛠️ Technology Stack

- **Framework:** React Native 0.82.0 (Bare/Vanilla)
- **Language:** TypeScript
- **Navigation:** React Navigation (Bottom Tabs)
- **Storage:** AsyncStorage
- **Icons:** React Native Vector Icons (Material)
- **Platform:** Android (iOS compatible with minor changes)

## 📦 Installation

### Prerequisites

- Node.js 18+
- Yarn
- Android Studio
- Java JDK 17
- Android SDK (API 34)

### Setup

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Set up Android environment:**
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

4. **Run on Android:**
   ```bash
   # Start Metro bundler
   yarn start

   # In another terminal
   yarn android
   ```

## 🏗️ Build for Play Store

### Quick Build

```bash
# Run verification script
./verify-build-setup.sh

# Generate keystore (first time only)
cd android/app
keytool -genkeypair -v -storetype PKCS12 \
  -keystore evoxbiolabs-release-key.keystore \
  -alias evoxbiolabs-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000

# Build release AAB
cd android
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### Detailed Instructions

📖 **See [BUILD_FOR_PLAYSTORE.md](BUILD_FOR_PLAYSTORE.md)** for complete step-by-step instructions including:
- Environment setup
- Keystore generation
- Building release AAB
- Graphics assets preparation
- Google Play Console configuration
- Submission process

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [BUILD_FOR_PLAYSTORE.md](BUILD_FOR_PLAYSTORE.md) | Complete guide for building and submitting to Play Store |
| [PLAYSTORE_DEPLOYMENT.md](PLAYSTORE_DEPLOYMENT.md) | Detailed deployment and configuration guide |
| [PLAYSTORE_CHECKLIST.md](PLAYSTORE_CHECKLIST.md) | Pre-submission checklist and quality assurance |
| [KEYSTORE_INFO.md](KEYSTORE_INFO.md) | Keystore security and management guide |
| [CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md) | Technical details of web-to-mobile conversion |

## 🗂️ Project Structure

```
mobile/
├── android/                    # Android native code
│   ├── app/
│   │   ├── build.gradle       # App configuration
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── res/           # Resources (icons, strings)
│   └── gradle.properties      # Build configuration
├── src/
│   └── screens/
│       ├── CalculatorScreen.tsx      # Main calculator
│       ├── SavedPeptidesScreen.tsx   # Saved calculations
│       └── SettingsScreen.tsx        # App settings
├── App.tsx                    # App root with navigation
├── package.json              # Dependencies
└── Documentation files
```

## 🧪 Testing

### Run on Emulator
```bash
yarn android
```

### Build Debug APK
```bash
cd android
./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

### Run Tests
```bash
yarn test
```

## 🚀 Deployment

### Version Update

1. Update version in `android/app/build.gradle`:
   ```gradle
   versionCode 2          // Increment
   versionName "2.1.0"    // Update
   ```

2. Build new release:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

3. Upload to Play Console

### Google Play Store URL
```
https://play.google.com/store/apps/details?id=com.evoxbiolabs.peptidecalculator
```

## 📊 App Information

| Property | Value |
|----------|-------|
| Package Name | com.evoxbiolabs.peptidecalculator |
| App Name | EvoX Biolabs Peptide Calculator |
| Version | 2.0.0 |
| Min SDK | 23 (Android 6.0) |
| Target SDK | 34 (Android 14) |
| Architecture | arm64-v8a, armeabi-v7a, x86, x86_64 |

## 🔧 Development

### Available Scripts

```bash
yarn start          # Start Metro bundler
yarn android        # Run on Android
yarn test           # Run tests
yarn lint           # Lint code
```

### Hot Reload

- Press `R` twice to reload
- Press `Cmd + M` (Mac) or `Ctrl + M` (Windows/Linux) for dev menu

## 🐛 Troubleshooting

### Build Issues
```bash
cd android
./gradlew clean
./gradlew bundleRelease --stacktrace
```

### Dependencies
```bash
rm -rf node_modules
yarn install
```

### Android Studio
- File → Invalidate Caches / Restart
- Sync Project with Gradle Files

## 📞 Support

- **Documentation:** See markdown files in this directory
- **Issues:** Check build logs and error messages
- **Resources:**
  - [React Native Docs](https://reactnative.dev)
  - [Android Developer Docs](https://developer.android.com)
  - [Play Console Help](https://support.google.com/googleplay/android-developer)

## 🔐 Security

- Keystore file: **NEVER** commit to version control
- Passwords: Store securely in password manager
- Backups: Keep multiple backups of keystore
- See [KEYSTORE_INFO.md](KEYSTORE_INFO.md) for details

## 📄 License

Proprietary - © 2024 EvoX Biolabs

## 🎉 Ready to Launch?

1. ✅ Review [PLAYSTORE_CHECKLIST.md](PLAYSTORE_CHECKLIST.md)
2. ✅ Follow [BUILD_FOR_PLAYSTORE.md](BUILD_FOR_PLAYSTORE.md)
3. ✅ Build release AAB
4. ✅ Submit to Google Play Store
5. ✅ Monitor and respond to users

---

<div align="center">

**Built with ❤️ using React Native**

[Report Bug](https://github.com/evoxbiolabs/peptide-calculator/issues) • [Request Feature](https://github.com/evoxbiolabs/peptide-calculator/issues)

</div>
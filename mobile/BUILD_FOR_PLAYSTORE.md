# 🚀 Build & Upload to Google Play Store - Complete Guide

## ⚠️ IMPORTANT: Complete This On Your Local Computer

Google Play Store submission requires building the app on a machine with:
- Android SDK
- Java JDK
- Android Studio (recommended)

## 📋 Prerequisites Checklist

- [ ] Google Play Developer Account ($25 one-time fee)
- [ ] Android Studio installed
- [ ] Java JDK 17 installed
- [ ] Android SDK installed
- [ ] Node.js and Yarn installed

## 🔧 Step 1: Setup Development Environment

### Install Android Studio
1. Download from: https://developer.android.com/studio
2. Install and open Android Studio
3. Go to Settings → Appearance & Behavior → System Settings → Android SDK
4. Install:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android SDK Command-line Tools

### Set Environment Variables

**On macOS/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# Add to ~/.zshrc or ~/.bashrc to make permanent
```

**On Windows:**
```
ANDROID_HOME = C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
Path += %ANDROID_HOME%\platform-tools
Path += %ANDROID_HOME%\tools
```

## 📦 Step 2: Download and Setup Project

1. **Download the mobile folder from this workspace**
2. **Navigate to project:**
   ```bash
   cd mobile
   ```

3. **Install dependencies:**
   ```bash
   yarn install
   ```

4. **Test the app works:**
   ```bash
   # Start an Android emulator first, then:
   yarn android
   ```

## 🔐 Step 3: Generate Release Keystore

⚠️ **CRITICAL:** Keep this keystore safe! You'll need it for ALL future updates.

```bash
cd android/app

keytool -genkeypair -v -storetype PKCS12 \
  -keystore evoxbiolabs-release-key.keystore \
  -alias evoxbiolabs-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass Evox2024SecureKey \
  -keypass Evox2024SecureKey \
  -dname "CN=EvoX Biolabs, OU=Development, O=EvoX Biolabs, L=San Francisco, ST=California, C=US"
```

**Store these securely:**
- **Keystore file:** `evoxbiolabs-release-key.keystore`
- **Keystore password:** `Evox2024SecureKey`
- **Key alias:** `evoxbiolabs-key-alias`
- **Key password:** `Evox2024SecureKey`

💾 **BACKUP:** Copy keystore to a safe location (cloud storage, password manager, etc.)

## 🏗️ Step 4: Build Release AAB

### Clean Build (Recommended)
```bash
cd android
./gradlew clean
```

### Build AAB for Play Store
```bash
cd android
./gradlew bundleRelease
```

✅ **Output Location:**
```
android/app/build/outputs/bundle/release/app-release.aab
```

### Alternative: Build APK for Testing
```bash
cd android
./gradlew assembleRelease
```

✅ **Output Location:**
```
android/app/build/outputs/apk/release/app-release.apk
```

## 📊 Step 5: Verify Build

```bash
# Check AAB size (should be 15-30 MB)
ls -lh android/app/build/outputs/bundle/release/app-release.aab

# Verify signing
jarsigner -verify -verbose -certs android/app/build/outputs/bundle/release/app-release.aab
```

## 🎨 Step 6: Prepare Graphics Assets

### Required Assets:

1. **App Icon (512x512 PNG)**
   - High-res icon for Play Store
   - No transparency
   - Design: EvoX Biolabs logo with calculator theme

2. **Feature Graphic (1024x500 PNG)**
   - Banner for store listing
   - Include app name and tagline

3. **Screenshots (Minimum 2, Recommended 4-6)**
   - Dimensions: 1080x1920 or 1080x2340
   - Show:
     - Calculator screen with sample calculation
     - Saved peptides list
     - Settings screen
     - Results display

### Create Screenshots:

1. **Run app on emulator:**
   ```bash
   yarn android
   ```

2. **Use Android Studio Device Manager:**
   - Open Device Manager
   - Select Pixel 6 Pro (recommended)
   - Take screenshots using camera icon

3. **Or use ADB:**
   ```bash
   adb shell screencap -p /sdcard/screenshot.png
   adb pull /sdcard/screenshot.png
   ```

## 🏪 Step 7: Google Play Console Setup

### Create App Listing

1. Go to https://play.google.com/console
2. Click **"Create app"**
3. Fill in:
   - **App name:** EvoX Biolabs Peptide Calculator
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free
   - Check declarations boxes
   - Click **"Create app"**

### Store Listing Details

#### Short Description (80 characters max):
```
Professional peptide dosage calculator for precise laboratory calculations.
```

#### Full Description (4000 characters max):
```
EvoX Biolabs Peptide Calculator is a professional-grade mobile application designed for accurate peptide dosage calculations in research and laboratory environments.

✨ KEY FEATURES:

📊 Precise Dosage Calculations
Calculate exact draw amounts based on peptide concentration, bacteriostatic water volume, and desired dose. Get results in both ml and units.

💉 Multiple Syringe Sizes
Support for three standard syringe sizes:
• 1ml (100 units)
• 0.3ml (30 units)
• 3ml (300 units)

💾 Save & Manage Calculations
Store multiple peptide calculations with custom names for easy reference. View, edit, and delete saved calculations anytime.

🎯 Professional Interface
Clean, intuitive design optimized for mobile use. Large touch targets and clear visual hierarchy make calculations fast and error-free.

📱 Offline Functionality
All calculations and saved data work without internet connection. Your data stays private on your device.

📈 Detailed Results
View draw amounts in both milliliters and units. See all input parameters alongside results for verification.

🔐 Privacy First
No data collection, no analytics, no account required. All calculations stored locally on your device.

🎓 PERFECT FOR:
• Research laboratories
• Clinical settings
• Pharmaceutical professionals
• Health & wellness practitioners
• Medical students and researchers

⚗️ HOW IT WORKS:
1. Enter peptide amount (mg)
2. Enter bacteriostatic water volume (ml)
3. Select syringe size
4. Enter desired dose (mg)
5. Get instant calculation results
6. Save for future reference

🛡️ SAFETY & COMPLIANCE:
This calculator is intended for professional use in appropriate research and laboratory settings. Always follow proper laboratory protocols and consult healthcare professionals.

📊 TECHNICAL SPECIFICATIONS:
• Native Android application
• Offline-first architecture
• Local data storage
• No permissions required
• Optimized for all screen sizes
• Material Design interface

🏆 WHY CHOOSE EVOX BIOLABS:
Developed by professionals for professionals. Our peptide calculator brings laboratory-grade precision to your mobile device.

📞 SUPPORT:
Questions or feedback? Contact us through the app settings or visit our website.

© 2024 EvoX Biolabs - Professional Peptide Dosages

IMPORTANT DISCLAIMER:
Always follow proper laboratory protocols and consult healthcare professionals. This calculator is a tool for research and professional use. Results should be verified according to your laboratory's standard operating procedures.
```

#### App Category:
- **Primary:** Medical
- **Secondary:** Health & Fitness

#### Contact Details:
- **Email:** support@evoxbiolabs.com (or your email)
- **Website:** https://evoxbiolabs.com (or your site)
- **Privacy Policy:** Required if collecting any data

### Upload Assets

1. **App icon:** Upload 512x512 PNG
2. **Feature graphic:** Upload 1024x500 PNG
3. **Screenshots:** Upload 2-8 phone screenshots
4. **Optional:**
   - Promo video (YouTube link)
   - Tablet screenshots
   - Android TV screenshots

### Content Rating

1. Click **"Start questionnaire"**
2. Select category: **Utility, Productivity, Communication or Other**
3. Answer questions (all likely "No" for this app)
4. Expected rating: **Everyone**
5. Click **"Submit"**

### Data Safety

1. Complete data safety form:
   - **Data collection:** No
   - **Data sharing:** No
   - **Data encrypted:** Not applicable (no data transmitted)
   - **User can request deletion:** Not applicable (local storage only)

### Target Audience & Content

1. **Target age group:** 18+ (Adults)
2. **App content:** None (utility app)
3. **Store presence:** All countries or specific selection

### Privacy Policy

Since the app doesn't collect data, you can use a simple policy:

```
EvoX Biolabs Peptide Calculator Privacy Policy

Data Collection:
We do not collect, transmit, or store any personal data. All calculations and saved peptides are stored locally on your device using AsyncStorage.

Data Sharing:
We do not share any data with third parties.

Data Storage:
All data remains on your device and is never transmitted to our servers.

Permissions:
This app does not require any special permissions.

Contact:
support@evoxbiolabs.com

Last Updated: [Current Date]
```

Host this on a simple website or use GitHub Pages.

### Pricing & Distribution

1. **Price:** Free
2. **Countries:** Select all or specific countries
3. **Distribution:** Google Play only

## 📤 Step 8: Upload Release

### Production Track

1. Go to **"Production"** track
2. Click **"Create new release"**
3. Upload **app-release.aab**
4. Enter release name: **2.0.0**
5. Add release notes:

```
Version 2.0.0 - Initial Release

🎉 Welcome to EvoX Biolabs Peptide Calculator!

Features:
• Precise peptide dosage calculations
• Support for 1ml, 0.3ml, and 3ml syringes
• Save and manage multiple calculations
• Professional, easy-to-use interface
• Works completely offline
• No data collection or tracking

Perfect for research laboratories and healthcare professionals.

Thank you for choosing EvoX Biolabs!
```

6. Click **"Review release"**
7. Click **"Start rollout to Production"**

### Alternative: Internal/Closed Testing First

**Recommended for first-time publishers:**

1. Go to **"Internal testing"** track
2. Upload AAB
3. Add tester email addresses
4. Share test link with testers
5. Gather feedback
6. Fix any issues
7. Then promote to production

## ⏱️ Step 9: Wait for Review

- **Review time:** 1-7 days (typically 24-48 hours)
- **Status:** Check in Play Console dashboard
- **Notifications:** Via email

### Common Rejection Reasons:
- Missing privacy policy
- Inadequate screenshots
- Content rating issues
- App crashes on review devices
- Policy violations

## ✅ Step 10: App Goes Live!

**Once approved:**
- App appears in Play Store within hours
- **Store URL:** https://play.google.com/store/apps/details?id=com.evoxbiolabs.peptidecalculator
- Monitor crashes/ANRs in Play Console
- Respond to user reviews

## 🔄 Future Updates

### Version Update Process:

1. **Update version in build.gradle:**
   ```gradle
   versionCode 2  // Increment by 1
   versionName "2.1.0"  // Your version name
   ```

2. **Build new AAB:**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

3. **Upload to Play Console:**
   - Go to Production track
   - Create new release
   - Upload new AAB
   - Add release notes
   - Roll out

## 🐛 Troubleshooting

### Build Fails:
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew bundleRelease --stacktrace
```

### Keystore Issues:
```bash
# Verify keystore
keytool -list -v -keystore android/app/evoxbiolabs-release-key.keystore
```

### Gradle Issues:
```bash
# Clear Gradle cache
cd android
./gradlew clean
rm -rf ~/.gradle/caches/
```

### App Crashes:
- Check logcat: `adb logcat`
- Test on multiple devices
- Review crash reports in Play Console

## 📊 Success Metrics

**Monitor in Play Console:**
- Installs
- Ratings & reviews
- Crashes & ANRs
- User retention
- Device compatibility

## 🎉 Congratulations!

Your EvoX Biolabs Peptide Calculator is now on Google Play Store!

**Post-Launch Checklist:**
- [ ] Share store link with users
- [ ] Monitor crash reports
- [ ] Respond to user reviews
- [ ] Plan future features
- [ ] Regular updates every 3-6 months

---

## 🔗 Quick Links

- **Play Console:** https://play.google.com/console
- **Android Documentation:** https://developer.android.com
- **React Native Docs:** https://reactnative.dev
- **Material Design:** https://material.io

## 📞 Need Help?

If you encounter issues:
1. Check this guide thoroughly
2. Search Stack Overflow
3. Check React Native GitHub issues
4. Google Play Console Help Center

---

© 2024 EvoX Biolabs
Built with ❤️ using React Native

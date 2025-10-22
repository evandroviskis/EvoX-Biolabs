# 🔐 Keystore Information - KEEP THIS SECURE!

⚠️ **CRITICAL: This information is required for ALL future app updates!**

## Keystore Details

**File Name:** `evoxbiolabs-release-key.keystore`
**Location:** `android/app/evoxbiolabs-release-key.keystore`

**Credentials:**
- **Keystore Password:** `Evox2024SecureKey`
- **Key Alias:** `evoxbiolabs-key-alias`
- **Key Password:** `Evox2024SecureKey`

**Certificate Details:**
- **Key Algorithm:** RSA
- **Key Size:** 2048 bits
- **Validity:** 10000 days (~27 years)
- **Distinguished Name:**
  - CN: EvoX Biolabs
  - OU: Development
  - O: EvoX Biolabs
  - L: San Francisco
  - ST: California
  - C: US

## 🚨 Security Guidelines

### DO:
✅ Keep keystore file in a secure location
✅ Store passwords in a password manager
✅ Create multiple backups (cloud storage, external drive)
✅ Restrict access to keystore file
✅ Document keystore information
✅ Use same keystore for all future updates

### DON'T:
❌ Commit keystore to version control (git)
❌ Share keystore publicly
❌ Email keystore file
❌ Lose the keystore file
❌ Forget the passwords
❌ Use debug keystore for production

## 🔄 Backup Locations

**Store backups in at least 3 different locations:**

1. **Cloud Storage:**
   - Google Drive
   - Dropbox
   - iCloud
   - OneDrive

2. **Password Manager:**
   - 1Password
   - LastPass
   - Bitwarden
   - Dashlane

3. **Physical Storage:**
   - External hard drive
   - USB flash drive
   - Network attached storage (NAS)

## 📝 Using the Keystore

### Verify Keystore:
```bash
keytool -list -v -keystore android/app/evoxbiolabs-release-key.keystore
# Password: Evox2024SecureKey
```

### Sign AAB/APK:
```bash
# Build already uses keystore from gradle.properties
cd android
./gradlew bundleRelease
```

### Manually Sign (if needed):
```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore android/app/evoxbiolabs-release-key.keystore \
  -storepass Evox2024SecureKey \
  app-release.aab \
  evoxbiolabs-key-alias
```

## 🆘 If Keystore is Lost

⚠️ **WARNING:** If you lose the keystore, you CANNOT update the app!

Your only options will be:
1. Publish a completely new app with a different package name
2. Lose all existing users, ratings, and reviews

**Google Play does NOT provide keystore recovery!**

## 🔄 Changing Passwords (Advanced)

### Change Keystore Password:
```bash
keytool -storepasswd -keystore android/app/evoxbiolabs-release-key.keystore
```

### Change Key Password:
```bash
keytool -keypasswd -alias evoxbiolabs-key-alias \
  -keystore android/app/evoxbiolabs-release-key.keystore
```

**Remember to update `gradle.properties` with new passwords!**

## 📋 Keystore Checklist

- [ ] Keystore file backed up to cloud storage
- [ ] Keystore file backed up to external drive
- [ ] Passwords stored in password manager
- [ ] Keystore information documented
- [ ] Team members with access documented
- [ ] Keystore verified with keytool
- [ ] Keystore NOT in version control

## 🔗 Additional Resources

- [Android App Signing](https://developer.android.com/studio/publish/app-signing)
- [Keystore Management](https://developer.android.com/studio/publish/app-signing#secure-key)
- [Play App Signing](https://support.google.com/googleplay/android-developer/answer/9842756)

---

**Last Updated:** [Date]
**Document Owner:** [Your Name/Team]

⚠️ **KEEP THIS DOCUMENT SECURE AND PRIVATE!**

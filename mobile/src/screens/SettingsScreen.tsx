import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = () => {
  const handleLanguagePress = () => {
    Alert.alert(
      'Language',
      'Language settings coming soon!\nCurrently: English',
    );
  };

  const handleThemePress = () => {
    Alert.alert('Theme', 'Theme settings coming soon!\nCurrently: Light');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Icon name="settings" size={32} color="#fff" />
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>
            Customize your calculator experience
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="language" size={20} color="#2563eb" />
          <Text style={styles.sectionTitle}>Language</Text>
        </View>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleLanguagePress}>
          <View style={styles.settingItemLeft}>
            <Text style={styles.flagEmoji}>🇺🇸</Text>
            <Text style={styles.settingItemText}>English</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="palette" size={20} color="#2563eb" />
          <Text style={styles.sectionTitle}>Theme</Text>
        </View>
        <TouchableOpacity style={styles.settingItem} onPress={handleThemePress}>
          <View style={styles.settingItemLeft}>
            <Icon name="wb-sunny" size={24} color="#fbbf24" />
            <Text style={styles.settingItemText}>Light</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Icon name="info" size={20} color="#2563eb" />
          <Text style={styles.sectionTitle}>App Information</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.versionText}>Version 2.0.0</Text>
          <Text style={styles.featuresTitle}>Features:</Text>
          <View style={styles.featureTags}>
            <View style={styles.featureTag}>
              <Text style={styles.featureTagText}>Multilingual</Text>
            </View>
            <View style={styles.featureTag}>
              <Text style={styles.featureTagText}>Animated Syringes</Text>
            </View>
            <View style={styles.featureTag}>
              <Text style={styles.featureTagText}>Smart Calculations</Text>
            </View>
            <View style={styles.featureTag}>
              <Text style={styles.featureTagText}>Mobile Friendly</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.aboutCard}>
          <Icon name="science" size={48} color="#2563eb" />
          <Text style={styles.aboutTitle}>EvoX Biolabs</Text>
          <Text style={styles.aboutSubtitle}>Peptide Dosage Calculator</Text>
          <Text style={styles.aboutDescription}>
            Professional-grade peptide dosage calculations for research and
            laboratory use.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2024 EvoX Biolabs - Professional Peptide Dosages
        </Text>
        <Text style={styles.footerDisclaimer}>
          Always follow proper laboratory protocols and consult healthcare
          professionals.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    marginTop: 4,
  },
  section: {
    margin: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  settingItemText: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  versionText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  featureTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  featureTagText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
  aboutCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 12,
  },
  aboutSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  aboutDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  footerDisclaimer: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default SettingsScreen;

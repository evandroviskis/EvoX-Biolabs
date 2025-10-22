import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PeptideData {
  id: string;
  name: string;
  date: string;
  peptideAmount: number;
  peptideUnit: string;
  bacteriostaticWater: number;
  syringeSize: string;
  desiredDose: number;
  desiredDoseUnit: string;
  drawAmount: number;
  units: number;
}

const SavedPeptidesScreen = () => {
  const [peptides, setPeptides] = useState<PeptideData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPeptides = async () => {
    try {
      const saved = await AsyncStorage.getItem('savedPeptides');
      if (saved) {
        setPeptides(JSON.parse(saved));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load saved peptides');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPeptides();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPeptides();
    setRefreshing(false);
  };

  const deletePeptide = async (id: string) => {
    Alert.alert(
      'Delete Peptide',
      'Are you sure you want to delete this peptide calculation?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = peptides.filter(p => p.id !== id);
              await AsyncStorage.setItem(
                'savedPeptides',
                JSON.stringify(updated),
              );
              setPeptides(updated);
              Alert.alert('Success', 'Peptide deleted');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete peptide');
            }
          },
        },
      ],
    );
  };

  const viewSyringeDetails = (peptide: PeptideData) => {
    Alert.alert(
      'Syringe Details',
      `Name: ${peptide.name}\n\n` +
        `Peptide Amount: ${peptide.peptideAmount} ${peptide.peptideUnit}\n` +
        `Bacteriostatic Water: ${peptide.bacteriostaticWater} ml\n` +
        `Syringe Size: ${getSyringeLabel(peptide.syringeSize)}\n` +
        `Desired Dose: ${peptide.desiredDose} ${peptide.desiredDoseUnit}\n\n` +
        `→ Draw Amount: ${peptide.drawAmount} ml (${peptide.units} units)`,
    );
  };

  const getSyringeLabel = (size: string) => {
    const labels: {[key: string]: string} = {
      '1': '1ml (100 units)',
      '0.3': '0.3ml (30 units)',
      '3': '3ml (300 units)',
    };
    return labels[size] || size;
  };

  if (peptides.length === 0) {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.emptyContainer}>
          <Icon name="save" size={64} color="#9ca3af" />
          <Text style={styles.emptyTitle}>No Saved Peptides</Text>
          <Text style={styles.emptyText}>
            Calculate and save peptide dosages from the Calculator tab
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {peptides.length} Saved Peptide{peptides.length !== 1 ? 's' : ''}
        </Text>
        <TouchableOpacity onPress={onRefresh}>
          <Icon name="refresh" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {peptides.map(peptide => (
        <View key={peptide.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{peptide.name}</Text>
              <Text style={styles.cardDate}>{peptide.date}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePeptide(peptide.id)}>
              <Icon name="delete" size={24} color="#ef4444" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Peptide Amount:</Text>
              <Text style={styles.detailValue}>
                {peptide.peptideAmount} {peptide.peptideUnit}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Bacteriostatic Water:</Text>
              <Text style={styles.detailValue}>
                {peptide.bacteriostaticWater} ml
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Syringe Size:</Text>
              <Text style={styles.detailValue}>
                {getSyringeLabel(peptide.syringeSize)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Desired Dose:</Text>
              <Text style={styles.detailValue}>
                {peptide.desiredDose} {peptide.desiredDoseUnit}
              </Text>
            </View>

            <View style={styles.resultBox}>
              <Text style={styles.resultLabel}>Draw Amount:</Text>
              <Text style={styles.resultValue}>
                {peptide.drawAmount} ml ({peptide.units} units)
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => viewSyringeDetails(peptide)}>
            <Text style={styles.viewButtonText}>View Syringe Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b7280',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cardDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  cardBody: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  resultBox: {
    backgroundColor: '#ecfdf5',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#047857',
  },
  viewButton: {
    backgroundColor: '#1f2937',
    padding: 14,
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SavedPeptidesScreen;

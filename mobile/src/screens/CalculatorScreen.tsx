import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalculatorScreen = () => {
  const [peptideAmount, setPeptideAmount] = useState('');
  const [peptideUnit, setPeptideUnit] = useState('mg');
  const [bacteriostaticWater, setBacteriostaticWater] = useState('');
  const [syringeSize, setSyringeSize] = useState('1');
  const [desiredDose, setDesiredDose] = useState('');
  const [desiredDoseUnit, setDesiredDoseUnit] = useState('mg');
  const [result, setResult] = useState<{
    drawAmount: number;
    units: number;
  } | null>(null);
  const [calculationName, setCalculationName] = useState('');

  const syringeSizes = [
    {label: '1ml (100 units)', value: '1', units: 100},
    {label: '0.3ml (30 units)', value: '0.3', units: 30},
    {label: '3ml (300 units)', value: '3', units: 300},
  ];

  const calculateDosage = () => {
    const peptideAmountNum = parseFloat(peptideAmount);
    const bacteriostaticWaterNum = parseFloat(bacteriostaticWater);
    const desiredDoseNum = parseFloat(desiredDose);

    if (
      !peptideAmountNum ||
      !bacteriostaticWaterNum ||
      !desiredDoseNum
    ) {
      Alert.alert('Error', 'Please fill in all fields with valid numbers');
      return;
    }

    // Calculate concentration (mg/ml)
    const concentration = peptideAmountNum / bacteriostaticWaterNum;

    // Calculate draw amount in ml
    const drawAmountMl = desiredDoseNum / concentration;

    // Get units per ml for selected syringe
    const selectedSyringe = syringeSizes.find(s => s.value === syringeSize);
    const unitsPerMl = selectedSyringe ? selectedSyringe.units : 100;

    // Calculate units to draw
    const unitsAmount = drawAmountMl * unitsPerMl;

    setResult({
      drawAmount: parseFloat(drawAmountMl.toFixed(2)),
      units: parseFloat(unitsAmount.toFixed(1)),
    });
  };

  const savePeptide = async () => {
    if (!result) {
      Alert.alert('Error', 'Please calculate dosage first');
      return;
    }

    if (!calculationName.trim()) {
      Alert.alert('Error', 'Please enter a name for this calculation');
      return;
    }

    try {
      const peptideData = {
        id: Date.now().toString(),
        name: calculationName,
        date: new Date().toLocaleDateString(),
        peptideAmount: parseFloat(peptideAmount),
        peptideUnit,
        bacteriostaticWater: parseFloat(bacteriostaticWater),
        syringeSize,
        desiredDose: parseFloat(desiredDose),
        desiredDoseUnit,
        drawAmount: result.drawAmount,
        units: result.units,
      };

      const existing = await AsyncStorage.getItem('savedPeptides');
      const savedPeptides = existing ? JSON.parse(existing) : [];
      savedPeptides.push(peptideData);
      await AsyncStorage.setItem('savedPeptides', JSON.stringify(savedPeptides));

      Alert.alert('Success', 'Peptide calculation saved!');
      setCalculationName('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save peptide');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>📊</Text>
        </View>
        <Text style={styles.title}>EvoX Biolabs</Text>
        <Text style={styles.subtitle}>Peptide Dosage Calculator</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Dosage Calculator</Text>
          <Text style={styles.cardSubtitle}>
            Calculate precise peptide dosages
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Peptide Amount</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.flexInput]}
              placeholder="e.g. 5"
              keyboardType="decimal-pad"
              value={peptideAmount}
              onChangeText={setPeptideAmount}
            />
            <View style={styles.unitPicker}>
              <Text style={styles.unitText}>{peptideUnit}</Text>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bacteriostatic Water (ml)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 2"
            keyboardType="decimal-pad"
            value={bacteriostaticWater}
            onChangeText={setBacteriostaticWater}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Syringe Size</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={syringeSize}
              onValueChange={setSyringeSize}
              style={styles.picker}>
              {syringeSizes.map(size => (
                <Picker.Item
                  key={size.value}
                  label={size.label}
                  value={size.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Desired Dose</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.flexInput]}
              placeholder="e.g. 0.25"
              keyboardType="decimal-pad"
              value={desiredDose}
              onChangeText={setDesiredDose}
            />
            <View style={styles.unitPicker}>
              <Text style={styles.unitText}>{desiredDoseUnit}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateDosage}>
          <Text style={styles.buttonText}>📊 Calculate Dosage</Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Result:</Text>
            <Text style={styles.resultText}>
              Draw Amount: {result.drawAmount} ml ({result.units} units)
            </Text>

            <View style={styles.saveSection}>
              <Text style={styles.label}>Save this calculation</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter calculation name"
                value={calculationName}
                onChangeText={setCalculationName}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={savePeptide}>
                <Text style={styles.buttonText}>💾 Save Peptide</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  flexInput: {
    flex: 1,
  },
  unitPicker: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
    minWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 16,
    color: '#374151',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  calculateButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#ecfdf5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#10b981',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#047857',
    marginBottom: 16,
  },
  saveSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#d1fae5',
  },
  footer: {
    padding: 20,
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

export default CalculatorScreen;

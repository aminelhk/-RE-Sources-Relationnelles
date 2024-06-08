import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface Option {
  label: string;
  value: string | null;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string | null;
  onValueChange: (value: string | null) => void;
}

const Select: React.FC<CustomSelectProps> = ({ label, options, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={options}
        value={value}
        style={pickerSelectStyles}
        placeholder={{ label: 'Sélectionnez une option', value: null }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#000',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Select;

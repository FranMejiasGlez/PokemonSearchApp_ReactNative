import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChangeText, placeholder = 'Buscar Pokémon...' }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIcon}>
        <SearchIcon />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clearButton}>
          <ClearIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

// Icono de búsqueda simple
const SearchIcon = () => (
  <View style={styles.iconContainer}>
    <View style={[styles.magnifier, { borderColor: theme.textSecondary }]} />
    <View style={[styles.handle, { backgroundColor: theme.textSecondary }]} />
  </View>
);

// Icono de limpiar
const ClearIcon = () => (
  <View style={styles.clearIconContainer}>
    <View style={[styles.clearLine, styles.clearLine1, { backgroundColor: theme.textSecondary }]} />
    <View style={[styles.clearLine, styles.clearLine2, { backgroundColor: theme.textSecondary }]} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.textPrimary,
  },
  clearButton: {
    padding: 4,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  magnifier: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  handle: {
    width: 6,
    height: 2,
    position: 'absolute',
    bottom: 3,
    right: 2,
    transform: [{ rotate: '45deg' }],
  },
  clearIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearLine: {
    position: 'absolute',
    width: 14,
    height: 2,
    borderRadius: 1,
  },
  clearLine1: {
    transform: [{ rotate: '45deg' }],
  },
  clearLine2: {
    transform: [{ rotate: '-45deg' }],
  },
});

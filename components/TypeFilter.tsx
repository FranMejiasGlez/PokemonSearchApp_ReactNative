import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { typeColors, theme, capitalize } from '../utils/colors';

const POKEMON_TYPES = [
  'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel', 'fairy'
];

interface TypeFilterProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

export const TypeFilter = ({ selectedType, onSelectType }: TypeFilterProps) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {POKEMON_TYPES.map((type) => {
          const isSelected = selectedType === type;
          const bgColor = type === 'all' ? theme.textSecondary : typeColors[type]?.bg || '#A8A878';
          
          return (
            <TouchableOpacity
              key={type}
              style={[
                styles.chip,
                { backgroundColor: bgColor },
                isSelected && styles.chipSelected,
              ]}
              onPress={() => onSelectType(type)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {type === 'all' ? 'Todos' : capitalize(type)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipSelected: {
    borderWidth: 2,
    borderColor: theme.textPrimary,
  },
  chipText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  chipTextSelected: {
    fontWeight: '700',
  },
});

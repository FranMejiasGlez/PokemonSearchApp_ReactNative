import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, capitalize } from '../utils/colors';

interface StatBarProps {
  name: string;
  value: number;
  maxValue?: number;
  color?: string;
}

const STAT_COLORS: Record<string, string> = {
  hp: '#FF5959',
  attack: '#F5AC78',
  defense: '#FAE078',
  'special-attack': '#9DB7F5',
  'special-defense': '#A7DB8D',
  speed: '#FA92B2',
};

const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'SPD',
};

export const StatBar = ({ name, value, maxValue = 255 }: StatBarProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const color = STAT_COLORS[name] || theme.accent;
  const displayName = STAT_NAMES[name] || capitalize(name);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  name: {
    width: 40,
    fontSize: 12,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  value: {
    width: 35,
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
    textAlign: 'right',
    marginRight: 12,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: theme.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});

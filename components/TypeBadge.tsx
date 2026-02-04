import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, capitalize, getTypeColor } from '../utils/colors';

interface TypeBadgeProps {
  type: string;
  size?: 'small' | 'medium' | 'large';
}

export const TypeBadge = ({ type, size = 'small' }: TypeBadgeProps) => {
  const bgColor = getTypeColor(type);
  
  const sizeStyles = {
    small: { paddingHorizontal: 8, paddingVertical: 4, fontSize: 10 },
    medium: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 12 },
    large: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 },
  };

  return (
    <View style={[styles.badge, { backgroundColor: bgColor }, { 
      paddingHorizontal: sizeStyles[size].paddingHorizontal,
      paddingVertical: sizeStyles[size].paddingVertical,
    }]}>
      <Text style={[styles.text, { fontSize: sizeStyles[size].fontSize }]}>
        {capitalize(type)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    marginRight: 4,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

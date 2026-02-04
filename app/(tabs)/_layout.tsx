import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../utils/colors';

// Icono de Pokédex (lista)
const PokedexIcon = ({ color }: { color: string }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.listIcon, { borderColor: color }]}>
      <View style={[styles.listLine, { backgroundColor: color }]} />
      <View style={[styles.listLine, { backgroundColor: color }]} />
      <View style={[styles.listLine, { backgroundColor: color }]} />
    </View>
  </View>
);

// Icono de corazón (favoritos)
const HeartIcon = ({ color }: { color: string }) => (
  <View style={styles.iconContainer}>
    <Text style={[styles.heartText, { color }]}>♥</Text>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokédex',
          tabBarIcon: ({ color }) => <PokedexIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <HeartIcon color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listIcon: {
    width: 20,
    height: 16,
    borderWidth: 2,
    borderRadius: 3,
    justifyContent: 'center',
    paddingHorizontal: 3,
    gap: 2,
  },
  listLine: {
    height: 2,
    borderRadius: 1,
  },
  heartText: {
    fontSize: 22,
  },
});

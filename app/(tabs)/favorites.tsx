import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { theme, formatPokemonNumber, getPokemonImageUrl } from '../../utils/colors';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, isLoading } = useFavoritesContext();

  const handlePress = (id: number) => {
    router.push(`/pokemon/${id}`);
  };

  const renderItem = useCallback(({ item }: { item: number }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: getPokemonImageUrl(item) }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.number}>{formatPokemonNumber(item)}</Text>
    </TouchableOpacity>
  ), []);

  const keyExtractor = useCallback((item: number) => item.toString(), []);

  if (isLoading) {
    return <LoadingSpinner message="Cargando favoritos..." />;
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>♥</Text>
        <Text style={styles.emptyTitle}>Sin favoritos</Text>
        <Text style={styles.emptySubtitle}>
          Toca el corazón en el detalle de un Pokémon para añadirlo aquí
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={3}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContent: {
    padding: 12,
  },
  card: {
    flex: 1,
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 8,
    margin: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    maxWidth: '31%',
  },
  image: {
    width: 60,
    height: 60,
  },
  number: {
    fontSize: 11,
    color: theme.textSecondary,
    fontWeight: '500',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: theme.background,
  },
  emptyIcon: {
    fontSize: 60,
    color: theme.border,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

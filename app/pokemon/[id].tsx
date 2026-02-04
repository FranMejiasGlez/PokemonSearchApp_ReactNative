import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../../services/pokeApi';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { TypeBadge } from '../../components/TypeBadge';
import { StatBar } from '../../components/StatBar';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { 
  theme, 
  capitalize, 
  formatPokemonNumber, 
  formatHeight, 
  formatWeight,
  getPokemonImageUrl,
  getTypeLightColor,
} from '../../utils/colors';

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchPokemonDetail(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });

  if (isLoading) {
    return <LoadingSpinner message="Cargando Pokémon..." />;
  }

  if (isError || !pokemon) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar el Pokémon</Text>
      </View>
    );
  }

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const bgColor = getTypeLightColor(mainType);
  const favorite = isFavorite(pokemon.id);

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: capitalize(pokemon.name),
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => toggleFavorite(pokemon.id)}
              style={styles.favoriteButton}
            >
              <Text style={[styles.heartIcon, favorite && styles.heartIconActive]}>
                {favorite ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
          ),
        }} 
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header con imagen */}
        <View style={[styles.header, { backgroundColor: bgColor }]}>
          <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
          <Image
            source={{ uri: getPokemonImageUrl(pokemon.id) }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Info principal */}
        <View style={styles.content}>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          
          {/* Tipos */}
          <View style={styles.typesContainer}>
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} size="large" />
            ))}
          </View>

          {/* Medidas */}
          <View style={styles.measuresContainer}>
            <View style={styles.measureItem}>
              <Text style={styles.measureLabel}>Altura</Text>
              <Text style={styles.measureValue}>{formatHeight(pokemon.height)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.measureItem}>
              <Text style={styles.measureLabel}>Peso</Text>
              <Text style={styles.measureValue}>{formatWeight(pokemon.weight)}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estadísticas Base</Text>
            {pokemon.stats.map((stat) => (
              <StatBar 
                key={stat.stat.name} 
                name={stat.stat.name} 
                value={stat.base_stat} 
              />
            ))}
          </View>

          {/* Habilidades */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.abilitiesContainer}>
              {pokemon.abilities.map((a) => (
                <View key={a.ability.name} style={styles.abilityBadge}>
                  <Text style={styles.abilityText}>
                    {capitalize(a.ability.name.replace('-', ' '))}
                    {a.is_hidden && ' (oculta)'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  number: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.3)',
  },
  image: {
    width: 200,
    height: 200,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  measuresContainer: {
    flexDirection: 'row',
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  measureItem: {
    flex: 1,
    alignItems: 'center',
  },
  measureLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginBottom: 4,
  },
  measureValue: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  divider: {
    width: 1,
    backgroundColor: theme.border,
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 12,
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  abilityBadge: {
    backgroundColor: theme.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: theme.border,
  },
  abilityText: {
    fontSize: 14,
    color: theme.textPrimary,
  },
  favoriteButton: {
    padding: 8,
  },
  heartIcon: {
    fontSize: 24,
    color: theme.textSecondary,
  },
  heartIconActive: {
    color: '#FF5959',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  errorText: {
    fontSize: 16,
    color: theme.textSecondary,
  },
});

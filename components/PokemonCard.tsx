import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { theme, formatPokemonNumber, capitalize, getPokemonImageUrl, getPokemonIdFromUrl, getTypeLightColor } from '../utils/colors';
import { PokemonBasic } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonBasic;
}

export const PokemonCard = memo(({ pokemon }: PokemonCardProps) => {
  const router = useRouter();
  const pokemonId = getPokemonIdFromUrl(pokemon.url);

  const handlePress = () => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <Image
        source={{ uri: getPokemonImageUrl(pokemonId) }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.number}>{formatPokemonNumber(pokemonId)}</Text>
      <Text style={styles.name} numberOfLines={1}>{capitalize(pokemon.name)}</Text>
    </TouchableOpacity>
  );
});

PokemonCard.displayName = 'PokemonCard';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.card,
    borderRadius: 16,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    maxWidth: '47%',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  number: {
    fontSize: 12,
    color: theme.textSecondary,
    fontWeight: '500',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textPrimary,
    marginTop: 2,
  },
});

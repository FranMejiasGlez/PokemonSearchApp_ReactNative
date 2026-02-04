import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SearchBar } from '../../components/SearchBar';
import { TypeFilter } from '../../components/TypeFilter';
import { PokemonCard } from '../../components/PokemonCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { usePokemonSearch } from '../../hooks/usePokemonSearch';
import { theme } from '../../utils/colors';
import { PokemonBasic } from '../../types/pokemon';

export default function PokedexScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  const { pokemon, isLoading, isError } = usePokemonSearch(searchTerm, selectedType);

  const renderItem = useCallback(({ item }: { item: PokemonBasic }) => (
    <PokemonCard pokemon={item} />
  ), []);

  const keyExtractor = useCallback((item: PokemonBasic) => item.name, []);

  const ListEmptyComponent = () => {
    if (isLoading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchTerm || selectedType !== 'all' 
            ? 'No se encontraron Pokémon' 
            : 'Cargando Pokédex...'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchTerm} onChangeText={setSearchTerm} />
      <TypeFilter selectedType={selectedType} onSelectType={setSelectedType} />
      
      {isLoading ? (
        <LoadingSpinner message="Cargando Pokémon..." />
      ) : isError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error al cargar los Pokémon</Text>
          <Text style={styles.errorSubtext}>Verifica tu conexión a internet</Text>
        </View>
      ) : (
        <FlatList
          data={pokemon}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={10}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: theme.textSecondary,
  },
});

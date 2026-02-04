import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchAllPokemon, fetchPokemonByType } from '../services/pokeApi';
import { PokemonBasic } from '../types/pokemon';
import { getPokemonIdFromUrl } from '../utils/colors';

export const usePokemonSearch = (searchTerm: string, selectedType: string) => {
  // Query para todos los Pokémon
  const allPokemonQuery = useQuery({
    queryKey: ['pokemon', 'all'],
    queryFn: () => fetchAllPokemon(1010),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Query para Pokémon de un tipo específico
  const typeQuery = useQuery({
    queryKey: ['pokemon', 'type', selectedType],
    queryFn: () => fetchPokemonByType(selectedType),
    enabled: selectedType !== 'all',
    staleTime: 1000 * 60 * 30, // 30 minutos
  });

  // Combinar búsqueda + filtro por tipo
  const filteredPokemon = useMemo(() => {
    let baseList: PokemonBasic[] = selectedType === 'all'
      ? allPokemonQuery.data || []
      : typeQuery.data || [];

    // Filtrar por nombre o número si hay término de búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      baseList = baseList.filter((pokemon) => {
        const id = getPokemonIdFromUrl(pokemon.url);
        return (
          pokemon.name.toLowerCase().includes(term) ||
          id.toString() === term ||
          id.toString().padStart(3, '0').includes(term)
        );
      });
    }

    return baseList;
  }, [allPokemonQuery.data, typeQuery.data, selectedType, searchTerm]);

  return {
    pokemon: filteredPokemon,
    isLoading: selectedType === 'all'
      ? allPokemonQuery.isLoading
      : typeQuery.isLoading,
    error: allPokemonQuery.error || typeQuery.error,
    isError: allPokemonQuery.isError || typeQuery.isError,
  };
};

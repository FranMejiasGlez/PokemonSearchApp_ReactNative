import { PokemonBasic, PokemonDetail, PokemonListResponse, TypeResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Obtener lista de todos los Pokémon
export const fetchAllPokemon = async (limit: number = 1010): Promise<PokemonBasic[]> => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=0`);
  if (!response.ok) throw new Error('Error fetching Pokemon list');
  const data: PokemonListResponse = await response.json();
  return data.results;
};

// Obtener detalle de un Pokémon por nombre o ID
export const fetchPokemonDetail = async (nameOrId: string | number): Promise<PokemonDetail> => {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error(`Error fetching Pokemon: ${nameOrId}`);
  return response.json();
};

// Obtener lista de tipos
export const fetchTypes = async (): Promise<{ name: string; url: string }[]> => {
  const response = await fetch(`${BASE_URL}/type`);
  if (!response.ok) throw new Error('Error fetching types');
  const data = await response.json();
  // Filtrar tipos especiales (unknown y shadow)
  return data.results.filter((t: { name: string }) => 
    !['unknown', 'shadow', 'stellar'].includes(t.name)
  );
};

// Obtener Pokémon por tipo
export const fetchPokemonByType = async (type: string): Promise<PokemonBasic[]> => {
  const response = await fetch(`${BASE_URL}/type/${type}`);
  if (!response.ok) throw new Error(`Error fetching type: ${type}`);
  const data: TypeResponse = await response.json();
  return data.pokemon.map((p) => p.pokemon);
};

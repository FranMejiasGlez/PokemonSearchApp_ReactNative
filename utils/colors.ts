// Paleta minimalista
export const theme = {
  background: '#F5F5F5',
  card: '#FFFFFF',
  cardShadow: 'rgba(0,0,0,0.08)',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  accent: '#3B82F6',
};

// Colores por tipo de Pokémon
export const typeColors: Record<string, { bg: string; light: string }> = {
  normal:   { bg: '#A8A878', light: '#C6C6A7' },
  fire:     { bg: '#F08030', light: '#F5AC78' },
  water:    { bg: '#6890F0', light: '#9DB7F5' },
  electric: { bg: '#F8D030', light: '#FAE078' },
  grass:    { bg: '#78C850', light: '#A7DB8D' },
  ice:      { bg: '#98D8D8', light: '#BCE6E6' },
  fighting: { bg: '#C03028', light: '#D67873' },
  poison:   { bg: '#A040A0', light: '#C183C1' },
  ground:   { bg: '#E0C068', light: '#EBD69D' },
  flying:   { bg: '#A890F0', light: '#C6B7F5' },
  psychic:  { bg: '#F85888', light: '#FA92B2' },
  bug:      { bg: '#A8B820', light: '#C6D16E' },
  rock:     { bg: '#B8A038', light: '#D1C17D' },
  ghost:    { bg: '#705898', light: '#A292BC' },
  dragon:   { bg: '#7038F8', light: '#A27DFA' },
  dark:     { bg: '#705848', light: '#A29288' },
  steel:    { bg: '#B8B8D0', light: '#D1D1E0' },
  fairy:    { bg: '#EE99AC', light: '#F4BDC9' },
};

// Obtener color de un tipo
export const getTypeColor = (type: string): string => {
  return typeColors[type.toLowerCase()]?.bg || '#A8A878';
};

// Obtener color claro de un tipo
export const getTypeLightColor = (type: string): string => {
  return typeColors[type.toLowerCase()]?.light || '#C6C6A7';
};

// Extraer ID del Pokémon desde la URL
export const getPokemonIdFromUrl = (url: string): number => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

// Formatear número de Pokémon (#001, #025, etc.)
export const formatPokemonNumber = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

// Capitalizar primera letra
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Convertir decímetros a metros
export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)} m`;
};

// Convertir hectogramos a kilogramos
export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)} kg`;
};

// URL de imagen del Pokémon
export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

// URL de sprite pequeño
export const getPokemonSpriteUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

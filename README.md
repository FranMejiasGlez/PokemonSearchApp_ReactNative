# 🎮 Pokemon Search App

Una aplicación móvil desarrollada con **React Native** y **Expo** que permite buscar y explorar información sobre Pokémon utilizando la [PokéAPI](https://pokeapi.co/).

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Características

- 🔍 **Búsqueda de Pokémon** - Busca Pokémon por nombre
- 🏷️ **Filtro por tipo** - Filtra Pokémon por su tipo (Fuego, Agua, Planta, etc.)
- ❤️ **Favoritos** - Guarda tus Pokémon favoritos
- 📊 **Estadísticas detalladas** - Visualiza las estadísticas de cada Pokémon
- 🎨 **Diseño atractivo** - Interfaz moderna con colores según el tipo de Pokémon

## 📱 Capturas de pantalla

| Pantalla Principal | Detalle Pokémon | Favoritos |
|:------------------:|:---------------:|:---------:|
| Lista de Pokémon   | Stats y tipos   | Tus favoritos |

## 🚀 Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Pasos

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/FranMejiasGlez/PokemonSearchApp_ReactNative.git
   cd PokemonSearchApp_ReactNative
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia la aplicación**
   ```bash
   npx expo start
   ```

4. **Ejecuta en tu dispositivo**
   - Escanea el código QR con la app **Expo Go** (Android/iOS)
   - O presiona `a` para abrir en emulador Android
   - O presiona `i` para abrir en simulador iOS

## 🛠️ Tecnologías utilizadas

- **React Native** - Framework para desarrollo móvil
- **Expo** - Plataforma para aplicaciones React Native
- **TypeScript** - Tipado estático para JavaScript
- **Expo Router** - Navegación basada en archivos
- **AsyncStorage** - Almacenamiento local para favoritos
- **PokéAPI** - API REST de datos de Pokémon

## 📁 Estructura del proyecto

```
PokemonSearchApp/
├── app/                    # Pantallas (Expo Router)
│   ├── (tabs)/            # Navegación por tabs
│   │   ├── index.tsx      # Pantalla principal (búsqueda)
│   │   └── favorites.tsx  # Pantalla de favoritos
│   ├── pokemon/
│   │   └── [id].tsx       # Detalle del Pokémon
│   └── _layout.tsx        # Layout principal
├── components/            # Componentes reutilizables
│   ├── PokemonCard.tsx    # Tarjeta de Pokémon
│   ├── SearchBar.tsx      # Barra de búsqueda
│   ├── TypeBadge.tsx      # Badge de tipo
│   ├── TypeFilter.tsx     # Filtro por tipos
│   ├── StatBar.tsx        # Barra de estadísticas
│   └── LoadingSpinner.tsx # Indicador de carga
├── context/               # Context API
│   └── FavoritesContext.tsx
├── hooks/                 # Custom hooks
│   ├── usePokemonSearch.ts
│   └── useFavorites.ts
├── services/              # Servicios de API
│   └── pokeApi.ts
├── types/                 # Tipos de TypeScript
│   └── pokemon.ts
└── utils/                 # Utilidades
    └── colors.ts          # Colores por tipo
```

## 🎯 Funcionalidades principales

### Búsqueda de Pokémon
Busca cualquier Pokémon por su nombre. La búsqueda es en tiempo real y muestra resultados mientras escribes.

### Filtro por tipo
Filtra la lista de Pokémon por su tipo. Puedes seleccionar tipos como Fuego, Agua, Planta, Eléctrico, y más.

### Sistema de favoritos
Marca tus Pokémon favoritos y accede a ellos rápidamente desde la pestaña de favoritos. Los datos se guardan localmente en tu dispositivo.

### Detalles del Pokémon
Visualiza información detallada de cada Pokémon:
- Imagen oficial
- Tipos
- Estadísticas base (HP, Ataque, Defensa, etc.)
- Altura y peso

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Fran Mejías**

- GitHub: [@FranMejiasGlez](https://github.com/FranMejiasGlez)

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!

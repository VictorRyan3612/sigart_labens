<script setup>
import { onMounted } from 'vue';
import { usePokemonStore } from '@/store/pokemonStore';
import { useRouter } from 'vue-router';

const pokemonStore = usePokemonStore();
const router = useRouter();

// Carregar a lista de Pokémon ao iniciar
onMounted(() => {
  console.log('Carregando lista de Pokémons...');
  pokemonStore.fetchPokemonList();
});

// Redireciona para a tela de detalhes
const abrirDetalhes = (pokemon) => {
  const id = pokemon.url.split('/').filter(Boolean).pop(); // Obtém o ID do Pokémon
  router.push(`/pokemon/${id}`);
};

// Carregar mais Pokémon
const carregarMais = () => {
  pokemonStore.fetchPokemonList(pokemonStore.pokemonList.length + 20);
};
</script>

<template>
  <div class="home-container">
    <h1 class="title">Pokédex</h1>

    <div class="pokemon-grid">
      <div
        v-for="(pokemon, index) in pokemonStore.pokemonList"
        :key="index"
        class="pokemon-card"
        @click="abrirDetalhes(pokemon)"
      >
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`"
          :alt="pokemon.name"
          class="pokemon-image"
        />
        <p class="pokemon-id">#{{ index + 1 }}</p>
        <p class="pokemon-name">{{ pokemon.name }}</p>
      </div>
    </div>

    <!-- Botão Carregar Mais -->
    <button class="load-more" @click="carregarMais">Carregar Mais</button>
  </div>
</template>

<style scoped>
/* Container principal */
.home-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  text-align: center;
}

/* Título */
.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* Grid de Pokémons */
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

/* Cartão de cada Pokémon */
.pokemon-card {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.3s;
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Imagem do Pokémon */
.pokemon-image {
  width: 80px;
  height: 80px;
}

/* ID do Pokémon */
.pokemon-id {
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
  margin-top: 5px;
}

/* Nome do Pokémon */
.pokemon-name {
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: capitalize;
  margin-top: 4px;
  color: #444;
}

/* Botão "Carregar Mais" */
.load-more {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #ff4757;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.load-more:hover {
  background-color: #e84118;
}
</style>

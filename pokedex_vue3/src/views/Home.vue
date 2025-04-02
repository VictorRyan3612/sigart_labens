<script setup>
import { onMounted } from 'vue';
import { usePokemonStore } from '@/store/pokemonStore';
import { RouterLink } from 'vue-router';

const pokemonStore = usePokemonStore();

onMounted(() => {
  console.log('Iniciando Fetch de Pokémons...');
  pokemonStore.fetchPokemonList();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6 text-blue-600">Pokédex</h1>

    <!-- Exibir Mensagem de Carregamento -->
    <div v-if="pokemonStore.pokemonList.length === 0" class="text-center text-gray-500">
      <p>Carregando Pokémon...</p>
    </div>

    <!-- Grid de Cartões -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <RouterLink
        v-for="(pokemon, index) in pokemonStore.pokemonList"
        :key="index"
        :to="`/pokemon/${index + 1}`"
        class="p-4 border rounded shadow bg-white text-center hover:bg-gray-200 transition"
      >
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`"
          :alt="pokemon.name"
          class="w-20 h-20 mx-auto"
        />
        <p class="text-lg font-semibold capitalize">{{ pokemon.name }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>

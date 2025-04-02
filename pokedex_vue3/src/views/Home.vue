<script setup>
import { onMounted } from 'vue';
import { usePokemonStore } from '@/store/pokemonStore';

const pokemonStore = usePokemonStore();

onMounted(() => {
  console.log('A')
  pokemonStore.fetchPokemonList();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center mb-6">Pokédex</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="(pokemon, index) in pokemonStore.pokemonList"
        :key="index"
        class="p-4 border rounded shadow bg-white text-center"
      >
        <p class="text-lg font-semibold capitalize">{{ pokemon.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const pokemon = ref(null);

onMounted(async () => {
  try {
    console.log(`Buscando detalhes do Pokémon ${route.params.id}...`);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`);
    pokemon.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar detalhes do Pokémon:", error);
  }
});

// Função para voltar à tela inicial
const voltar = () => {
  router.push('/');
};
</script>

<template>
  <!-- Botão de Voltar -->
  <button
      @click="voltar"
      class="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Voltar
    </button>
  <div v-if="pokemon" class="container mx-auto p-6 text-center">
    <h1 class="text-4xl font-bold text-blue-600 capitalize">{{ pokemon.name }}</h1>

    <!-- Imagem do Pokémon -->
    <img
      v-if="pokemon.sprites"
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="mx-auto my-4 w-40 h-40"
    />

    <!-- Tipos do Pokémon -->
    <div class="flex justify-center space-x-2">
      <span
        v-for="type in pokemon.types"
        :key="type.type.name"
        class="px-3 py-1 rounded text-white text-sm font-bold"
        :class="{
          'bg-red-500': type.type.name === 'fire',
          'bg-blue-500': type.type.name === 'water',
          'bg-green-500': type.type.name === 'grass',
          'bg-yellow-500': type.type.name === 'electric',
          'bg-gray-500': type.type.name === 'rock',
          'bg-purple-500': type.type.name === 'poison',
          'bg-pink-500': type.type.name === 'fairy',
          'bg-brown-500': type.type.name === 'ground',
          'bg-indigo-500': type.type.name === 'ghost',
          'bg-gray-700': type.type.name === 'steel',
          'bg-gray-400': type.type.name === 'normal'
        }"
      >
        {{ type.type.name }}
      </span>
    </div>

    <!-- Informações Básicas -->
    <p class="text-gray-700 mt-4">Altura: {{ pokemon.height / 10 }} m</p>
    <p class="text-gray-700">Peso: {{ pokemon.weight / 10 }} kg</p>

    <!-- Habilidades -->
    <div class="mt-4">
      <h2 class="text-xl font-semibold text-gray-800">Habilidades</h2>
      <ul class="mt-2">
        <li
          v-for="ability in pokemon.abilities"
          :key="ability.ability.name"
          class="text-gray-600 capitalize"
        >
          {{ ability.ability.name }}
        </li>
      </ul>
    </div>

    <!-- Stats Base -->
    <div class="mt-4">
      <h2 class="text-xl font-semibold text-gray-800">Stats Base</h2>
      <div class="grid grid-cols-2 gap-2 mt-2">
        <div
          v-for="stat in pokemon.stats"
          :key="stat.stat.name"
          class="flex justify-between bg-gray-200 p-2 rounded"
        >
          <span class="capitalize">{{ stat.stat.name }}</span>
          <span class="font-bold">{{ stat.base_stat }}</span>
        </div>
      </div>
    </div>

    
  </div>

  <div v-else class="text-center text-gray-500">
    <p>Carregando detalhes...</p>
  </div>
</template>

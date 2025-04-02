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
  <div v-if="pokemon" class="container mx-auto p-4 text-center">
    <h1 class="text-3xl font-bold text-blue-600">{{ pokemon.name }}</h1>
    
    <img
      v-if="pokemon.sprites"
      :src="pokemon.sprites.front_default"
      alt="Imagem do Pokémon"
      class="mx-auto my-4 w-40 h-40"
    />

    <p class="text-gray-700">Altura: {{ pokemon.height / 10 }} m</p>
    <p class="text-gray-700">Peso: {{ pokemon.weight / 10 }} kg</p>

    
  </div>

  <div v-else class="text-center text-gray-500">
    <p>Carregando detalhes...</p>
  </div>
</template>

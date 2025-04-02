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
  
  <div v-if="pokemon" class="details-container">
    <!-- Botão de Voltar -->
    <button @click="voltar" class="back-button">Voltar</button>
    <h1 class="pokemon-name">{{ pokemon.name }}</h1>

    <!-- Imagem do Pokémon -->
    <img
      v-if="pokemon.sprites"
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="pokemon-image"
    />

    <!-- Tipos do Pokémon -->
    <div class="pokemon-types">
      <span
        v-for="type in pokemon.types"
        :key="type.type.name"
        class="type-badge"
        :class="type.type.name"
      >
        {{ type.type.name }}
      </span>
    </div>

    <!-- Informações Básicas -->
    <div class="info-box">
      <p>Altura: <span>{{ pokemon.height / 10 }} m</span></p>
      <p>Peso: <span>{{ pokemon.weight / 10 }} kg</span></p>
    </div>

    <!-- Habilidades -->
    <div class="section">
      <h2>Habilidades</h2>
      <ul>
        <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
          {{ ability.ability.name }}
        </li>
      </ul>
    </div>

    <!-- Stats Base -->
    <div class="section">
      <h2>Stats Base</h2>
      <div class="stats-grid">
        <div v-for="stat in pokemon.stats" :key="stat.stat.name" class="stat">
          <span class="stat-name">{{ stat.stat.name }}</span>
          <div class="progress-bar">
            <div class="progress" :style="{ width: stat.base_stat + '%' }"></div>
          </div>
          <span class="stat-value">{{ stat.base_stat }}</span>
        </div>
      </div>
    </div>

    
  </div>

  <div v-else class="loading">
    <p>Carregando detalhes...</p>
  </div>
</template>

<style scoped>
/* Estilos gerais */
.details-container {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.pokemon-name {
  font-size: 2rem;
  font-weight: bold;
  text-transform: capitalize;
  color: #333;
}

.pokemon-image {
  width: 150px;
  height: 150px;
  margin: 10px auto;
}

/* Tipos do Pokémon */
.pokemon-types {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.type-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #fff;
  text-transform: capitalize;
}

/* Cores para cada tipo */
.fire { background-color: #F08030; }
.water { background-color: #6890F0; }
.grass { background-color: #78C850; }
.electric { background-color: #F8D030; color: #333; }
.rock { background-color: #B8A038; }
.poison { background-color: #A040A0; }
.fairy { background-color: #EE99AC; color: #333; }
.ground { background-color: #E0C068; color: #333; }
.ghost { background-color: #705898; }
.steel { background-color: #B8B8D0; color: #333; }
.normal { background-color: #A8A878; }

/* Informações básicas */
.info-box {
  display: flex;
  justify-content: space-around;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
}

.info-box p {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.info-box span {
  color: #555;
  font-weight: normal;
}

/* Seções gerais */
.section {
  margin-top: 20px;
}

.section h2 {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #444;
}

.section ul {
  list-style: none;
  padding: 0;
}

.section li {
  font-size: 1rem;
  color: #555;
  background: #f0f0f0;
  padding: 8px;
  border-radius: 5px;
  margin: 5px 0;
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 8px;
  border-radius: 5px;
}

.stat-name {
  text-transform: capitalize;
  font-weight: bold;
  color: #333;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  margin: 0 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #4caf50;
}

/* Botão de Voltar */
.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}

/* Mensagem de carregamento */
.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>

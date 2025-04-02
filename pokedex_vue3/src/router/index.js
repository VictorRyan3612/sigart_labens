import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import PokemonDetails from '@/views/PokemonDetails.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/pokemon/:id', name: 'PokemonDetails', component: PokemonDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

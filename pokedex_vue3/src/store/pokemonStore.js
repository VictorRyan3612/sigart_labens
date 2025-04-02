import {defineStore} from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
	state: () => ({
		pokemonList: [],
	}),
	actions: {
		async fetchPokemonList(limit = 20){
			try {
				console.log('Buscando Pokemon...');
				const response = await axios.get(`http://pokeapi.co/api/v2/pokemon?limit=${limit}`);
				console.log('Api response:', response.data);
				this.pokemonList = response.data.results
			}
			catch (error){
				console.log('Erro ao buscar pokemon:', error)
			}
		}
	}
})

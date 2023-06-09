import { NamedApiResourceList, Pokemon, QueryPokemonsArgs } from '@/__generated__/types'
import { generateQueryParams } from '@/utils/generate'
import { RESTDataSource } from '@apollo/datasource-rest'

export default class PokemonAPI extends RESTDataSource {
    override baseURL = process.env.POKEMON_BASE_API_URL

    async getPokemons(params: Partial<QueryPokemonsArgs>): Promise<NamedApiResourceList> {
        const queryParams = generateQueryParams(params)
        return this.get('pokemon', { params: queryParams })
    }

    async getPokemon(id: number): Promise<Pokemon> {
        return this.get(`pokemon/${encodeURIComponent(id)}`)
    }
}

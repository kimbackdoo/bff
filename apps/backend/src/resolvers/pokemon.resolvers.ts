import { Resolvers } from '@/__generated__/types'

const resolvers: Resolvers = {
    Query: {
        pokemons: async (_, params, { dataSources }) => {
            return dataSources.pokemonAPI.getPokemons(params)
        },
        pokemon: async (_, { id }, { dataSources }) => {
            return dataSources.pokemonAPI.getPokemon(id)
        },
    },
}

export default resolvers

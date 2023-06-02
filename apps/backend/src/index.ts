import PokemonAPI from '@/datasources/pokemon.api'
import { generateResolvers, generateTypeDefs } from '@/utils/generate'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import 'dotenv/config'

export type ContextValue = {
    dataSources: {
        pokemonAPI: PokemonAPI
    }
}

const typeDefs = generateTypeDefs()
const resolvers = generateResolvers()
const server = new ApolloServer<ContextValue>({ typeDefs, resolvers })

async function bootstrap() {
    const { url } = await startStandaloneServer(server, {
        context: async () => {
            return {
                dataSources: {
                    pokemonAPI: new PokemonAPI(),
                },
            }
        },
    })

    console.log(`🚀 Server ready at: ${url}`)
}

bootstrap()

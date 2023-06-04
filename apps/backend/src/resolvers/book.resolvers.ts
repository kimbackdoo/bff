import { Resolvers } from '@/__generated__/types'

const resolvers: Resolvers = {
    Query: {
        books: async (_, params, { dataSources }) => {
            return dataSources.bookAPI.getBooks(params)
        },
    },
}

export default resolvers

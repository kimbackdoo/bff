import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'

const srcPath = `${path.resolve()}/src`

export function generateTypeDefs() {
    const loadedFiles = loadFilesSync(`${srcPath}/schemas/*.graphql`)
    const typeDefs = mergeTypeDefs(loadedFiles)
    return typeDefs
}

export function generateResolvers() {
    const loadedFiles = loadFilesSync(`${srcPath}/resolvers/*.resolvers.ts`)
    const resolvers = mergeResolvers(loadedFiles)
    return resolvers
}

export function generateQueryParams(obj?: Object) {
    if (!obj) return obj

    const queryParamsEntries = Object.entries(obj).map(([key, value]) => {
        if (!value) return [key, value]
        return [key, encodeURIComponent(value.toString())]
    })
    return Object.fromEntries(queryParamsEntries)
}

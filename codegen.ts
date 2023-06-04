import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: ['apps/backend/src/schemas/*.graphql'],
    documents: ['apps/frontend/src/**/*.tsx'],
    ignoreNoDocuments: true,
    generates: {
        'apps/backend/src/__generated__/types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                useIndexSignature: true,
                contextType: '@/index#ContextValue',
            },
        },
        'apps/frontend/src/__generated__/': {
            preset: 'client',
        },
    },
}

export default config

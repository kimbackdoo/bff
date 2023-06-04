import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: ['apps/backend/src/schemas/*.graphql'],
    generates: {
        'apps/backend/src/__generated__/types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                useIndexSignature: true,
                contextType: '@/index#ContextValue',
            },
        },
    },
}

export default config

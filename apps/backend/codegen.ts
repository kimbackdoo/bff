import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: ['src/schemas/*.graphql'],
    emitLegacyCommonJSImports: false,
    generates: {
        'src/__generated__/types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                useIndexSignature: true,
                contextType: '@/index#ContextValue',
            },
        },
    },
}

export default config

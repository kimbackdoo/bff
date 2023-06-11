import { type TypedDocumentNode } from '@graphql-typed-document-node/core'
import {
    InfiniteData,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult,
    UseMutationOptions,
    UseQueryOptions,
    UseQueryResult,
    useInfiniteQuery,
    useMutation,
    useQuery,
} from '@tanstack/react-query'
import request from 'graphql-request'

type UseGraphQLResult<TResult> = Omit<UseQueryResult<TResult>, 'data'> & { data: TResult }
type UseInfiniteGraphQLResult<TResult> = Omit<UseInfiniteQueryResult<TResult>, 'data'> & { data: InfiniteData<TResult> }

const ENDPOINT = 'http://localhost:4000'

export function useGraphQL<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    options?: UseQueryOptions<TResult> & { variables?: TVariables }
): UseGraphQLResult<TResult> {
    const { variables } = options ?? {}
    const { data, ...rest } = useQuery({
        queryKey: [(document.definitions[0] as any).name.value, options?.variables],
        queryFn: () => request(ENDPOINT, document, variables ?? {}),
        ...options,
    })
    return { data: data!, ...rest }
}

export function useInfiniteGraphQL<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    options?: UseInfiniteQueryOptions<TResult> & { variables?: TVariables }
): UseInfiniteGraphQLResult<TResult> {
    const { variables } = options ?? {}
    const { data, ...rest } = useInfiniteQuery({
        queryKey: [(document.definitions[0] as any).name.value, variables],
        queryFn: ({ pageParam }) => request(ENDPOINT, document, { ...(pageParam ?? variables) }),
        ...options,
    })
    return { data: data!, ...rest }
}

export function useGraphQLMutation<TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    options?: UseMutationOptions<TResult, unknown, TVariables>
) {
    return useMutation({
        mutationFn: (variables?: TVariables) => request(ENDPOINT, document, variables ?? {}),
        ...options,
    })
}

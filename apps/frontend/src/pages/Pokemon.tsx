import { graphql } from '@/__generated__/gql'
import PokemonItem from '@/components/PokemonItem'
import { useInfiniteGraphQL } from '@/queries/config'
import { css } from '@emotion/react'
import { Suspense, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const LIMIT = 15

const document = graphql(`
    query PokemonsQuery($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            results {
                name
                url
            }
        }
    }
`)

export default function PokemonPage() {
    const { ref, inView } = useInView()
    const { data, fetchNextPage } = useInfiniteGraphQL(document, { variables: { limit: LIMIT, offset: 0 } })
    const { count, next } = data.pages.at(-1)!.pokemons!

    useEffect(() => {
        if (!inView || !next) return

        const nextUrl = new URL(next)
        const searchParams = new URLSearchParams(nextUrl.search)
        const offset = +searchParams.get('offset')!
        fetchNextPage({ pageParam: { limit: LIMIT, offset } })
    }, [inView, next])

    const pokemons = data.pages.flatMap(({ pokemons }) => pokemons!.results)

    return (
        <>
            <p css={titleCss}>전체 포켓몬 개수 : {count}</p>
            <ul css={ulCss}>
                {pokemons.map((result) => (
                    <Suspense key={result.name} fallback={<li css={skeletonCss} />}>
                        <PokemonItem {...result} />
                    </Suspense>
                ))}
            </ul>
            {!!next && <div ref={ref} css={inViewCss} />}
        </>
    )
}

const titleCss = css`
    font-weight: bold;
    font-size: 28px;
`

const ulCss = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
`

const skeletonCss = css`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

const inViewCss = css`
    width: 100%;
    padding-bottom: 80px;
`

import { graphql } from '@/__generated__'
import { NamedApiResource } from '@/__generated__/graphql'
import { useGraphQL } from '@/queries/config'
import pokemonNames from '@/utils/pokemon.names'
import { css } from '@emotion/react'

const document = graphql(`
    query PokemonQuery($id: Int!) {
        pokemon(id: $id) {
            sprites {
                front_default
            }
        }
    }
`)

export default function PokemonItem({ name, url }: NamedApiResource) {
    const pokemonId = +getPokemonId(url)
    const { data } = useGraphQL(document, { variables: { id: pokemonId } })
    const { sprites } = data.pokemon!
    const pokemonName = pokemonNames[name] ?? name

    return (
        <li css={liCss}>
            <span css={spanCss}>
                {pokemonId} : {pokemonName}
            </span>
            <img css={imgCss} src={sprites.front_default} alt={pokemonName} />
        </li>
    )
}

function getPokemonId(url: string) {
    return url
        .split('/')
        .filter((item) => !!item)
        .at(-1)!
}

const liCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

const spanCss = css`
    width: 100%;
    text-align: left;
    font-weight: bold;
`

const imgCss = css`
    width: 250px;
    height: 250px;
`

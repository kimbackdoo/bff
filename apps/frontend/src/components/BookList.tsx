import { graphql } from '@/__generated__/gql'
import { useGraphQL } from '@/queries/config'
import { css } from '@emotion/react'

interface Props {
    query: string
}

const document = graphql(`
    query BookSearchQuery($query: String!, $display: Int) {
        books(query: $query, display: $display) {
            total
            items {
                title
                link
                image
                author
                discount
                description
            }
        }
    }
`)

export default function BookList({ query }: Props) {
    const { data } = useGraphQL(document, { variables: { query, display: 100 } })

    const { total, items } = data.books!

    return (
        <>
            <p css={pCss}>검색 총 개수: {total}</p>
            <ul css={ulCss}>
                {items.map(({ title, link, image, author, discount, description }) => (
                    <li key={title}>
                        <a css={aCss} href={link}>
                            <img css={imgCss} src={image} alt={title} />
                            <div css={contentCss}>
                                <p>제목 : {title}</p>
                                <p>저자 : {author}</p>
                                <p>가격 : {discount}</p>
                                <p>{description}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}

const pCss = css`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
`

const ulCss = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
`

const aCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    &:hover {
        img {
            opacity: 0.3;
        }

        > div {
            opacity: 1;
        }
    }
`

const imgCss = css`
    width: 250px;
    height: 250px;
`

const contentCss = css`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    line-height: 1.5;
`

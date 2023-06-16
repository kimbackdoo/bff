import { css } from '@emotion/react'

const emptyArrays = Array.from({ length: 21 })

export default function BookListFallback() {
    return (
        <>
            <p css={pCss}>검색 총 개수: </p>
            <ul css={ulCss}>
                {emptyArrays.map((_, index) => (
                    <li css={liCss} key={index}></li>
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

const liCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
    height: 350px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`

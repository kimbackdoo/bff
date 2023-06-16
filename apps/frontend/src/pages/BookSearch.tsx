import BookList from '@/components/BookList'
import BookListFallback from '@/components/BookListFallback'
import { css } from '@emotion/react'
import { Suspense, useState } from 'react'

export default function BookSearchPage() {
    const [input, setInput] = useState('')
    const [query, setQuery] = useState('')

    return (
        <>
            <div css={searchCss}>
                <input
                    css={inputCss}
                    placeholder="책을 검색하세요."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button css={buttonCss} type="button" onClick={() => setQuery(input)}>
                    검색
                </button>
            </div>
            {!!query && (
                <Suspense fallback={<BookListFallback />}>
                    <BookList query={query} />
                </Suspense>
            )}
        </>
    )
}

const searchCss = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const inputCss = css`
    width: 300px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: 0.2s;

    &:hover {
        border-color: #888;
    }
`

const buttonCss = css`
    padding: 13px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

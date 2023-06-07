import { routes } from '@/routes/router'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <p>원하시는 메뉴로 이동해주세요.</p>
            <ul css={ulCss}>
                {routes.map(({ path, name }) => (
                    <li key={path}>
                        <Link css={linkCss} to={path}>
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

const ulCss = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
`

const linkCss = css`
    display: block;
    padding: 20px;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    background-color: #eee;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(10px);
    }
`

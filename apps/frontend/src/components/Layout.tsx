import { getShowedRoutes, routes } from '@/routes/router'
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Link, Outlet, matchPath, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    const title = getCurrentTitle(pathname)

    useEffect(() => {
        document.title = title
    }, [title])

    return (
        <div css={wrapperCss}>
            <nav css={navCss}>
                <ul>
                    {getShowedRoutes().map(({ path, title }) => (
                        <li key={path}>
                            <Link css={linkCss} to={path}>
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <main css={mainCss}>
                <header css={headerCss}>{title}</header>
                <div css={contentCss}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

function getCurrentTitle(pathname: string) {
    const { title } = routes.find(({ path }) => !!matchPath(path, pathname))!
    return title
}

const wrapperCss = css`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

const navCss = css`
    flex: 1;
    padding: 10px;
    border-right: 1px solid #ddd;
`

const linkCss = css`
    display: block;
    padding: 20px;
    transition: 0.2s;

    &:hover {
        background-color: #ddd;
        border-radius: 5px;
    }
`

const mainCss = css`
    flex: 4;
`

const headerCss = css`
    padding: 20px;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #ddd;
`

const contentCss = css`
    padding: 20px;
    height: calc(100% - 60px);
    overflow: auto;
`

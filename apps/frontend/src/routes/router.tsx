import Layout from '@/components/Layout'
import BookSearchPage from '@/pages/BookSearch'
import Home from '@/pages/Home'
import PokemonPage from '@/pages/Pokemon'
import PostPage from '@/pages/Post'
import PostDetailPage from '@/pages/PostDetail'
import { ReactNode } from 'react'
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom'

type RouteType = {
    id: number
    open: boolean
    path: string
    index?: boolean
    title: string
    element: ReactNode
    children?: number[]
}

// ?? 재귀 구조 줄이는 방법 찾아볼것
export const routes: RouteType[] = [
    {
        id: 0,
        open: true,
        path: '/',
        index: true,
        title: '홈',
        element: <Home />,
    },
    {
        id: 1,
        open: true,
        path: '/pokemons',
        title: '포켓몬 페이지',
        element: <PokemonPage />,
    },
    {
        id: 2,
        open: true,
        path: '/book-search',
        title: '책 검색 페이지',
        element: <BookSearchPage />,
    },
    {
        id: 3,
        open: true,
        path: '/posts',
        index: true,
        title: '포스트 페이지',
        element: <PostPage />,
        children: [4],
    },
    {
        id: 4,
        open: false,
        path: '/posts/:id',
        title: '포스트 상세 페이지',
        element: <PostDetailPage />,
    },
]

export function getOpenedRoutes() {
    return routes.filter(({ open }) => open)
}

// TODO refactoring 필요
function createRoutes(routes: RouteType[]) {
    const visited = new Set<number>()

    return routes.reduce((result, route, idx) => {
        const { path, index, element, children } = route

        if (visited.has(idx)) return result
        if (!index) return [...result, { path, element }]
        if (!children?.length) return [...result, { index, element }]

        const childrenRoute = children.map((target) => {
            visited.add(target)
            const { path: childrenPath, element } = routes[target]
            const nextPath = childrenPath.replace(`${path}/`, '')
            return { path: nextPath, element }
        })

        const nextRoute = {
            path,
            children: [{ index, element }, ...childrenRoute],
        }
        return [...result, nextRoute]
    }, [] as RouteObject[])
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: createRoutes(routes),
    },
])

export default function Router() {
    return <RouterProvider router={router} />
}

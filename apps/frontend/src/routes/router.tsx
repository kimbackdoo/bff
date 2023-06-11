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
    parentId?: number
    show: boolean
    path: string
    index?: boolean
    title: string
    element: ReactNode
}

export const routes: RouteType[] = [
    {
        id: 0,
        show: true,
        path: '/',
        index: true,
        title: '홈',
        element: <Home />,
    },
    {
        id: 1,
        show: true,
        path: '/pokemons',
        title: '포켓몬 페이지',
        element: <PokemonPage />,
    },
    {
        id: 2,
        show: true,
        path: '/book-search',
        title: '책 검색 페이지',
        element: <BookSearchPage />,
    },
    {
        id: 3,
        show: true,
        path: '/posts',
        index: true,
        title: '포스트 페이지',
        element: <PostPage />,
    },
    {
        id: 4,
        parentId: 3,
        show: false,
        path: '/posts/:id',
        title: '포스트 상세 페이지',
        element: <PostDetailPage />,
    },
]

export function getShowedRoutes() {
    return Object.values(routes).filter(({ show }) => show)
}

function createRoutes(routes: RouteType[]) {
    const groupedRoutes = routes.reduce((result, route) => {
        const { id, parentId, path, index, element } = route

        if (!!index) return { ...result, [id]: { path, children: [{ index, element }] } }
        if (!parentId) return { ...result, [id]: { path, element } }

        const { path: parentPath, children } = result[parentId]
        const nextRoute = { path: parentPath, children: [...(children ?? []), { path, element }] }
        return { ...result, [parentId]: nextRoute }
    }, {} as Record<number, RouteObject>)

    return Object.values(groupedRoutes)
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

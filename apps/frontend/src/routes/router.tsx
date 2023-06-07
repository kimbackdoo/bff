import Layout from '@/components/Layout'
import BookSearchPage from '@/pages/BookSearch'
import Home from '@/pages/Home'
import PokemonPage from '@/pages/Pokemon'
import PostPage from '@/pages/Post'
import PostDetailPage from '@/pages/PostDetail'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

export const routes = [
    {
        path: '/',
        name: '홈',
        element: <Home />,
    },
    {
        path: '/pokemons',
        name: '포켓몬 페이지',
        element: <PokemonPage />,
    },
    {
        path: '/book-search',
        name: '책 검색 페이지',
        element: <BookSearchPage />,
    },
    {
        path: '/posts',
        name: '포스트 페이지',
        children: [
            { index: true, element: <PostPage /> },
            { path: ':id', name: '포스트 상세 페이지', element: <PostDetailPage /> },
        ],
    },
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [...routes],
    },
])

export default function Router() {
    return <RouterProvider router={router} />
}

import Router from '@/routes/router'
import global from '@/styles/global'
import { Global } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Suspense } from 'react'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            suspense: true,
        },
    },
})

export default function App() {
    return (
        <>
            <Global styles={global} />
            <QueryClientProvider client={queryClient}>
                <Suspense fallback={<p>Loading...</p>}>
                    <Router />
                </Suspense>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </>
    )
}

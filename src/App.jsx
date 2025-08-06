import { React, lazy, Suspense, useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration, useNavigate } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import Header from './layouts/Header/Header'
import Footer from './layouts/Footer/Footer'

import AnimatedPageWrapper from './pages/AnimatedPageWrapper'
import LineLoadingSignal from './components/LoadSignals/LineLoadingSignal'
import ErrorSignal from './components/LoadSignals/ErrorSignal'

const HomePage = lazy(() => import("./pages/HomePage/HomePage"))
const AllCoinsPage = lazy(() => import("./pages/AllCoinsPage/AllCoinsPage"))
const CoinPage = lazy(() => import("./pages/CoinPage/CoinPage"))
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"))

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
        }
    }
})

function SuspenseWrapper(Component) {

    return (
        <Suspense fallback={<LineLoadingSignal />}>
            <Component />
        </Suspense>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorSignal />,
        children: [
            {
                index: true,
                element: SuspenseWrapper(HomePage)
            },
            {
                path: 'all-coins',
                element: SuspenseWrapper(AllCoinsPage)
            },
            {
                path: 'coin/:coinID',
                element: SuspenseWrapper(CoinPage)
            },
            {
                path: 'about',
                element: SuspenseWrapper(AboutPage)
            }
        ]
    }
])

function Layout() {

    useEffect(() => {
        import('./styles/App.css');
    }, [])

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div id="app-container">
                    <Header />
                    <main>
                        <AnimatePresence mode="wait">
                            <AnimatedPageWrapper>
                                <Outlet />
                            </AnimatedPageWrapper>
                        </AnimatePresence>
                    </main>
                    <Footer />
                </div>
            </QueryClientProvider>
            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.pathname
                }}
            />
        </>
    );
}

function App() {

    return (
        <RouterProvider router={router} />
    )
}

export default App
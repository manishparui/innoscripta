import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/home/HomePage'

export default function AppRoutes(): JSX.Element {
    return (
        <Routes>
            {routes.map((route: any, index: number) => {
                return(
                    <Route key={index} path={route.path} element={route.page}/>
                )
            })}
        </Routes>
    )
}

const routes: any[] = [
    {
        path: '/',
        page: <HomePage />
    },
]

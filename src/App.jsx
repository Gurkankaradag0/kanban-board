import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Page404 from './pages/404'

const App = () => {
    return (
        <>
            <Routes>
                <Route
                    exact
                    path='/'
                    element={<Home />}
                />
                <Route
                    path='/login'
                    element={<Login />}
                />
                <Route
                    path='/register'
                    element={<Register />}
                />
                <Route
                    path='*'
                    element={<Page404 />}
                />
            </Routes>
        </>
    )
}

export default App

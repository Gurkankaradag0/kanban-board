import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { verifyUser } from '@/services/api'
import { useUser } from '@/store/hooks/user'
import { setUser } from '@/store/actions/user'

import Loader from '@/components/Loader'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Boards from '@/components/Boards'
import { Helmet } from 'react-helmet'

const Home = () => {
    const navigate = useNavigate()
    const [cookies] = useCookies(['access_token'])
    const user = useUser()

    const verify = async (access_token) => {
        const response = await verifyUser(access_token)
        if (response?.error) navigate('/login')
        setUser(response)
    }

    useEffect(() => {
        if (!cookies.access_token) navigate('/login')
        verify(cookies.access_token)
    }, [cookies])

    if (!cookies.access_token || !user?._id) return <Loader />
    return (
        <>
            <Helmet>
                <title>Kanban Board</title>
            </Helmet>

            <Header />
            <main className='flex-1 overflow-auto w-full scroller'>
                <Boards />
            </main>
            <Footer />
        </>
    )
}

export default Home

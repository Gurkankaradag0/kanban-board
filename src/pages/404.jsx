import Footer from '@/components/footer'
import { useLocale } from '@/store/hooks/intl'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const Page404 = () => {
    const locale = useLocale()
    return (
        <div className='flex flex-col h-full'>
            <Helmet>
                <title>Kanban Board - 404</title>
            </Helmet>
            <div className='flex-1 flex flex-col justify-center items-center gap-2'>
                <span className='text-[12rem] font-extrabold leading-none select-none'>404</span>
                <span>{locale.lost}</span>
                <Link
                    to='/'
                    className='bg-primary rounded-md font-semibold py-1 px-4'
                >
                    {locale.homepage}
                </Link>
            </div>
            <Footer />
        </div>
    )
}

export default Page404

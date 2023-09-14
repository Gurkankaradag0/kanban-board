import { useLocale } from '@/store/hooks/intl'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Footer from './footer'

const FormLayout = ({ children, pageTitle, message }) => {
    const locale = useLocale()
    return (
        <>
            <Helmet>
                <title>Kanban Board - {pageTitle}</title>
            </Helmet>
            <div className='w-[27.5rem] mx-auto px-12 py-14 bg-lighter shadow-lg rounded-md flex flex-col'>
                <Link
                    to='/'
                    className='mb-12 flex justify-center mt-10 text-backdrop text-3xl font-semibold'
                >
                    Kanban Board
                </Link>

                <ul className='grid gap-y-8'>
                    {message && <div className='bg-red-500 rounded-md py-2 px-4 text-sm text-center my-2'>{locale.login[message]}</div>}
                    {children}
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default FormLayout

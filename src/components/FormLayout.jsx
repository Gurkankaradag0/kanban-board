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
            <div className='w-[27.5rem] max-[560px]:w-[20rem] max-[420px]:w-[18rem] mx-auto px-12 max-[560px]:px-8 max-[420px]:px-6 py-14 max-[560px]:py-10 max-[420px]:py-8 bg-lighter shadow-lg rounded-md flex flex-col'>
                <Link
                    to='/'
                    className='mb-12 max-[560px]:mb-8 max-[420px]:mb-6 flex justify-center mt-10 max-[560px]:mt-6 max-[420px]:mt-4 text-backdrop text-4xl max-[560px]:text-3xl max-[420px]:text-2xl font-semibold'
                >
                    Kanban Board
                </Link>

                <ul className='grid gap-y-8 max-[560px]:gap-y-4 max-[420px]:gap-y-2'>
                    {message && <div className='bg-red-500 rounded-md py-2 px-4 text-sm text-center my-2'>{locale.login[message]}</div>}
                    {children}
                </ul>
            </div>
            <Footer />
        </>
    )
}

export default FormLayout

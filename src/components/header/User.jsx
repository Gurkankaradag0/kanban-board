import { deleteUser } from '@/services/api'
import { useLocale } from '@/store/hooks/intl'
import { useUser } from '@/store/hooks/user'
import { LogOutIcon, TrashIcon, ChevronDownIcon } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const User = () => {
    const user = useUser()
    const locale = useLocale()
    const navigate = useNavigate()
    const [cookies, _, removeCookies] = useCookies(['access_token', 'refresh_token'])

    const deleteMe = async () => {
        const response = await deleteUser(cookies.access_token)
        if (!response?.user) navigate('/login')
    }

    const logOut = () => {
        removeCookies('access_token')
        removeCookies('refresh_token')
        navigate('/login')
    }

    return (
        <div className='absolute top-1/2 -translate-y-1/2 right-2 group z-10'>
            <button className='flex items-center justify-center gap-1 text-sm'>
                {user.full_name}
                <ChevronDownIcon
                    size={16}
                    strokeWidth={3}
                />
            </button>
            <nav className='absolute top-full right-0 translate-y-1 shadow-box rounded bg-white py-1 min-w-[9rem] opacity-0 invisible transition-all group-focus-within:opacity-100 group-focus-within:visible'>
                <button
                    className='h-9 flex items-center px-2 font-medium text-xs transition-all text-gray-800 hover:bg-gray-300 w-full'
                    onClick={logOut}
                >
                    <span className='w-9 h-9 flex items-center justify-center text-gray-800'>
                        <LogOutIcon size={18} />
                    </span>
                    {locale.account.logout}
                </button>

                <button
                    className='h-9 flex items-center px-2 font-medium text-xs transition-all text-red-600 hover:bg-gray-300 w-full'
                    onClick={deleteMe}
                >
                    <span className='w-9 h-9 flex items-center justify-center text-red-600'>
                        <TrashIcon size={18} />
                    </span>
                    {locale.account.delete}
                </button>
            </nav>
        </div>
    )
}

export default User

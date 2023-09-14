import { deleteUser } from '@/services/api'
import { useLocale } from '@/store/hooks/intl'
import { useUser } from '@/store/hooks/user'
import { LogOutIcon, TrashIcon, ChevronDownIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import classNames from 'classnames'

const User = () => {
    const [open, setOpen] = useState(false)
    const ref = useRef()

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

    const onClickHandle = (e) => {
        if (!e.composedPath().includes(ref.current)) setOpen(false)
    }

    useEffect(() => {
        isMobile && document.body.addEventListener('click', onClickHandle)
        return () => {
            isMobile && document.body.removeEventListener('click', onClickHandle)
        }
    }, [])

    return (
        <div
            className='absolute top-1/2 -translate-y-1/2 right-2 group z-10'
            ref={ref}
        >
            <button
                className='flex items-center justify-center gap-1 text-sm'
                onClick={() => isMobile && setOpen(true)}
            >
                {user.full_name}
                <ChevronDownIcon
                    size={16}
                    strokeWidth={3}
                />
            </button>
            <nav
                className={classNames({
                    'absolute top-full right-0 translate-y-1 shadow-box rounded bg-white py-1 min-w-[9rem] transition-all': true,
                    'opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible': !isMobile,
                    'opacity-100 visible': isMobile && open,
                    'opacity-0 invisible': isMobile && !open
                })}
            >
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

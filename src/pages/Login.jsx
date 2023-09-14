import { loginUser } from '@/services/api'
import { useLocale } from '@/store/hooks/intl'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { setUser } from '@/store/actions/user'
import FormLayout from '@/components/FormLayout'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)

    const [_, setCookies] = useCookies(['access_token', 'refresh_token'])

    const locale = useLocale()
    const navigate = useNavigate()

    const onSubmitHandle = async () => {
        if (!email || !password) return setMessage('cannotBeLeftBlank')
        setDisabled(true)
        const response = await loginUser(email, password)
        setDisabled(false)
        if (response?.error) return setMessage(response.error)
        setCookies('access_token', response.tokens.access_token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) })
        setCookies('refresh_token', response.tokens.refresh_token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) })
        setUser(response)
        navigate('/')
    }

    return (
        <FormLayout
            pageTitle={locale.login.pageTitle}
            message={message}
        >
            <li className='flex flex-col text-xs text-gray-500'>
                <label htmlFor='email'>{locale.email}</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    className='mt-2 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400 w-full'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={disabled}
                />
            </li>
            <li className='flex flex-col text-xs text-gray-500'>
                <label htmlFor='password'>{locale.password}</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    className='mt-2 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400 w-full'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={disabled}
                />
            </li>
            <li>
                <button
                    className='w-full h-9 flex items-center justify-center rounded bg-primary text-sm text-white'
                    onClick={onSubmitHandle}
                    disabled={disabled}
                >
                    {locale.login.button}
                </button>
            </li>
            <li className='text-sm text-center text-gray-500'>
                {locale.login.signup}
                {` `}
                <Link
                    to='/register'
                    className='text-blue-400 hover:underline'
                >
                    {locale.login.signup_button}
                </Link>
            </li>
        </FormLayout>
    )
}

export default Login

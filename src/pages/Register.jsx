import FormLayout from '@/components/FormLayout'
import { registerUser } from '@/services/api'
import { useLocale } from '@/store/hooks/intl'
import { EyeOff } from 'lucide-react'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [hide, setHide] = useState(true)
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)
    const locale = useLocale()

    const onSubmitHandle = async () => {
        if (!email || !fullName || !password) return setMessage('cannotBeLeftBlank')
        if (password.length < 8) return setMessage('password_longer')
        setDisabled(true)
        const response = await registerUser(email, fullName, password)
        setDisabled(false)
        if (response?.error) return setMessage(response.error)
        navigate('/login')
    }
    return (
        <FormLayout
            pageTitle={locale.register.pageTitle}
            message={message}
        >
            <li className='flex flex-col text-xs text-gray-500'>
                <label htmlFor='email'>{locale.email}</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    className='mt-2 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={disabled}
                />
            </li>
            <li className='flex flex-col text-xs text-gray-500'>
                <label htmlFor='fullname'>{locale.fullName}</label>
                <input
                    type='text'
                    name='fullname'
                    id='fullname'
                    className='mt-2 h-9 border border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={disabled}
                />
            </li>
            <li className='flex flex-col text-xs text-gray-500'>
                <label htmlFor='password'>{locale.password}</label>
                <label className='relative mt-2'>
                    <input
                        type={hide ? 'password' : 'text'}
                        name='password'
                        id='password'
                        className='h-9 border w-full border-gray-300 rounded outline-none px-3 text-black focus:border-gray-400'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={disabled}
                    />
                    <span className='absolute cursor-pointer top-0 right-0 h-full w-9 text-gray-400 hover:text-gray-600 flex items-center justify-center'>
                        {hide ? <Eye onClick={() => setHide(false)} /> : <EyeOff onClick={() => setHide(true)} />}
                    </span>
                </label>
                <div className='mt-2 text-gray-400'>{locale.register.password_longer}</div>
            </li>
            <li>
                <button
                    className='w-full h-9 flex items-center justify-center rounded bg-primary text-sm text-white'
                    onClick={onSubmitHandle}
                    disabled={disabled}
                >
                    {locale.register.button}
                </button>
            </li>
            <li className='text-sm text-center text-gray-500'>
                {locale.register.signin}
                <Link
                    to='/login'
                    className='text-blue-400 hover:underline'
                >
                    {locale.register.signin_button}
                </Link>
            </li>
        </FormLayout>
    )
}

export default Register

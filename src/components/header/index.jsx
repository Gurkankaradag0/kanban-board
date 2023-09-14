import { Link } from 'react-router-dom'
import User from './User'
import { useWindowSize } from 'react-use'

const Header = () => {
    const { width } = useWindowSize()
    return (
        <header className={`flex ${width <= 960 ? 'justify-start px-4' : 'justify-center'} items-center h-[6.5rem] relative w-full`}>
            <Link
                to='/'
                className='text-5xl font-bold'
            >
                {width <= 720 ? 'KB' : 'Kanban Board'}
            </Link>
            <User />
        </header>
    )
}

export default Header

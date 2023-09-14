import { Link } from 'react-router-dom'
import User from './User'

const Header = () => {
    return (
        <header className='flex justify-center items-center h-[6.5rem] relative w-full'>
            <Link
                to='/'
                className='text-5xl font-bold'
            >
                Kanban Board
            </Link>
            <User />
        </header>
    )
}

export default Header

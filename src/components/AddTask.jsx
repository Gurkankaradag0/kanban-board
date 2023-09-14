import { createUserTask } from '@/services/api'
import { setBoard } from '@/store/actions/board'
import { useLocale } from '@/store/hooks/intl'
import { PlusIcon } from 'lucide-react'
import { useCookies } from 'react-cookie'

const AddTask = ({ board }) => {
    const [cookies] = useCookies(['access_token'])
    const locale = useLocale()

    const createTask = async () => {
        const response = await createUserTask(board._id, { task: 'Task' }, cookies.access_token)
        if (!response?.error) setBoard(response)
    }

    return (
        <button
            onClick={createTask}
            className='h-9 flex flex-shrink-0 items-center transition-all w-full text-sm text-lighter font-medium justify-center rounded bg-lighter bg-opacity-0 hover:bg-opacity-30'
        >
            <PlusIcon
                size={20}
                className='mr-2'
            />
            {locale.addTask}
        </button>
    )
}

export default AddTask

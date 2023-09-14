import { createUserBoard } from '@/services/api'
import { addBoard } from '@/store/actions/board'
import { useLocale } from '@/store/hooks/intl'
import { PlusIcon } from 'lucide-react'
import { useCookies } from 'react-cookie'

const AddBoard = () => {
    const locale = useLocale()
    const [cookies] = useCookies(['access_token'])

    const addUserBoard = async () => {
        const response = await createUserBoard({ title: 'To Do', color: '#ffffff' }, cookies.access_token)
        if (!response?.error) addBoard(response)
    }

    return (
        <div className='w-[17.5rem] flex-shrink-0 flex flex-col flex-wrap'>
            <header className='h-9 flex items-center mb-2 justify-between'>
                <button
                    className='h-9 flex flex-shrink-0 items-center transition-all w-full text-sm text-lighter font-medium justify-center rounded bg-lighter bg-opacity-0 hover:bg-opacity-30'
                    onClick={addUserBoard}
                >
                    <PlusIcon
                        size={20}
                        className='mr-2'
                    />
                    {locale.addBoard}
                </button>
            </header>
        </div>
    )
}

export default AddBoard

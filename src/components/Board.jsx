import { useEffect, useState } from 'react'
import { deleteBoard, editBoard, setBoard, setColor } from '@/store/actions/board'
import { TrashIcon, CircleIcon } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { invertColor } from '@/utils/helpers'
import { deleteUserBoard, editUserBoard } from '@/services/api'
import { useCookies } from 'react-cookie'
import Tasks from './Tasks'
import HexColor from './HexColor'

const Board = ({ board }) => {
    const [boardTitle, setBoardTitle] = useState(board.title)
    const [boardColor, setBoardColor] = useState(board.color)
    const [readOnly, setReadOnly] = useState(true)
    const [cookies] = useCookies(['access_token'])

    const editBoardTitle = async () => {
        const response = await editUserBoard(board._id, { title: board.title }, cookies.access_token)
        if (response?.error) return editBoard(board._id, boardTitle)
        setBoard(response)
        setBoardTitle(response.title)
    }

    const editBoardColor = async () => {
        const response = await editUserBoard(board._id, { color: board.color }, cookies.access_token)
        if (response?.error) return setColor(board._id, boardColor)
        setBoard(response)
        setBoardColor(response.color)
    }

    const delBoard = async () => {
        const response = await deleteUserBoard(board._id, cookies.access_token)
        if (!response?.error) deleteBoard(board._id)
    }

    useEffect(() => {
        readOnly && editBoardTitle()
    }, [readOnly])

    return (
        <div className='w-[17.5rem] flex-shrink-0 flex flex-col flex-wrap'>
            <header className='h-9 flex items-center mb-2 justify-between'>
                <input
                    value={board.title}
                    onChange={(e) => editBoard(board._id, e.target.value)}
                    readOnly={readOnly}
                    onDoubleClick={() => setReadOnly(false)}
                    onBlur={() => setReadOnly(true)}
                    onKeyDown={({ key }) => key === 'Enter' && setReadOnly(true)}
                    className={`font-medium rounded-md outline-none w-full px-2 border-none ${
                        readOnly ? 'bg-transparent ' : 'bg-lighter text-backdrop'
                    }`}
                />
                <nav className='flex items-center gap-x-1'>
                    <HexColor
                        board={board}
                        onBlurCapture={editBoardColor}
                    />
                    <button
                        onClick={delBoard}
                        className='w-7 h-7 rounded text-red-600 hover:bg-hover flex items-center justify-center'
                    >
                        <TrashIcon size={20} />
                    </button>
                </nav>
            </header>

            <Tasks board={board} />
        </div>
    )
}

export default Board

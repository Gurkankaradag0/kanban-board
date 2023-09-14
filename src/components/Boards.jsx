import { useBoardLoading, useBoards } from '@/store/hooks/board'
import Board from './Board'
import AddBoard from './AddBoard'
import { DragDropContext } from 'react-beautiful-dnd'
import { setBoards, moveTask } from '@/store/actions/board'
import BoardLoader from './BoardLoader'
import { useEffect } from 'react'
import { getUserBoards, moveUserTask } from '@/services/api'
import { useCookies } from 'react-cookie'

const Boards = () => {
    const boards = useBoards()
    const boardLoading = useBoardLoading()
    const [cookies] = useCookies(['access_token'])

    const onDragEndHandle = async (e) => {
        const { draggableId, source, destination } = e
        const { index: sourceIndex, droppableId: oldBoardID } = source
        if (destination) {
            const { index: destIndex, droppableId: newBoardID } = destination
            const _new = oldBoardID !== newBoardID
            const response = await moveUserTask(oldBoardID, draggableId, _new ? newBoardID : undefined, destIndex, cookies.access_token)
            if (response?.error) return console.log(response.error)
            moveTask(oldBoardID, sourceIndex, newBoardID, draggableId, destIndex)
        }
    }

    const getBoards = async (access_token) => {
        const response = await getUserBoards(access_token)
        if (!response?.error) setBoards(response)
    }

    useEffect(() => {
        getBoards(cookies.access_token)
    }, [cookies])

    if (boardLoading) return <BoardLoader />

    return (
        <DragDropContext onDragEnd={onDragEndHandle}>
            <div className='flex justify-center gap-x-4 py-4 px-6 h-full min-w-max'>
                {boards.map((board) => (
                    <Board
                        key={board._id}
                        board={board}
                    />
                ))}

                {boards.length <= 4 && <AddBoard />}
            </div>
        </DragDropContext>
    )
}

export default Boards

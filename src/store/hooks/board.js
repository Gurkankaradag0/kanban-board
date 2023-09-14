import { useSelector } from 'react-redux'

export const useBoardLoading = () => useSelector((state) => state.board.loading)

export const useBoards = () => useSelector((state) => state.board.boards)
export const useBoard = (boardID) =>
    useSelector((state) => {
        const boards = state.board.boards
        const board = boards.find((board) => board.id === boardID)
        return board
    })

export const useTasks = (boardID) =>
    useSelector((state) => {
        const boards = state.board.boards
        const board = boards.find((board) => board.id === boardID)
        return board.tasks
    })

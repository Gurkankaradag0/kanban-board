import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

const initialState = {
    loading: true,
    boards: [
        {
            id: nanoid(),
            title: 'To Do',
            color: '#ebebeb',
            tasks: [
                {
                    id: nanoid(),
                    task: 'Add new to do.'
                }
            ]
        }
    ]
}

const board = createSlice({
    name: 'board',
    initialState,
    reducers: {
        _setBoards: (state, action) => {
            state.boards = action.payload
            state.loading = false
        },
        _addBoard: (state, action) => {
            state.boards = [...state.boards, action.payload]
        },
        _setBoard: (state, action) => {
            const { _id } = action.payload
            state.boards = state.boards.map((board) => {
                if (board._id === _id) board = action.payload
                return board
            })
        },
        _editBoard: (state, action) => {
            const { boardID, title } = action.payload
            state.boards = state.boards.map((board) => {
                if (board._id === boardID) board.title = title
                return board
            })
        },
        _deleteBoard: (state, action) => {
            const boardIndex = state.boards.findIndex((board) => board._id === action.payload)
            state.boards.splice(boardIndex, 1)
        },
        _setColor: (state, action) => {
            const { boardID, color } = action.payload
            state.boards = state.boards.map((board) => {
                if (board._id === boardID) board.color = color
                return board
            })
        },
        _addTask: (state, action) => {
            const { boardID, task } = action.payload
            const boardIndex = state.boards.findIndex((board) => board._id === boardID)
            state.boards[boardIndex].tasks = [...state.boards[boardIndex].tasks, task]
        },
        _editTask: (state, action) => {
            const { boardID, taskID, task } = action.payload
            const boardIndex = state.boards.findIndex((board) => board._id === boardID)
            state.boards[boardIndex].tasks = state.boards[boardIndex].tasks.map((_task) => {
                if (_task._id === taskID) _task.task = task
                return _task
            })
        },
        _deleteTask: (state, action) => {
            const { index, boardID } = action.payload
            const boardIndex = state.boards.findIndex((board) => board._id === boardID)
            state.boards[boardIndex].tasks.splice(index, 1)
        },
        _moveTask: (state, action) => {
            const { destIndex, sourceIndex, oldBoardID, newBoardID, taskID } = action.payload
            const oldBoardIndex = state.boards.findIndex((board) => board._id === oldBoardID)
            const newBoardIndex = state.boards.findIndex((board) => board._id === newBoardID)
            const taskIndex = state.boards[oldBoardIndex].tasks.findIndex((task) => task._id === taskID)
            const task = state.boards[oldBoardIndex].tasks[taskIndex]
            state.boards[oldBoardIndex].tasks.splice(sourceIndex, 1)
            state.boards[newBoardIndex].tasks.splice(destIndex, 0, task)
        }
    }
})

export const { _setBoards, _addBoard, _setBoard, _editBoard, _deleteBoard, _setColor, _addTask, _editTask, _deleteTask, _moveTask } = board.actions
export default board.reducer

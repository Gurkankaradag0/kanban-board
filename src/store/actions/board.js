import store from '..'
import { _setBoard, _addBoard, _addTask, _deleteTask, _deleteBoard, _editBoard, _editTask, _setColor, _moveTask, _setBoards } from '../reducers/board'

export const setBoards = (boards) => store.dispatch(_setBoards(boards))
export const addBoard = (board) => store.dispatch(_addBoard(board))
export const setBoard = (board) => store.dispatch(_setBoard(board))
export const editBoard = (boardID, title) => store.dispatch(_editBoard({ boardID, title }))
export const deleteBoard = (boardID) => store.dispatch(_deleteBoard(boardID))
export const setColor = (boardID, color) => store.dispatch(_setColor({ boardID, color }))

export const addTask = (boardID, task) => store.dispatch(_addTask({ boardID, task }))
export const editTask = (boardID, taskID, task) => store.dispatch(_editTask({ boardID, taskID, task }))
export const deleteTask = (boardID, index) => store.dispatch(_deleteTask({ boardID, index }))
export const moveTask = (oldBoardID, sourceIndex, newBoardID, taskID, destIndex) =>
    store.dispatch(_moveTask({ oldBoardID, sourceIndex, newBoardID, taskID, destIndex }))

import { configureStore } from '@reduxjs/toolkit'
import intl from './reducers/intl'
import board from './reducers/board'
import user from './reducers/user'

const store = configureStore({
    reducer: {
        intl,
        board,
        user
    },
    devTools: import.meta.env.DEV
})

export default store

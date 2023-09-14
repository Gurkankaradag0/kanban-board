import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {}
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        _setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { _setUser } = user.actions
export default user.reducer

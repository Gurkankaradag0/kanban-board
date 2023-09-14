import { createSlice } from '@reduxjs/toolkit'
import tr from '@/locales/tr.js'
import en from '@/locales/en.js'

const initialState = {
    locale: localStorage.getItem('lang') || 'en',
    locales: {
        tr,
        en
    }
}

const intl = createSlice({
    name: 'intl',
    initialState,
    reducers: {
        _updateIntl: (state, action) => {
            state.locale = action.payload
            localStorage.setItem('lang', state.locale)
        }
    }
})

export const { _updateIntl } = intl.actions
export default intl.reducer

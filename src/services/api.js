import axios from 'axios'

export const verifyUser = async (access_token) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/users`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const loginUser = async (email, password) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/users/login`, {
            email,
            password
        })

        return data
    } catch (e) {
        if (e.response.status === 400) return { error: 'BAD_REQUEST' }
        if (e.response.status === 404) return { error: 'NOT_FOUND' }
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const registerUser = async (email, full_name, password) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/users`, {
            email,
            full_name,
            password
        })

        return data
    } catch (e) {
        if (e.response.data?.code === 11000) return { error: 'EMAIL_ALREADY_USED' }
        if (e.response.data?.error) {
            if (e.response.data.error.includes('must be a valid email')) return { error: 'MUST_BE_A_VALID_EMAIL' }
            if (e.response.data.error.includes('"full_name" length must be at least 3 characters long')) return { error: 'MUST_BE_A_VALID_FULLNAME' }
        }
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const deleteUser = async (access_token) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/users/delete`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const getUserBoards = async (access_token) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/users/sessions`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const createUserBoard = async (boardData, access_token) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/sessions`, boardData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const editUserBoard = async (id, boardData, access_token) => {
    try {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_ENDPOINT}/sessions/${id}`, boardData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const deleteUserBoard = async (id, access_token) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/sessions/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const createUserTask = async (boardID, taskData, access_token) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/sessions/${boardID}/add-task`, taskData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const editUserTask = async (boardID, taskID, taskData, access_token) => {
    try {
        const { data } = await axios.patch(`${import.meta.env.VITE_API_ENDPOINT}/sessions/${boardID}/${taskID}`, taskData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const deleteUserTask = async (boardID, taskID, access_token) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/sessions/${boardID}/${taskID}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

export const moveUserTask = async (boardID, taskID, newBoardID, index, access_token) => {
    try {
        const moveTaskData = { index }
        newBoardID && (moveTaskData.session_id = newBoardID)

        const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/sessions/${boardID}/${taskID}/move-task`, moveTaskData, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        return data
    } catch (e) {
        return { error: 'INTERNAL_SERVER_ERROR' }
    }
}

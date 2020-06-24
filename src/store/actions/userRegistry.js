import axios from 'axios'
import { SET_USER_INFO } from '../constant'

export const userRegistry = (userData) => {
    return (dispatch) => {
        return axios.post('/api/user/registry', userData)
    }
}

export const checkUserExist = (username) => {
    return dispatch => {
        return axios.get('/api/user/findUser', {
            params: {
                username
            }
        })
    }
}

export const set_user = (user) => {
    return {
        type: SET_USER_INFO,
        user
    }
}

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/user/login', userData)
    }
}



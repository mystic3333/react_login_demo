import {SET_USER_INFO} from '../constant'
import _, { isEmpty } from 'lodash'

let initialState = {
    isAuthenticated: false,
    user: {

    }
}

const auth = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_INFO:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            }
        default: 
            return state
    }
}

export default auth
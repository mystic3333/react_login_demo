import {ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE} from '../constant'
import lodash from 'lodash'


export const addFlashMessage = (message) => {
    return {
        type: ADD_FLASH_MESSAGE,
        message
    }
}

export const removeFlashMessage = (id) => {
    return {
        type: REMOVE_FLASH_MESSAGE,
        id
    }
}
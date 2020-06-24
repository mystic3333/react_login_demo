import {ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE} from '../constant'
import shortid from 'shortid'
import _ from 'lodash'


const addFlashMessage = (state=[], actions) => {
    switch(actions.type) {
        case ADD_FLASH_MESSAGE:
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: actions.message.type,
                    text: actions.message.text
                }
            ]
        case REMOVE_FLASH_MESSAGE:
            const index = _.findIndex(state, {id: actions.id})
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index+1)
                ]
            }
           
            return state
        default:
            return state
    }
}

export default addFlashMessage
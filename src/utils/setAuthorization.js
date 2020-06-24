import axios from 'axios'

const setAuthorization = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `mystic ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthorization
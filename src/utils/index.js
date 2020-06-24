import validator from 'validator'
import _, { isEmpty } from 'lodash'

// 校验登录时用户输入的状态
export const validatorInput = (data) => {
    let errors = {}

    const { username, password } = data
    if (validator.isEmpty(username)) {
        errors.username = 'username不能为空'
    } 
    else if (validator.isEmpty(password)) {
        errors.password = 'password不能为空'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
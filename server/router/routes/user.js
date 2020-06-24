const express = require('express')
const router = express.Router()
const isEmpty = require('lodash/isEmpty')
const validator = require('validator')
const db = require('../../db')
const jwt = require('jsonwebtoken')
const config = require('../../config')

const validatorInput = (data) => {
    const {username, email, password, repassword} = data
    let errors = {

    }
    if (validator.isEmpty(username)) {
        errors.username = '用户名不能为空'
    }
    if (validator.isEmpty(password)) {
        errors.password = '密码名不能为空'
    }
    if (validator.isEmpty(repassword)) {
        errors.repassword = '重复密码不能为空'
    }
    if (!validator.equals(password, repassword)) {
        errors.comfirmPassword = '两次密码不一致'
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

// 用户注册接口
router.post('/registry', (req, res) => {
    const {username, password} = req.body

    const { errors, isValid } = validatorInput(req.body)
    if (!isValid) {
        // 有错误
        res.status(400).json(errors)
    } else {
        // 没有错误
        const sql = `insert into users values(null,?,?)`
        const params = [username, password]
        db.insert(sql, params)
        .then(result => {
            console.log(result)
            res.status(200).json({
                msg: '注册成功'
            })
        }).catch(err => {
            console.log(err)
        })
    }
})

// 查询用户是否存在
router.get('/findUser', (req, res) => {
    const { username } = req.query
    if (username) {
        const sql = `select * from users where username=?`
        db.select(sql, username)
        .then(result => {
            if (result && result.length > 0) {
                res.status(200).json({
                    path: '/findUser',
                    msg: 'success',
                    error: {}
                })
            }else {
                res.status(400).json({
                    msg: 'fail'
                })
            }
        })
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    const sql = `select * from users where username=? and password=?`
    const params = [username, password]
    db.findOne(sql, params)
    .then(result => {
        if (result && result.length > 0) {
            const { id, username } = result[0]
            // 签发jwt token
            const token = jwt.sign({
                id,
                username
            }, config.JWT_SECRET)

            res.status(200).json({
                path: '/login',
                msg: '登录成功',
                code: 0,
                errMsg: '',
                token: token
            })
        } else {
            res.status(200).json({
                msg: '登录失败',
                code: -1,
                errMsg: '用户名或者密码不正确'
            })
        }
    })

})

module.exports = router
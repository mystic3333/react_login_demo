const mysql = require('mysql')
const { get } = require('lodash')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'react'
})

const query = (sql, params=[]) => {
    return new Promise((resolve, reject) => {
        try {
            db.query(sql, params, (error, result) => {
                if (error) {
                    reject(error)
                }else {
                    resolve(result)
                }
            })
        } catch {
            new Error('数据库链接异常')
        } 
    })
}

const select = (sql, username='') => {
    return query(sql, username)
}

const insert = (sql, params=[]) => {
    return query(sql, params) 
}

const findOne = (sql, params) => {
    return query(sql, params)
}


module.exports = {
    insert,
    select,
    findOne
}
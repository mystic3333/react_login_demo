### 项目初始化

1. 创建项目 

    npx-create-app react_project

2. 安装相关依赖

    生产环境: redux, react-redux, redux-thunk
    开发环境: redux-logger, redux-devtools-extension

3. nodemon自动更新代码

    全局安装: npm install nodemon -g

``` 
const express = require('express')
const app = express()
const router = require('./router')
const debug = require('debug')('my-application')

app.use('/api', router)

app.listen(4000,function() {
    debug('listening in port 4000')
})
```

### 页面路由搭建

``` 
import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default class Nav extends React.Component {
    render() {
        return (
            <div className="nav_container">
                <div className="login">
                    <Link to="/signin">registry</Link>
                </div>
                <div className="registry">
                    <Link to="/signup">login</Link>
                </div>
            </div>
        )
    }
}
```

### localStorage

用户保存token到本地

``` 
localStorage.setItem(key, value)
localStorage.removeItem(key)
```

### jsonwebtoken 

jwt鉴权工具

安装:

    npm install --save jsonwebtoken

``` 
// 签发token
const jwt = require('jsonwebtoken')
const secret = 'abcdeft_123465'

const token = jwt.sign({
    id: 1
    username: 'mystic'
}, secret)
```

### jwt-decode

安装:

    npm install --save jwt-decode

作用: jwt解码工具
参数: 传入token, 会将原来加密的对象解码出来出一个对象

``` 
const jwtDecode = require('jwt-decode)

jwtDecode(token)
```

### 高阶组件处理组件切换前登录状态判断

``` 
// ComposeComponent.jsx文件
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addFlashMessage } from '../../store/actions/flashMessage'

const ComposeComponent = (Component) => {
    class InnerComponent extends React.Component {
        state = {

        }

        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: 'danger',
                    text: '请先登录'
                })
                this.props.history.push('/signup')
                return false
            }
            return true
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.props.history.push('/signup')
            }
        }

        render() {
            return <Component {...this.state}></Component>
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return withRouter(connect(mapStateToProps, { addFlashMessage })(InnerComponent))
}

export default ComposeComponent


// routes.js文件
import React from 'react'
import { Route } from 'react-router-dom'
import SignIn from '../pages/login/SignIn'
import SignUp from '../pages/login/SignUp'
import Home from '../components/Home'
import Shop from '../components/shop/ShopPage'
import ComposeComponent from '../components/baseComponent/ComposeComponent'

export default (
    <div>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/shop" component={ComposeComponent(Shop)}></Route>
    </div>
)
```

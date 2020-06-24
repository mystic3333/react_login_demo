import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as userActions from '../../store/actions/userRegistry'
import * as flashMessageActions from '../../store/actions/flashMessage'

class SignIn extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            repassword: '',
            errors: {},
            isLoading: false,
            usernameExist: false
        }
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    formSubmit = (e) => {
        e.preventDefault()
        this.isLoading = true
        this.props.user.userRegistry(this.state)
        .then(
            res => {
                this.props.flashMessageActions.addFlashMessage({
                    type: 'success',
                    text: '注册成功'
                })
                this.props.history.push('/')
            },
            ({response}) => { this.setState({errors: response.data, isLoading: false}) } 
        )
    }

    usernameBlur = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        const username = this.state.username
        console.log(this.props.user.checkUserExist)
        this.props.user.checkUserExist(username)
        .then(res => {
            const {msg} = res.data
            if(msg == 'success') {
                console.log('suc')
                this.setState({
                    usernameExist: true
                })
            }
        })
    }

    render() {
        const {username, password, repassword, comfirmPassword, isLoading} = this.state.errors

        return (
            <div>
                <h1>JOIN US</h1>
               <form onSubmit={this.formSubmit}>
                   <div className="form-group" >
                        <label className="form-label" ></label>
                        username: <input className="form-control" type="text" name="username" value={this.state.username} onChange={this.inputChange} onBlur={this.usernameBlur}/>
                        { (this.state.usernameExist && '用户名已存在') || (username && '用户名不能为空') }
                   </div>   
                   <div className="form-group">
                        <label className="form-label"></label>
                        password: <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.inputChange}/>
                        { password && '密码不能为空' }
                   </div>   
                   <div className="form-group">
                        <label className="form-label"></label>
                        repassword: <input className="form-control" type="password" name="repassword" value={this.state.repassword} onChange={this.inputChange}/>
                        { repassword && '密码不能为空' || comfirmPassword && '两次密码不一致' }
                   </div>   
                   <input type="submit" value="submit" disable={ isLoading }/>
               </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        user: bindActionCreators(userActions, dispatch),
        flashMessageActions: bindActionCreators(flashMessageActions, dispatch)
    }
}


export default connect(null, mapDispatchToProps)(SignIn)
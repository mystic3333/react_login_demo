import React from 'react'
import { login, set_user } from '../../store/actions/userRegistry'
import { addFlashMessage } from '../../store/actions/flashMessage'
import {connect} from 'react-redux'
import { validatorInput }  from '../../utils'
import setAuthorization from '../../utils/setAuthorization'
import jwtDecode from 'jwt-decode'

class SignUp extends React.Component {
    state = {
        username: '',
        password: '',
        errors: {}
    }


    formSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state

        const {isValid, errors} = validatorInput(this.state)
        if (isValid) {
            this.props.login({username, password})
            .then(res => {
                console.log(res)
                const {code, token} = res.data
                if (res && code === 0) {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: '登录成功'
                    })

                    localStorage.setItem('token', token)
                    setAuthorization(token)
                    this.props.set_user(jwtDecode(token))
                    this.props.history.push('/')
                } else {
                    this.props.addFlashMessage({
                        type: 'danger',
                        text: '用户名或者密码错误'
                    })
                }
            })
        } else {
            this.setState({
                errors: errors
            })
        }

        
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render () {

        return(
            <div>
                <form onSubmit={this.formSubmit}>
                       <div className="form-group" >
                            <label className="form-label" ></label>
                            username: <input className="form-control" type="text" name="username" onChange={this.onChange}/>
                            { this.state.errors && this.state.errors.username }
                            
                       </div>   
                       <div className="form-group">
                            <label className="form-label"></label>
                            password: <input className="form-control" type="password" name="password" onChange={this.onChange}/>
                            { this.state.errors && this.state.errors.password }
                       </div>   
                       <input type="submit" value="submit" />
                   </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return  {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { login, addFlashMessage, set_user })(SignUp)
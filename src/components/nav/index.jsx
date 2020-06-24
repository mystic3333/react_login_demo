import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {set_user} from '../../store/actions/userRegistry'
import { addFlashMessage } from '../../store/actions/flashMessage'
import './index.css'


class Nav extends React.Component {

    logout = () => {
        this.props.addFlashMessage({
            type: 'success',
            text: '退出成功'
        })
        localStorage.removeItem('token')
        this.props.set_user({})
        this.props.history.push('/signup')
        
    }

    render() {
        const isAuthenticated =  (
            <div className="logout">
                <Link onClick={ this.logout }>logout</Link>
            </div>
        )
    
        const notAuthenticated =  (
            <Fragment>
                <div className="login">
                    <Link to="/signin">registry</Link>
                </div>
                <div className="registry">
                    <Link to="/signup">login</Link>
                </div>
            </Fragment>
        )

        return (
            <div className="nav_container">
                { this.props.auth.isAuthenticated ? isAuthenticated : notAuthenticated }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps, {set_user, addFlashMessage})(Nav))
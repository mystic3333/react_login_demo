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
            return <Component {...this.state} componentName="shop component"></Component>
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
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

class Flash extends React.Component {

    onClick = () => {
        this.props.removeFlashMessage()
    }

    render() {
        const { type, text } = this.props.message

        return (
            <div className={ classNames('alert', {
                'alert-success': type === 'success',
                'alert-danger': type === 'danger'
            }) }>
                <button className="close" onClick={this.onClick}>&times;</button>
                { text }
            </div>
        )
    }
}

export default connect()(Flash)
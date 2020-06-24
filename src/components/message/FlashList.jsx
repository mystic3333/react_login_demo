import React from 'react'
import Flash from './Flash'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as flashMessageActions from '../../store/actions/flashMessage'

class FlashList extends React.Component {
    componentDidMount() {
        console.log(this.props.flashMessageActions)
    }

    render() {
        const {type, text} = this.props.flashMessage

        const message = this.props.flashMessage.map(message => 
            <Flash key={ message.id } message={ message } removeFlashMessage={() => this.props.flashMessageActions.removeFlashMessage(message.id)}/>
        )

        return (
            <div>
                { message }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        flashMessage: state.flashMessage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        flashMessageActions: bindActionCreators(flashMessageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashList)
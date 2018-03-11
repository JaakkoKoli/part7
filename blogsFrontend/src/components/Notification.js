import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    if (props.message === '') {
        return null
    }

    return (
        <div className={props.type}>
            {props.message}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        message: state.notification.message,
        type: state.notification.type
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
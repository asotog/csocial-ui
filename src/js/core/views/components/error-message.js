import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Displays errors based on communication with server basically, 
 * generic error or authentication error for example
 */
class ErrorMessage extends Component {

    render() {
        const {errorProvider, message} = this.props;
        const currentMessage = !errorProvider ? message : this.retrieveErrorMessage(errorProvider);
        
        return (
            <div className="csui-message-container csui-clearfix">
                {this.renderMessage(currentMessage)}
            </div>
        );
    }

    renderMessage(message) {
        const {show} = this.props;
        if (show) {
            return (<div className="csui-message csui-message-error" role="alert">{message}</div>)
        }
        return null;
    }
    
    /**
     * Retrieve a message based on http error code
     * @param {Error} errorProvider 
     */
    retrieveErrorMessage(errorProvider) {
        const {message, authenticationFailedMessage} = this.props;
        const errorNumber = parseInt(errorProvider.message);
        switch(errorNumber) {
            case 401:
                return authenticationFailedMessage;
            case 403:
                return authenticationFailedMessage;
        }
        return message;
    }
}

ErrorMessage.defaultProps = {
    errorProvider: null, // Error object
    authenticationFailedMessage: 'There was a problem, authentication failed or expired'
};

ErrorMessage.propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string
};

export default ErrorMessage;
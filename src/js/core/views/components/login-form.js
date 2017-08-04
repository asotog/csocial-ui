import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import * as Constants from '../../../utils/constants';
import Services from '../../../utils/services';
import Tools from '../../../utils/tools';
import {Logger} from '../../../utils/logger';
import ErrorMessage from './error-message';
import {ProgressButton} from './progress';

/**
 * Displays form, so user can log in manually by entering user/password
 * this is usually required for testing envs
 */
class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            submitting: false,
            error: null // Error Object: login error 
        }
    }

    componentDidMount() {
        document.addEventListener(Constants.EVENT_CRAFTER_SOCIAL_SHOW_LOGIN, _ => { 
            this.setState({...this.state, show: true});
        });
    }

    /**
     * On login form submit event
     * @param {Event} submit event 
     */
    onSubmit(event) {
        event.preventDefault();
        this.setState({...this.state, submitting: true, error: null});
        Services.authenticate(this.refs.usernameInput.value, this.refs.passwordInput.value)
            .then(this.onAuthenticationSuccess.bind(this))
            .catch(this.onAuthenticationFail.bind(this))
    }

    /**
     * 
     * @param {Object} profile data from logged user 
     */
    onAuthenticationSuccess(profile) {
        Tools.triggerEvent(document, Constants.EVENT_CRAFTER_SOCIAL_AUTHENTICATION_SUCCESS, profile);
        this.close();
    }

    /**
     * 
     * @param {Error} error 
     */
    onAuthenticationFail(error) {
        Logger.error('User authentication failed.');
        this.setState({...this.state, submitting: false, error});
    }

    close() {
        this.setState({...this.state, submitting: false, show: false, error: null});
    }

    render() {
        const {show, error, submitting} = this.state;
        return (
            <div className="csui-login-form">
                <Modal overlayClassName="csui csui-modal" 
                    className="csui-modal-login"
                    bodyOpenClassName="csui-modal-open"
                    portalClassName="csui-modal-portal"
                    contentLabel="Login Form Modal"
                    isOpen={show}
                    onRequestClose={this.close.bind(this)}
                    shouldCloseOnOverlayClick={true}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="csui-form-group">
                            <input ref="usernameInput" className="csui-form-control" type="text" placeholder="Username"/>
                        </div>
                        <div className="csui-form-group">
                            <input ref="passwordInput" className="csui-form-control" type="password" placeholder="Password"/>
                        </div>
                        <ErrorMessage show={!!error} errorProvider={error} message="There was a problem please try again or reload page"/>
                        <ProgressButton buttonText="Login" loading={submitting}/>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default LoginForm;
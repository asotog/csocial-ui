import React from 'react';
import {render} from 'react-dom';

import * as Constants from '../../utils/constants';
import Tools from '../../utils/tools';
import LoginForm from './components/login-form';

const init = function() {
    let loginEl = document.querySelector('.csui-login');
    if (loginEl) { // check first if login was shown previously, so just trigger event to show modal
        Tools.triggerEvent(document, Constants.EVENT_CRAFTER_SOCIAL_SHOW_LOGIN);
        return;
    }

    // if was not shown, initialize it and show it
    loginEl = document.createElement('div');
    loginEl.classList.add('csui-login');
    document.querySelector('body').appendChild(loginEl);
    render((
        <LoginForm/>
    ), loginEl);
    
    Tools.triggerEvent(document, Constants.EVENT_CRAFTER_SOCIAL_SHOW_LOGIN);
};

export const Login = {
    init
};
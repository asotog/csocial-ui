import maincss from '../css/main.scss';

import Tools from './utils/tools';
import * as Constants from './utils/constants';
import Director from './core/director';

window.crafter = window.crafter || {};
window.crafter.social = {...Director}; // expose to global scope

Director.checkAuthentication(); // verifies if user is already logged

document.addEventListener(Constants.EVENT_CRAFTER_SOCIAL_AUTHENTICATION_SUCCESS, function(event) { // if user is authenticated, social ui is ready to be used
    Director.setProfile(event.detail.profile);
    Tools.triggerEvent(document, Constants.EVENT_CRAFTER_SOCIAL_READY, {});
});


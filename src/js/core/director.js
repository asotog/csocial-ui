import Tools from '../utils/tools';
import * as Constants from '../utils/constants';
import Configuration from '../utils/configuration';
import {Logger} from '../utils/logger';
import Services from '../utils/services';
import {CommentsWidget} from './views/comments-widget';
import {Login} from './views/login';

let _profile = null; // contains session user information

/**
 * Responsible of initializing the widgets, this component is the bootstrapper
 * this is exposed via crafter.social to global scope
 * so window.crafter.social and Director are the same
 */

const Director = {
    /**
     * Sets the current logged user 
     */
    setProfile(profile) {
        _profile = profile;
    },

    /**
     * Returns the current logged user stored
     * @return {null|Object} returns null if user not logged yet, otherwise user object
     */
    getProfile() {
        if (!_profile) {
            Logger.error('There is no profile information, please try reloading page or login')
            return null;
        }
        return _profile;
    },

    /**
     * Shows login modal
     * Login modal is useful while development when multiple users needs to be tested, 
     * modal form contains user/password fields
     * 
     */
    login() {
        Login.init();
    },

    /**
     * Verifies if user session is valid agains the API and 
     * fills the profile object with the retrieved information
     * 
     */
    checkAuthentication() {
        Services.checkAuthentication()
            .then(profile => Tools.triggerEvent(document, Constants.EVENT_CRAFTER_SOCIAL_AUTHENTICATION_SUCCESS, profile))
            .catch(error => Logger.error('User authentication failed.'))
    },

    /**
     * Comments widget director
     * 
     */
    comments: {
        init: function(cfg = {}) {
            Tools.querySelector(cfg.target).then(element => {
                Logger.info(`loading comments for target ${cfg.target}`);
                const rootElement = Tools.createCommentsWidgetWrapper(element).querySelector('.csui-comments-widget-root');
                CommentsWidget.init(rootElement, cfg);
            }).catch(error => {
                Logger.error(`Comments initializing failed on target ${cfg.target}.`, error);
            });
        }
    },

    getServices() {
        return Services;
    }
};

export default Director;
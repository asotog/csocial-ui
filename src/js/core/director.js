import Tools from '../utils/tools';
import * as Constants from '../utils/constants';
import Configuration from '../utils/configuration';
import {Logger} from '../utils/logger';
import Services from '../utils/services';
import {CommentsWidget} from './views/comments-widget';

/**
 * Responsible of initializing the widgets, this component is the bootstrapper
 * this is exposed via crafter.social to global scope
 * so window.crafter.social and Director are the same
 */
const Director = {

    /**
     * Returns the current logged user stored
     * @return {null|Object} returns null if user not logged yet, otherwise user object
     */
    getProfile() {
        return null;
    },

    /**
     * Autheticates/logins agains the API with given username/password
     * @param {*} username 
     * @param {*} password 
     */
    authenticate(username, password) {
        Services.authenticate(username, password)
            .then(_ => Tools.triggerEvent(document, Constants.EVENT_CRAFTER_SOCIAL_AUTHENTICATION_SUCCESS, {}))
            .catch(error => Logger.error('User authentication failed.'))
    },

    /**
     * Verifies if user session is valid agains the API and 
     * fills the profile object with the retrieved information
     * 
     */
    checkAuthentication() {
        Services.checkAuthentication()
            .then(_ => Tools.triggerEvent(document, Constants.EVENT_CRAFTER_SOCIAL_AUTHENTICATION_SUCCESS, {}))
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
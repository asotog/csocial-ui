import queryString from 'query-string';

import Tools from './tools';
import * as Constants from './constants';
import {default as Cfg}from './configuration';


/**
 * Encapsulates JSON HTTP requests
 */
const Services = {

    /**
     * 
     * Checks if user session is active
     * 
     */
    checkAuthentication() {
        return fetch(Cfg.get('url.security.active'), Constants.HTTP_GET_OPTIONS)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    },

    /**
     * Authenticates user based on username/password
     * 
     * @param {*} username 
     * @param {*} password
     */
    authenticate(username, password) {
        return fetch(Cfg.get('url.security.login'), {
            ...Constants.HTTP_POST_OPTIONS,
            body: queryString.stringify({username, password})
        })
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    },

    /**
     * Load all the target comments
     * @param {String} target 
     * @param {String} context 
     */
    loadComments(target, context) {
        const url = Cfg.getAPIUrl(Constants.API.getComments, {
            target, context, 
            sortBy: 'createdDate', sortOrder: 'DESC'});
        return fetch(url, Constants.HTTP_GET_OPTIONS)
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    },

    /**
     * Delete a comment
     * @param {string} Comment id 
     * @param {string} context 
     */
    deleteComment(_id, context) {
        const url = Cfg.getAPIUrl(Constants.API.deleteComment, {
            context, _id});
        return fetch(url, {
            ...Constants.HTTP_POST_OPTIONS,
            body: queryString.stringify({context, status: 'TRASH'})
        })
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    },

    /**
     * Post a comment in given thread/target
     * 
     * @param {string} body Comment text
     * @param {string} thread Target id
     * @param {string} context 
     * @param {string} commentUrl Will be used to build object like like: {"commentUrl":"/hello","commentThreadName":"READABLENAME"}
     * @param {number} dateAdded Unix timestamp
     */
    postComment(body, thread, context, commentUrl, dateAdded = new Date()) {
        //multipart/form-data
        var formData  = new FormData();
        formData.append('body', body);
        formData.append('thread', thread);
        formData.append('context', context);
        formData.append('dateAdded', dateAdded);
        formData.append('attributes', `{"commentUrl":"${commentUrl}","commentThreadName":"READABLENAME"}`);
        
        const url = Cfg.getAPIUrl(Constants.API.postComment, {
            context});
        return fetch(url, {
            ...Constants.HTTP_POST_OPTIONS,
            headers: {},
            body: formData // multipart data
        })
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    },
    
    /**
     * Vote a comment down or up
     * 
     * @param {string} _id 
     * @param {string} context 
     * @param {integer} direction Means -1 votes down, 0 votes neutral (removes vote), 1 vote up
     */
    voteComment(_id, context, direction = 0) {
        var formData  = new FormData();
        formData.append('context', context);
        let voteURL = '';
        switch(direction) {
            case Constants.VOTE_UP: voteURL = Constants.API.voteUpComment; break;
            case Constants.VOTE_DOWN: voteURL = Constants.API.voteDownComment; break;
            default: voteURL = Constants.API.voteNeutralComment;
        }
        const url = Cfg.getAPIUrl(voteURL, {
            _id,
            context});
        return fetch(url, {
            ...Constants.HTTP_POST_OPTIONS,
            headers: {},
            body: formData // multipart data
        })
            .then(handleResponse)
            .catch(error => Promise.reject(error));
    }
}

/**
 * Verifies if response is valid
 * @param {Fetch API Response object} response 
 */
function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.status);
}

export default Services;
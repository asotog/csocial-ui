import 'whatwg-fetch';
import Promise from 'promise-polyfill';

if (!window.Promise) {
    window.Promise = Promise;
}

/**
 * 
 * General internal tools/utilities methods
 * 
 */
const Tools = {

    isEmptyString(string) {
        return string.trim() === '';
    },
    
    /**
     * Dispatches custom event on DOMElement
     * 
     * @param {DOMElement} element 
     * @param {String} eventName 
     * @param {Object} data 
     */
    triggerEvent(element, eventName, data) {
        var event = null;
        try {
            event = new CustomEvent(eventName, {
                detail: data
            });
        } catch (ex) {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, data);
        };
        element.dispatchEvent(event);
    },

    /**
     * Query DOM element based on native document.querySelector but uses a Promise based approach
     * so it rejects if element does not exist or invalid selector
     * @param {*} selector 
     * @return {Promise}
     */
    querySelector(selector) {
        let element = null;
        try {
            element = document.querySelector(selector);
        } catch (e) {};
        if (element) {
            return Promise.resolve(element);
        }
        return Promise.reject(new Error('DOM element is not defined'));
    },

    /**
     * Formats string based on keys, 
     * e.g: string like 'Hello {name}' can formattted with object {name: 'John Doe'}
     * and result will be 'Hello John Doe'
     * 
     * @param {String} str 
     * @param {Object} values
     * @return {String} formatted string
     */
    format(str, values = {}, encodeForUrl = false) {
        return str.replace(/\{.*?\}/g, function (match) {
            const value = values[match.substr(1, match.length - 2)];
            return (encodeForUrl) ? encodeURIComponent(value) : value;
        });
    },

    /**
     * Creates wrapper for the commentable area, so comments will be initialized there,
     * blog post, description, whatever element it is...
     * @param {DOM Object} element 
     * @return {DOM Object} new wrapper element
     */
    createCommentsWidgetWrapper(element) {
        const wrapperElement =  document.createElement('div');
        wrapperElement.className = 'csui-commentable';
        element.parentNode.insertBefore(wrapperElement, element);
        wrapperElement.appendChild(element);

        const commentsWidgetRootElement =  document.createElement('div');
        commentsWidgetRootElement.className = 'csui csui-comments-widget-root';
        wrapperElement.appendChild(commentsWidgetRootElement);

        return wrapperElement;
    }
}

export default Tools;
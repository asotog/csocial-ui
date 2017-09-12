import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import * as Constants from '../../utils/constants';
import * as CommentsActions from './actions/comments-actions';
import CommentsWidgetContainer from './containers/comments-widget-container';
import {CommentsStore} from './stores/comments-store';

const init = function(rootElement, cfg) {
    const store = CommentsStore.get(cfg.target);
    store.dispatch(CommentsActions.loadComments(cfg.target, cfg.context));
    render((
        <Provider store={store}>
            <CommentsWidgetContainer configuration={cfg}/>
        </Provider>
    ), rootElement);
    // this event is triggered if the comments init method is called but comments were initialized previously in 
    // the same element, so it just reloads
    document.querySelector(cfg.target).addEventListener(Constants.EVENT_CRAFTER_SOCIAL_RELOAD_WIDGET, _ => {
        store.dispatch(CommentsActions.loadComments(cfg.target, cfg.context));
    });
};

export const CommentsWidget = {
    init
};
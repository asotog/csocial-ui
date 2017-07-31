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
};

export const CommentsWidget = {
    init
};
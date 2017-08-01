import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import commentsReducer from '../reducers/comments-reducer';

// create an object with the default data
export const defaultState = {
    comments: {
        total: 0,
        pageSize: 0,
        pageNumber: 0,
        comments: [],
        isRequesting: false, // comments are being retrieved
        isPosting: false // comment is being posted
    }
};

export const CommentsStore = {

    /**
     * Creates and returns store based on id
     * @param {*} id Used primarly to indentify the store, useful when having multiple stores in the same page, so can be identified easily from redux devtools
     */
    get(id) {
        const rootReducer = combineReducers({
            comments: commentsReducer
        });

        // enhancers config
        const devToolsEnhancer = window.devToolsExtension ? window.devToolsExtension({name: id, instanceId: id}) : (f) => f;
        const middlewareEnhancer = applyMiddleware(
            thunkMiddleware // lets us dispatch() functions
        );

        let enhancers = compose(middlewareEnhancer);
        if (process.env.NODE_ENV !== 'production') {
            enhancers = compose(middlewareEnhancer, devToolsEnhancer)
        }

        return createStore(rootReducer, defaultState, enhancers);
    }
}

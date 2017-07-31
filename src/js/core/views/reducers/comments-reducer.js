import * as Constants from '../../../utils/constants';

/**
 * 
 * Comments REDUX reducer
 * 
 * @param {*} state 
 * @param {*} action 
 */
function comments(state = {}, action) {
    switch (action.type) {
        case Constants.Actions.REQUEST_LOAD_COMMENTS:
            return { 
                ...state,
                isRequesting: true,
                dataError: null
            };
        case Constants.Actions.RECEIVE_COMMENTS:
            return { 
                ...state,
                isRequesting: false,
                comments: action.data.comments
            };
    }
    return state;
}

export default comments;
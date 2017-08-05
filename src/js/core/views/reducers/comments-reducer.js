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
                ...action.data
            };
        case Constants.Actions.REQUEST_POST_COMMENT:
            return {
                ...state,
                isPosting: true
            }
        case Constants.Actions.RECEIVE_POST_COMMENT:
            return {
                ...state,
                isPosting: false,
                comments: [action.data, ...state.comments]
            }
        case Constants.Actions.POST_COMMENT_DATA_ERROR:
            return {
                 ...state,
                isPosting: false,
                postCommentError: action.error
            }
        case Constants.Actions.REQUEST_DELETE_COMMENT:
            const deletingItemIndex = state.comments.map(c => c._id).indexOf(action._id);
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, deletingItemIndex), 
                    {...state.comments[deletingItemIndex], isDeleting: true},
                    ...state.comments.slice(deletingItemIndex + 1)
                ]
            };
        case Constants.Actions.RECEIVE_DELETED_COMMENT:
            const deletedItemIndex = state.comments.map(c => c._id).indexOf(action.data._id);
            return {
                ...state,
                isDeleting: false,
                comments: [
                    ...state.comments.slice(0, deletedItemIndex), 
                    ...state.comments.slice(deletedItemIndex + 1)
                ]
            }
    }
    return state;
}

export default comments;
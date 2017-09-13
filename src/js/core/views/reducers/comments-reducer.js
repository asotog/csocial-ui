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
                isPosting: true,
                postCommentError: null
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
                    {...state.comments[deletingItemIndex], isDeleting: true, error: null},
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
        case Constants.Actions.DELETE_COMMENT_DATA_ERROR:
            const deletingItemErrorIndex = state.comments.map(c => c._id).indexOf(action.error.commentId);
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, deletingItemErrorIndex), 
                    {...state.comments[deletingItemErrorIndex], isDeleting: false, error: action.error},
                    ...state.comments.slice(deletingItemErrorIndex + 1)
                ]
            };
        case Constants.Actions.REQUEST_VOTE_COMMENT:
            const votingItemIndex = state.comments.map(c => c._id).indexOf(action._id);
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, votingItemIndex), 
                    {...state.comments[votingItemIndex], isVoting: true, error: null},
                    ...state.comments.slice(votingItemIndex + 1)
                ]
            };
        case Constants.Actions.RECEIVE_VOTED_COMMENT:
            const votedItemIndex = state.comments.map(c => c._id).indexOf(action.data._id);
            return {
                ...state,
                isVoting: false,
                comments: [
                    ...state.comments.slice(0, votedItemIndex),
                    action.data,
                    ...state.comments.slice(votedItemIndex + 1)
                ]
            }
        case Constants.Actions.VOTE_COMMENT_DATA_ERROR:
            const votingItemErrorIndex = state.comments.map(c => c._id).indexOf(action.error.commentId);
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, votingItemErrorIndex), 
                    {...state.comments[votingItemErrorIndex], isVoting: false, error: action.error},
                    ...state.comments.slice(votingItemErrorIndex + 1)
                ]
            };
    }
    return state;
}

export default comments;
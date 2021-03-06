import * as Constants from '../../../utils/constants';
import Services from '../../../utils/services';



/**
 * Load Comments Actions
 * 
 * @param {*} target 
 * @param {*} context 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
export function loadComments(target, context) {
    return function (dispatch) {
        dispatch(loadCommentsRequest());
        return Services.loadComments(target, context).then(data => {
            dispatch(receiveLoadCommentsResponse(data))
        }).catch(error => {
            dispatch(receiveError(Constants.Actions.RECEIVE_COMMENTS_DATA_ERROR, error));
        });
    }
}

export function loadCommentsRequest() {
    return {
        type: Constants.Actions.REQUEST_LOAD_COMMENTS
    }
}

export function receiveLoadCommentsResponse(data) {
    return {
        type: Constants.Actions.RECEIVE_COMMENTS,
        data
    }
}



/**
 * Post a comment
 * 
 * @param {string} body Comment body 
 * @param {string} thread Thread/Target id
 * @param {string} context 
 * @param {string} commentUrl 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
export function postComment(body, thread, context, commentUrl, scrollOnCommentPosted) {
    return function (dispatch) {
        dispatch(postRequest());
        return Services.postComment(body, thread, context, commentUrl).then(data => {
            dispatch(receivePostCommentResponse({...data, scrollOnCommentPosted: (scrollOnCommentPosted === true)}))
        }).catch(error => {
            dispatch(receiveError(Constants.Actions.POST_COMMENT_DATA_ERROR, error));
        });
    }
}

export function receivePostCommentResponse(data) {
    return {
        type: Constants.Actions.RECEIVE_POST_COMMENT,
        data
    }
}

export function postRequest() {
    return {
        type: Constants.Actions.REQUEST_POST_COMMENT
    }
}



/**
 * Delete Comment Action
 * 
 * @param {*} _id Comment id
 * @param {*} context Context 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
export function deleteComment(_id, context) {
    return function (dispatch) {
        dispatch(deleteCommentRequest(_id));
        return Services.deleteComment(_id, context).then(data => {
            dispatch(receiveDeletedCommentResponse(data))
        }).catch(error => {
            error.commentId = _id;
            dispatch(receiveError(Constants.Actions.DELETE_COMMENT_DATA_ERROR, error));
        });
    }
}

export function receiveDeletedCommentResponse(data) {
    return {
        type: Constants.Actions.RECEIVE_DELETED_COMMENT,
        data
    }
}

export function deleteCommentRequest(_id) {
    return {
        type: Constants.Actions.REQUEST_DELETE_COMMENT,
        _id
    }
}

/**
 * Vote Comment Action
 * 
 * @param {*} _id Comment id
 * @param {*} context Context 
 * @param {integer} direction Means -1 votes down, 0 votes neutral (removes vote), 1 vote up
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
export function voteComment(_id, context, direction = 0) {
    return function (dispatch) {
        dispatch(voteCommentRequest(_id));
        return Services.voteComment(_id, context, direction).then(data => {
            dispatch(receiveVotedCommentResponse(data))
        }).catch(error => {
            error.commentId = _id;
            dispatch(receiveError(Constants.Actions.VOTE_COMMENT_DATA_ERROR, error));
        });
    }
}

export function voteCommentRequest(_id) {
    return {
        type: Constants.Actions.REQUEST_VOTE_COMMENT,
        _id
    }
}

export function receiveVotedCommentResponse(data) {
    return {
        type: Constants.Actions.RECEIVE_VOTED_COMMENT,
        data
    }
}

/**
 * Generic error handling action
 * 
 * @param {string} type Redux action name
 * @param {Error} error 
 * 
 * 
 * 
 * 
 * 
 */
export function receiveError(type, error) {
    return {
        type,
        error
    }
}
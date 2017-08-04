export const EVENT_CRAFTER_SOCIAL_READY = 'crafter.social.ready';
export const EVENT_CRAFTER_SOCIAL_AUTHENTICATION_SUCCESS = 'crafter.social.authentication.success';
export const EVENT_CRAFTER_SOCIAL_SHOW_LOGIN = 'crafter.social.authentication.show.login';

/**
 * Fetch API GET defaults options
 */
export const HTTP_GET_OPTIONS = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    },
    credentials: 'include'
};

/**
 * Fetch API POST defaults options
 */
export const HTTP_POST_OPTIONS = {
    credentials: 'include',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

/**
 * API endpoints
 */
export const API = {
    avatar: 'profile/avatar/{id}?context={context}&ts{ts}',
    getComments: 'threads/{target}/comments?context={context}&sortBy={sortBy}&sortOrder={sortOrder}',
    postComment: 'comments/?context={context}',
    deleteComment: 'comments/{_id}/moderate/?context={context}'
};

/**
 * Redux Actions Names
 */
export const Actions = {
    REQUEST_LOAD_COMMENTS: 'REQUEST_LOAD_COMMENTS',
    RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
    RECEIVE_COMMENTS_DATA_ERROR: 'RECEIVE_COMMENTS_DATA_ERROR',

    REQUEST_DELETE_COMMENT: 'REQUEST_DELETE_COMMENT',
    RECEIVE_DELETED_COMMENT: 'RECEIVE_DELETED_COMMENT',
    DELETE_COMMENT_DATA_ERROR: 'DELETE_COMMENT_DATA_ERROR',

    REQUEST_POST_COMMENT: 'REQUEST_POST_COMMENT',
    RECEIVE_POST_COMMENT: 'RECEIVE_POST_COMMENT',
    POST_COMMENT_DATA_ERROR: 'POST_COMMENT_DATA_ERROR'
}
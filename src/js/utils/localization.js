import LocalizedStrings from 'react-localization';
import merge from 'deepmerge';
import moment from 'moment';

import Cfg from './configuration';

/**
 * Strings localization
 */
const defaultStrings = {
    en: {
        noCommentsMessage: 'Be the first commenting here...',
        commentsMessage: 'Comments ({0})',
        textareaPostCommentPlaceholder: 'Add your comment here...',
        buttonPostComment: 'Submit',
        buttonUploadPhoto: 'Upload a Photo',
        errorAuthenticationFailed: 'There was a problem, authentication failed or expired',
        errorDefault: 'There was a problem please try again or reload page',
        loginUsernameFieldPlaceholder: 'Username',
        loginPasswordFieldPlaceholder: 'Password',
        loginButton: 'Login'
    }
};

export const strings = new LocalizedStrings(merge(defaultStrings, Cfg.get('localization.strings')));

export const formatDate = function(date) {
    const tz = new Date(date).getTimezoneOffset() / 60;
    if (Cfg.get('dateFormat') === 'relative') {
        return moment(date).add(tz, 'hours').fromNow();
    }
    return moment(date).add(tz, 'hours').format(Cfg.get('dateFormat'));
};

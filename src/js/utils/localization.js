import LocalizedStrings from 'react-localization';
import merge from 'deepmerge';
import { format, distanceInWordsToNow, addHours} from 'date-fns';

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
    const currentTimezoneDate = addHours(new Date(date), tz);
    if (Cfg.get('dateFormat') === 'relative') {
       return distanceInWordsToNow(currentTimezoneDate, {addSuffix: true});
    }
    return format(currentTimezoneDate, Cfg.get('dateFormat')); 
};

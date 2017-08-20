import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ProgressCircular} from './progress';
import ErrorMessage from './error-message';
import {default as Cfg} from '../../../utils/configuration';
import * as Constants from '../../../utils/constants';
import {strings} from '../../../utils/localization';

/**
 * Comment
 * Displays the comment, creation datetime, user, etc...
 * 
 */
class Comment extends Component {

    onDeleteClick(event) {
        const {comment} = this.props;
        event.preventDefault();
        this.props.onDeleteHandler(comment._id);
    }

    shouldShowProgress() {
        const {comment} = this.props;
        return comment.isDeleting === true;
    }

    render() {
        const {comment, onDeleteHandler, showProgressIndicator, context} = this.props;
        let cssClasses = 'csui-comment';
        cssClasses += this.shouldShowProgress() ? ' csui-loading': '';
        return (
            <div className={cssClasses}>
                <div className="csui-comment-inner">
                    <div className="csui-comment-head">
                        <span className="csui-comment-head-portrait">
                            <img src={Cfg.getAPIUrl(Constants.API.avatar, {id: comment.user.id, context, ts: new Date().getTime()})} alt="Avatar"/>
                        </span>
                        <span className="csui-comment-author">{comment.user.attributes.displayName ? comment.user.attributes.displayName : 'Anonymous'}</span>
                        <span className="csui-comment-datetime">{comment.createdDate}</span>
                    </div>
                    <div className="csui-comment-body" dangerouslySetInnerHTML={{__html: comment.body}}></div>
                    
                    <ul className="csui-comment-actions csui-left">
                        <li><a href="#">{strings.buttonUploadPhoto}</a></li>
                    </ul>
                    <ul className="csui-comment-actions csui-right">
                        <li><a href="#">Like</a></li>
                        <li><a href="#">Reply</a></li>
                        <li><a href="#" onClick={this.onDeleteClick.bind(this)}>Delete</a></li>
                    </ul>
                </div>
                <div className="csui-comment-children"></div>
                <div className="csui-comment-progress">
                    <ProgressCircular/>
                </div>
                <ErrorMessage show={!!comment.error}
                    errorProvider={comment.error}
                    authenticationFailedMessage={strings.errorAuthenticationFailed}
                    message={strings.errorDefault}/>
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    context: PropTypes.string.isRequired,
    onDeleteHandler: PropTypes.func.isRequired,
};

export default Comment;
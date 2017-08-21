import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ProgressCircular} from './progress';
import ErrorMessage from './error-message';
import DateTimeDisplay from './datetime-display';
import Avatar from './avatar';
import {default as Cfg} from '../../../utils/configuration';
import * as Constants from '../../../utils/constants';
import {strings} from '../../../utils/localization';
import Director from '../../director';
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

    /**
     * Checks if logged user is the same comment creator user
     * useful so delete button can be displayed or not
     */
    isCurrentUserOwner() {
        const {comment} = this.props;
        return Director.getProfile().id === comment.createdBy;
    }

    render() {
        const {comment, onDeleteHandler, showProgressIndicator, context} = this.props;
        let cssClasses = 'csui-comment';
        cssClasses += this.shouldShowProgress() ? ' csui-loading': '';
        const {user} = comment;
        const profileImageParams = {
            id: user.id,
            context, 
            ts: new Date().getTime()
        };
        const authorName = user.attributes.displayName ?user.attributes.displayName : 'Anonymous';
        return (
            <div className={cssClasses}>
                <div className="csui-comment-inner">
                    <div className="csui-comment-head">
                        <span className="csui-comment-head-portrait">
                            <Avatar imageUrl={Cfg.getAPIUrl(Constants.API.avatar, profileImageParams)}
                                id={user.id}
                                unknownImageText={authorName}/>
                        </span>
                        <span className="csui-comment-author">{authorName}</span>
                        <span className="csui-comment-datetime"><DateTimeDisplay datetime={comment.createdDate}/></span>
                    </div>
                    <div className="csui-comment-body" dangerouslySetInnerHTML={{__html: comment.body}}></div>
                    
                    <ul className="csui-comment-actions csui-left">
                        <li><a href="#">{strings.buttonUploadPhoto}</a></li>
                    </ul>
                    <ul className="csui-comment-actions csui-right">
                        <li><a href="#">Like</a></li>
                        <li><a href="#">Reply</a></li>
                        {this.isCurrentUserOwner() ? 
                            <li><a href="#" onClick={this.onDeleteClick.bind(this)}>Delete</a></li> : null}
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ProgressCircular} from './progress';
import ErrorMessage from './error-message';
import DateTimeDisplay from './datetime-display';
import Avatar from './avatar';
import {default as Cfg} from '../../../utils/configuration';
import * as Constants from '../../../utils/constants';
import Tools from '../../../utils/tools';
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

    onVoteUp(e) {
        e.preventDefault();
        const {votesUp} = this.props.comment;
        // check first if current user already voted, so neutral vote triggered instead, neutral vote removes/deselect
        const direction = votesUp.includes(Director.getProfile().id) ? Constants.VOTE_NEUTRAL : Constants.VOTE_UP;
        this.vote(direction);
    }

    onVoteDown(e) {
        e.preventDefault();
        const {votesDown} = this.props.comment;
        // check first if current user already voted, so neutral vote triggered instead, neutral vote removes/deselect
        const direction = votesDown.includes(Director.getProfile().id) ? Constants.VOTE_NEUTRAL : Constants.VOTE_DOWN;
        this.vote(direction);
    }

    vote(direction = 0) {
        const {comment, context} = this.props;
        const userId = Director.getProfile().id;
        this.props.onVoteHandler(comment._id, context, direction);
    }

    shouldShowProgress() {
        const {comment} = this.props;
        return comment.isDeleting === true || comment.isVoting;
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
            ts: Tools.getPageTimestamp()
        };
        const authorName = user.attributes.displayName ?user.attributes.displayName : 'Anonymous';
        const voteUpCSS = comment.votesUp.includes(Director.getProfile().id) ? 'csui-vote-up csui-voted csui-icon-up-open' : 'csui-vote-up csui-icon-up-open';
        const voteDownCSS = comment.votesDown.includes(Director.getProfile().id) ? 'csui-vote-down csui-voted csui-icon-down-open' : 'csui-vote-down csui-icon-down-open';
        const voteUpDisplay = comment.votesUp.length ? comment.votesUp.length : '';
        const voteDownDisplay = comment.votesDown.length ? comment.votesDown.length : '';
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
                    {/* TODO upload pictures/files to comments
                    <ul className="csui-comment-actions csui-left">
                        <li><a href="#">{strings.buttonUploadPhoto}</a></li>
                    </ul>
                    */}
                    <ul className="csui-comment-actions csui-right">
                        <li><a href="#" className={voteUpCSS} onClick={this.onVoteUp.bind(this)}>{voteUpDisplay}</a></li>
                        <li><a href="#" className={voteDownCSS} onClick={this.onVoteDown.bind(this)}>{voteDownDisplay}</a></li>
                        {/*<li><a className="csui-icon-reply" href="#"></a></li> */}
                        {this.isCurrentUserOwner() ? 
                            <li><a className="csui-icon-trash-empty" href="#" onClick={this.onDeleteClick.bind(this)}></a></li> : null}
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
    onVoteHandler: PropTypes.func.isRequired
};

export default Comment;
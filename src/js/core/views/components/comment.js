import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {ProgressCircular} from './progress';

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
        const {comment, onDeleteHandler, showProgressIndicator} = this.props;
        let cssClasses = 'csui-comment';
        cssClasses += this.shouldShowProgress() ? ' csui-loading': '';
        return (
            <div className={cssClasses}>
                <div className="csui-comment-inner">
                    <div className="csui-comment-head">
                        <span className="csui-comment-head-portrait">
                            <img src="https://dummyimage.com/200x200/c7c7c7/000000" alt="Nelson Gregory"/>
                        </span>
                        <span className="csui-comment-author">{comment.user.attributes.displayName ? comment.user.attributes.displayName : 'Anonymous'}</span>
                        <span className="csui-comment-datetime">{comment.createdDate}</span>
                    </div>
                    <div className="csui-comment-body" dangerouslySetInnerHTML={{__html: comment.body}}></div>
                    
                    <ul className="csui-comment-actions csui-left">
                        <li><a href="#">Upload a Photo</a></li>
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
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteHandler: PropTypes.func.isRequired,
};

export default Comment;
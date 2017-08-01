import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as CommentsActions from '../actions/comments-actions';
import Comment from '../components/comment';
import PostCommentForm from '../components/post-comment-form';
import {MainProgress} from '../components/progress';

class CommentsWidgetContainer extends Component {

    onDeleteComment(_id) {
        this.props.deleteComment(_id, this.props.configuration.context);
    }

    onPostComment(body) {
        const {target, context, commentUrl} = this.props.configuration;
        this.props.postComment(body, target, context, commentUrl);
    }

    render() {
        const {comments} = this.props;
        return (
            <div className="csui-comments-widget">
                {this.renderCommentsTitle()}
                
                <div className="csui-comments-list">
                    {comments.comments.map(comment => 
                        <Comment key={comment._id} comment={comment} onDeleteHandler={_ => this.onDeleteComment(comment._id)}/>
                    )}
                </div>
                <MainProgress show={comments.isRequesting}/> 
                <PostCommentForm onSubmit={this.onPostComment.bind(this)} isSubmitting={comments.isPosting}/>
            </div>
        );
    }

    renderCommentsTitle() {
        const {comments} = this.props;
        if (comments.isRequesting) {
            return null;
        }

        let title = 'Be the first commenting here...';
        if (comments.comments.length > 0) {
            title = `Comments (${comments.comments.length})`;
        }
        return (
            <span className="csui-comments-title">{title}</span>
        );
    }
}

CommentsWidgetContainer.propTypes = {
    configuration: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        ...state
    }
}

function mapDispatchToProps(dispatch) {
     return bindActionCreators(CommentsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsWidgetContainer);

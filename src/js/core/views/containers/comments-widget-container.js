import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import * as CommentsActions from '../actions/comments-actions';
import Comment from '../components/comment';
import PostCommentForm from '../components/post-comment-form';
import {MainProgress} from '../components/progress';
import ErrorMessage from '../components/error-message';

class CommentsWidgetContainer extends Component {

    onDeleteComment(_id) {
        this.props.deleteComment(_id, this.props.configuration.context);
    }

    onPostComment(body) {
        const {target, context, commentUrl} = this.props.configuration;
        this.props.postComment(body, target, context, commentUrl);
    }

    render() {
        const {comments, configuration} = this.props;
        return (
            <div className="csui-comments-widget">
                {this.renderCommentsTitle()}
                
                <div className="csui-comments-list">
                    <TransitionGroup>
                    {comments.comments.map(comment => 
                        <CSSTransition key={comment._id} classNames="csui-comment-transition" timeout={600}>
                            <Comment comment={comment}
                                onDeleteHandler={_ => this.onDeleteComment(comment._id)}
                                context={configuration.context}/>
                        </CSSTransition>
                    )}
                    </TransitionGroup>
                </div>
                <MainProgress show={comments.isRequesting}/> 
                <div hidden={comments.isRequesting}>
                    <PostCommentForm onSubmit={this.onPostComment.bind(this)} isSubmitting={comments.isPosting}/>
                </div>
                <ErrorMessage show={!!comments.postCommentError} errorProvider={comments.postCommentError} message="There was a problem please try again or reload page"/>
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

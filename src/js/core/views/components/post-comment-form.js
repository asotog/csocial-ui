import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the post comment form, textarea/editor and submit button
 * 
 */
class PostCommentForm extends Component {
    
    constructor(props) {
        super(props);
        this.commentInput = null; // comment input element
    }

    onSubmitHandler(event) {
        event.preventDefault();
        this.props.onSubmit(this.commentInput.value);
    }

    render() {
        return (
            <div className="csui-post-comment-form">
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <textarea ref={ref => this.commentInput = ref} cols="30" rows="10" placeholder="Put your comment here..."></textarea>
                    <button type="submit" className="csui-button">Submit</button>
                </form>
            </div>
        );
    }
}

PostCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default PostCommentForm;
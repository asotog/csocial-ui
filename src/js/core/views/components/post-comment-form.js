import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tools from '../../../utils/tools';
import {ProgressButton} from './progress';

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
        if (!Tools.isEmptyString(this.commentInput.value)) {
            this.props.onSubmit(this.commentInput.value);
            this.commentInput.value = '';
        }   
    }

    render() {
        const {isSubmitting} = this.props;
        return (
            <div className="csui-post-comment-form">
                <form onSubmit={this.onSubmitHandler.bind(this)}>
                    <textarea ref={ref => this.commentInput = ref} cols="30" rows="5" placeholder="Put your comment here..."></textarea>
                    <ProgressButton loading={isSubmitting}/>
                </form>
            </div>
        );
    }
}

PostCommentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired
};

export default PostCommentForm;
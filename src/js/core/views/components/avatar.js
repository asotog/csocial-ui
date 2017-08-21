import React, { Component } from 'react';
import PropTypes from 'prop-types';

const _avatarBackgroundMap = {

};

const _generateAvatarBg = _ => { // generates background css classes csui-avatar-bg-1 to... csui-avatar-bg-5
    return 'csui-avatar-bg-' + (Math.floor(Math.random() * 5) + 1);
}

/**
 * Avatar component displays the user profile image, if loading fails, 
 * it displays the name first letters with a colored circle
 * 
 */
class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    componentDidUpdate(prevProps) {
        const {id, imageUrl} = this.props;
        const oldImageUrl = prevProps.imageUrl;
        // checks if id has a color assigned, if not, colore is assigned
        if (!_avatarBackgroundMap[id]) {
            _avatarBackgroundMap[id] = _generateAvatarBg();
        }
        // if image url property was changed, error is set to false
        if (oldImageUrl !== imageUrl) {
            this.setState({hasError: false});
        }
    }

    onImageError() {
        this.setState({hasError: true});
    }

    render() {
        const {imageUrl} = this.props;
        const {hasError} = this.state;
        return (
            <span className={`csui-avatar ${this.getAvatarBg()}`}>
                <img onError={this.onImageError.bind(this)} hidden={hasError} src={imageUrl} alt="Avatar Image"/>
                <span hidden={!hasError} className="csui-avatar-characters">{this.getUnknownImageText()}</span>
            </span>
        );
    }

    getAvatarBg() {
        const {id} = this.props;
        return _avatarBackgroundMap[id] ? _avatarBackgroundMap[id] : '';
    }

    /**
     * In case of image error we display a colored circle with the name initial letters
     */
    getUnknownImageText() {
        const {unknownImageText} = this.props;
        let textArray = unknownImageText.split(' ');
        textArray = textArray.map(text => text.trim().charAt(0));
        if (textArray.length > 1) {
            return textArray[0] + textArray[1];
        }
        return '';
    }
}

Avatar.propTypes = {
    id: PropTypes.string.isRequired, // unique identifier to assign color
    unknownImageText: PropTypes.string.isRequired, // text required to generated name chars when image fails
    imageUrl: PropTypes.string.isRequired // profile image url
};

export default Avatar;
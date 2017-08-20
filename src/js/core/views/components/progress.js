import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProgressCircular extends Component {
    render() {
        const {size} = this.props;
        return (
            <div className={`csui-progress-circular csui-active csui-${size}`}>
                <div className="csui-spinner-layer">
                    <div className="csui-circle-clipper csui-left">
                        <div className="csui-circle"></div>
                    </div>
                    <div className="csui-gap-patch">
                        <div className="csui-circle"></div>
                    </div>
                    <div className="csui-circle-clipper csui-right">
                        <div className="csui-circle"></div>
                    </div>
                </div>
            </div>
        );
    }
}

ProgressCircular.defaultProps = {
    size: 'small'
};

ProgressCircular.propTypes = {
    size: PropTypes.string
};


/**
 * Displays a big progress indicators
 * use case: when widget is loading the comments
 */
export class MainProgress extends Component {
    render() {
        const {show} = this.props;
        let cssClass = 'csui-progress-main';
        cssClass += show ? '' : ' csui-hidden';
        return (
            <div className={cssClass}>
                <ProgressCircular size="big"/>
            </div>
        );
    }
}

MainProgress.propTypes = {
    show: PropTypes.bool.isRequired
};

/**
 * Progress Button
 * Shows progress indicator, ideal for forms submitting and display that a process is currently running
 */
export class ProgressButton extends Component {
    
    render() {
        const {buttonText, onClick, loading} = this.props;
        let cssClasses = 'csui-button csui-button-progress';
        cssClasses += loading ? ' csui-loading' : '';
        return (
            <button onClick={onClick} type="submit"  className={cssClasses} disabled={loading}>
                <div className="csui-button-indicator">
                    <ProgressCircular size="tiny"/>
                </div>
                {buttonText}
            </button>
        );
    }
}

ProgressButton.defaultProps = {
    buttonText: 'Submit',
    onClick: function(event) {}
}

ProgressButton.propTypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};
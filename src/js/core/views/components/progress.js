import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                <div className="csui-progress-circular csui-active csui-big">
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
                    <div className="csui-progress-circular csui-active csui-tiny">
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
                </div>
                Submit
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
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
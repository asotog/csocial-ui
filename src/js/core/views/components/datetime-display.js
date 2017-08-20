import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {formatDate} from '../../../utils/localization';

/**
 * Re renders time every 5 seconds, this component is useful when use relative time: few seconds ago, 1 minute ago, etc
 * 
 */
class DateTimeDisplay extends Component {

    constructor(props) {
        super(props);
        this.refreshInterval = null;
    }

    componentDidMount() {
        this.refreshInterval = window.setInterval(_ => {
            this.forceUpdate();
        }, 5000);
    }

    componentWillUnmount() {
        window.clearInterval(this.refreshInterval);
    }

    render() {
        const {datetime} = this.props;
        return (
            <span className="csui-datetime-display">{formatDate(datetime)}</span>
        );
    }
}

DateTimeDisplay.propTypes = {
    datetime: PropTypes.string.isRequired
};

export default DateTimeDisplay;
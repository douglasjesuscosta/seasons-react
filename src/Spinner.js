import React from 'react';
import './Spinner.css';

const Spinner = (props) => {
    return (
        <div class="spinner-loader ui active dimmer">
            <div class="ui big text loader">{props.message}</div>
        </div>
    );
}

Spinner.defaultProps = {
    message: 'Loading...'
};

export default Spinner;
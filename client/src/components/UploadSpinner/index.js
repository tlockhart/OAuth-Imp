import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlingBall, faSpinner } from '@fortawesome/free-solid-svg-icons';

let UploadSpinner = () => {
    /* jshint ignore:start */
    return (
        <React.Fragment>
            <div className="fas fa-spin">
                <FontAwesomeIcon icon={faSpinner} size='5x' color='#3B5998' />
            </div>
        </React.Fragment>
    )
    /* jshint ignore:end */
};

export default UploadSpinner;

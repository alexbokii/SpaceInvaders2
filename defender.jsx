import React from 'react';
import ReactDOM from 'react-dom';
 
class Defender extends React.Component {
    render() {
       return  <div className="defender" style={{left: this.props.defenderPosition}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24">
                <rect x="19" y="0" width="2" height="2" fill="#00ff00"></rect>
                <rect x="17" y="2" width="6" height="6" fill="#00ff00"></rect>
                <rect x="3" y="8" width="34" height="3" fill="#00ff00"></rect>
                <rect width="40" height="12" x="0" y="11" fill="#00ff00"></rect>
            </svg>
        </div>
    }
}

export default Defender;
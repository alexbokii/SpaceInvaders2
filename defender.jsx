import React from 'react';
import ReactDOM from 'react-dom';
 
class Defender extends React.Component {
    render() {
       return  <div className="defender" style={{left: this.props.defenderPosition}}></div>
    }
}

export default Defender;
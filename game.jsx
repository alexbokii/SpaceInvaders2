import React from 'react';
import ReactDOM from 'react-dom';
import Invaders from './invaders.jsx';
import Defender from './defender.jsx';
 
class SpaceInvaders extends React.Component {

    render() {
        return (
            <div>
                <Invaders />
                <div className="defender"><Defender /></div>
            </div>
        )
    }
}
ReactDOM.render(<SpaceInvaders/>, document.getElementById('space-invaders'));
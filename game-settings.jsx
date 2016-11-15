import React from 'react';
import ReactDOM from 'react-dom';

class GameSettings extends React.Component {
    render() {
        let defenderLivesArray = [];
        for(let i = 0; i < this.props.lives; i++) {
            defenderLivesArray.push(i);
        }

        let defenderLives = defenderLivesArray.map(function(live, i) {
            return <div className="inline-svgs" key={i}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="21" viewBox="0 0 30 21">
                <rect x="15" y="0" width="2" height="2" fill="#00ff00"></rect>
                <rect x="13" y="2" width="6" height="5" fill="#00ff00"></rect>
                <rect x="2" y="7" width="28" height="2" fill="#00ff00"></rect>
                <rect x="0" y="9" width="32" height="12" fill="#00ff00"></rect>
            </svg>
            </div>
        });

       return (
            <div className="game-settings">
                <div className="pull-left">
                    <span className="settings-text">score: </span>
                </div>
                <div className="pull-right">
                    <span className="settings-text">lives: </span>
                    {defenderLives}
                </div>
                
            </div>
        );

    }
}

export default GameSettings;
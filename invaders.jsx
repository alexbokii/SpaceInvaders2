import React from 'react';
import ReactDOM from 'react-dom';
 
class Invaders extends React.Component {
    render() {
        let invader = this.props.invadersArray.map(function(inv, i) {
            return <div className="invader-container" key={i} style={{top: inv.y, left: inv.x}}>
                <div className={inv.type}></div>
            </div>
        });

        let invadersProjectiles = this.props.invadersProjectiles.map(function(projectile, i) {
            return <div className="inv-projectile" key={i} style={{top: projectile.y, left: projectile.x}}></div>
        });

        return (
            <div className="invaders-wrapper">
                {invader}
                {invadersProjectiles}
            </div>
        );
    }
}

export default Invaders;
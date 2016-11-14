import React from 'react';
import ReactDOM from 'react-dom';
import Invaders from './invaders.jsx';
import Defender from './defender.jsx';
// import fill from 'lodash';
 
class SpaceInvaders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invaders: invadersArray,
            invadersDirection: 'right',
            invadersDirectionSteps: 0,
            defender: {},
            defenderPosition: 20,
            invadersProjectiles: [],
            defenderProjectiles: [],
            gameAreaHeight: window.innerHeight,
            defenderLife: 3
        };
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleKeyPress(ev) {
        if(ev.key === 'ArrowRight') {
            this.setState({defenderPosition: this.state.defenderPosition + 10});
        }
        else if(ev.key === 'ArrowLeft') {
            this.setState({defenderPosition: this.state.defenderPosition - 10});
        }
        else if(ev.key === 'Space' || ev.key === 'Enter') {
            this.addDefenderProjectile();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);  
        window.requestAnimationFrame(this.step.bind(this));
        let invaders = window.setInterval(function() {
            this.updateInvadersPosition();
        }.bind(this), 1000);

        let moveInvaderProjectiles = window.setInterval(function() {
            this.moveInvadersProjectiles();
        }.bind(this), 1);

        let moveDefenderProjectiles = window.setInterval(function() {
            this.moveDefenderProjectiles();
        }.bind(this), 100);

        let addInvaderProjectiles = window.setInterval(function() {
            this.addInvadersProjectile();
        }.bind(this), 3000);

        // let checkMatches = window.setInterval(function() {
        //     this.checkPositions();
        // }.bind(this), 2000);
    }

    step() {
        window.requestAnimationFrame(this.step.bind(this));
        this.forceUpdate();
    }

    // moveInvaders
    updateInvadersPosition() {
        this.state.invadersDirectionSteps < 20 ?
            this.moveInvaders("x", this.state.invadersDirection) : 
            this.state.invadersDirection === 'left' ? this.setState({invadersDirection: 'right'}, this.moveInvaders("y")) : this.setState({invadersDirection: 'left'}, this.moveInvaders("y"));
    }

    moveInvaders(coordinate, steps) {
        let newStateInvaders = [];
        for(let i = 0; i < this.state.invaders.length; i++) {
            let invader = this.state.invaders[i];
            if(coordinate === 'x') {
                steps === 'left' ? invader.x = invader.x - 20 : invader.x = invader.x + 20;
            }
            else if(coordinate === 'y') {
                invader.y = invader.y + 20;
            }
            newStateInvaders.push(invader);
        }

        if(coordinate === "x") {
            this.setState({invaders: newStateInvaders, invadersDirectionSteps: this.state.invadersDirectionSteps + 1});
        }
        else if(coordinate === 'y') {
            this.setState({invaders: newStateInvaders, invadersDirectionSteps: 0});
        }  
    }

    // new defender projectile
    addDefenderProjectile() {
        let newDefenderProjectile = {
            x: this.state.defenderPosition,
            y: this.state.gameAreaHeight        
        }
        var newDefenderProjectileArray = [ ...this.state.defenderProjectiles, newDefenderProjectile ];
        this.setState({defenderProjectiles: newDefenderProjectileArray});
    }

    // move defender projectiles
    moveDefenderProjectiles() {
        let updatedDefenderProjectilesPosition = [];
        for(var i = 0; i < this.state.defenderProjectiles.length; i++) {
            let projectile = this.state.defenderProjectiles[i];
            projectile.y = projectile.y - 10;
            updatedDefenderProjectilesPosition.push(projectile);
        }
        this.setState({defenderProjectiles: updatedDefenderProjectilesPosition});
    }

    // new invaders projectile
    addInvadersProjectile() {
        let randomInvader = this.state.invaders[Math.floor(Math.random()*this.state.invaders.length)];
        let newDefenderProjectile = {
            x: randomInvader.x,
            y: randomInvader.y
        }
        var newInvadersProjectileArray = [ ...this.state.invadersProjectiles, newDefenderProjectile ];
        this.setState({invadersProjectiles: newInvadersProjectileArray});
    }

    // move invaders projectiles
    moveInvadersProjectiles() {
        let updatedInvadersProjectilesPosition = [];
        for(var i = 0; i < this.state.invadersProjectiles.length; i++) {
            let projectile = this.state.invadersProjectiles[i];
            projectile.y = projectile.y + 1;

            if(projectile.y === this.state.gameAreaHeight && projectile.x >= this.state.defenderPosition &&  projectile.x <= this.state.defenderPosition + 40) {
                this.setState({defenderLife: this.state.defenderLife - 1});
            }
            else if(projectile.y < this.state.gameAreaHeight) {
                updatedInvadersProjectilesPosition.push(projectile);
            }           
        }
        this.setState({invadersProjectiles: updatedInvadersProjectilesPosition});
    }

    render() {
        var defenderProjectiles = this.state.defenderProjectiles.map(function(projectile) {
            return <div className="def-projectile" style={{left: projectile.x, top: projectile.y}}></div>
        });

        return (
            <div>
                <div className="game-settings">
                    <p>Lifes: {this.state.defenderLife}</p>
                </div>
                <Invaders invadersArray={invadersArray} invadersContainerPosition={this.state.invadersPosition} invadersProjectiles={this.state.invadersProjectiles}/>
                <Defender defenderPosition={this.state.defenderPosition} />
                {defenderProjectiles}
            </div>
        )
    }
}

let invadersArray = [];
const types = ['fifth', 'fourth', 'third', 'second', 'first'];

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
        let invader = {
            type: types[i],
            x: 30 * j,
            y: 30 * i,
            width: 20,
            height: 20,
            alive: true,
        }

        invadersArray.push(invader);
    }
}

ReactDOM.render(<SpaceInvaders/>, document.getElementById('space-invaders'));


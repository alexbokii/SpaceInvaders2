import React from 'react';
import ReactDOM from 'react-dom';
import Invaders from './invaders.jsx';
import Defender from './defender.jsx';
import GameSettings from './game-settings.jsx';
import filter from 'lodash';
 
class SpaceInvaders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invaders: invadersArray,
            invadersDirection: 'right',
            invadersDirectionSteps: 0,
            invaderWidth: 20,
            invaderHeight: 20,
            defender: {},
            defenderPosition: 20,
            invadersProjectiles: [],
            defenderProjectiles: [],
            gameAreaHeight: window.innerHeight,
            defenderLive: 3,
            defenderScore: 0
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
        }.bind(this), 10);

        let moveDefenderProjectiles = window.setInterval(function() {
            this.moveDefenderProjectiles();
        }.bind(this), 60);

        let addInvaderProjectiles = window.setInterval(function() {
            this.addInvadersProjectile();
        }.bind(this), 3000);
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
        for(let i in this.state.invaders) {
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
            y: this.state.gameAreaHeight,
            id: this.state.defenderProjectiles.length + 1       
        }
        var newDefenderProjectileArray = [ ...this.state.defenderProjectiles, newDefenderProjectile ];
        this.setState({defenderProjectiles: newDefenderProjectileArray});
    }

    // move defender projectiles
    moveDefenderProjectiles() {
        // move
        let updatedDefenderProjectilesPosition = [];
        for(var i in this.state.defenderProjectiles) {
            let projectile = this.state.defenderProjectiles[i];
            projectile.y = projectile.y - 10;
            updatedDefenderProjectilesPosition.push(projectile);
        }
        this.setState({defenderProjectiles: updatedDefenderProjectilesPosition});

        // check if invader is hit by defenderProjectile
        let dp = this.state.defenderProjectiles;
        for(let i in dp) {
            let hitInvaders;
            let xInvaders = _.filter(this.state.invaders, function(inv) { return inv.x >= dp[i].x && inv.x <= dp[i].x + 20});
            for(let j in xInvaders) {
                hitInvaders = _.filter(xInvaders, function(inv) { return inv.y >= dp[i].y && inv.y <= dp[i].y + 20 });
            }
            if(hitInvaders.length > 0) {
                this.killInvader(hitInvaders[0].id);
                this.updateDefenderScore(hitInvaders[0].type);
                let updatedefenderProjectiles = _.filter(this.state.defenderProjectiles, function(projectile) { return projectile.id != updatedDefenderProjectilesPosition[i].id});
                this.setState({defenderProjectiles: updatedefenderProjectiles});
            }
        }
    }

    // killInvader
    killInvader(id) {
        let updatedInvadersArray = _.map(this.state.invaders, function(inv) {
            if(inv.id != id) {
                return inv;
            }
            else {
                let invader = inv;  
                invader.alive = false;
                return invader;
            }
        });
        this.setState({invaders: updatedInvadersArray});
    }

    updateDefenderScore(type) {
        const scores = {
            'first': 10,
            'second': 10,
            'third': 20,
            'fourth': 20,
            'fifth': 30
        };
        let newDefenderScore = scores[type] + this.state.defenderScore;
        this.setState({defenderScore: newDefenderScore});
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
        for(var i in  this.state.invadersProjectiles) {
            let projectile = this.state.invadersProjectiles[i];
            projectile.y = projectile.y + 3;

            if(projectile.y === this.state.gameAreaHeight && projectile.x >= this.state.defenderPosition &&  projectile.x <= this.state.defenderPosition + 40) {
                this.setState({defenderLive: this.state.defenderLive - 1});
            }
            else if(projectile.y < this.state.gameAreaHeight) {
                updatedInvadersProjectilesPosition.push(projectile);
            }           
        }
        this.setState({invadersProjectiles: updatedInvadersProjectilesPosition});
    }

    render() {
        var defenderProjectiles = this.state.defenderProjectiles.map(function(projectile, i) {
            return <div className="def-projectile" style={{left: projectile.x, top: projectile.y}} key={i}></div>
        });

        return (
            <div>
                <GameSettings lives={this.state.defenderLive} defenderScore={this.state.defenderScore} />
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
            id: i+j.toString()
        }

        invadersArray.push(invader);
    }
};

console.log(invadersArray);

ReactDOM.render(<SpaceInvaders/>, document.getElementById('space-invaders'));


import React from 'react';
import ReactDOM from 'react-dom';
 
class Invaders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {blockPositionLeft: 0, 
                    blockPositionTop: 0,
                    direction: "to_right",
                    invaders: []};

        // bind manually because React class components don't auto-bind
        // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
        //this.createNewInvadersArray = this.createNewInvadersArray.bind(this);
    }

    componentWillMount() {
        var invadersArray = [];
        for(var i = 0; i < 90; i++) {
            var invader = {
                img: <img src="alien.png" width='20' height='20' />,
                alive: true,
                bullet: false,
                bulletTop: 0,
                id: i
            };
            invadersArray.push(invader);
        }

        this.setState({invaders: invadersArray});
    }

    createInvaderBullet() {
        var invadersArray = this.state.invaders;
        var numberOfInv = Math.floor(Math.random() * invadersArray.length) + 1;
        invadersArray[numberOfInv].bullet = true;
        this.setState({invaders: invadersArray});
    }

    componentDidMount() {
        var moveInvadersInterval = setInterval(function() {
            if(this.state.direction === "to_right") {
                if(this.state.blockPositionLeft < 100) {
                    this.setState({blockPositionLeft: this.state.blockPositionLeft + 10});
                }
                else if(this.state.blockPositionLeft === 100) {
                    this.setState({blockPositionTop: this.state.blockPositionTop + 10});
                    this.setState({direction: "to_left"});
                }
            }
            else if(this.state.direction === "to_left") {
                if(this.state.blockPositionLeft > 0) {
                    this.setState({blockPositionLeft: this.state.blockPositionLeft - 10});
                }
                else if(this.state.blockPositionLeft === 0) {
                    this.setState({blockPositionTop: this.state.blockPositionTop + 10});
                    this.setState({direction: "to_right"});
                }
            }
            this.createInvaderBullet();
        }.bind(this), 1000);

        var moveBulletInterval = setInterval(function() {
            this.moveInvaderBullet();
        }.bind(this), 500);
    }

    moveInvaderBullet() {
        for(var i = 0; i < this.state.invaders.length; i++) {
            if(this.state.invaders[i].bullet) {
                var updatedInvaders = this.state.invaders;
                updatedInvaders[i].bulletTop = updatedInvaders[i].bulletTop + 10;
                this.setState({invaders: updatedInvaders});
            }
        }
    }

    render() {
        var spaceInvader = this.state.invaders.map(function(inv, i) {
            if(inv.alive && inv.bullet) {
                return <div className="invader-container" key={i}>
                            {inv.img}
                            <div className="invader-bullet" style={{top: inv.bulletTop}}></div>
                        </div>
            }
            else if(inv.alive && !inv.bullet) {
                return <div className="invader-container" key={i}>{inv.img}</div>
            }
            else {
                return <div className="invader-container"></div>
            }
            
        });
        
        return (
            <div className="invaders-wrapper" style={{left: this.state.blockPositionLeft + "px", top: this.state.blockPositionTop + "px"}}>{spaceInvader}</div>
        )
    }
}

export default Invaders;

// toDo
// make more types of invaders 
// fire
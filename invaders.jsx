import React from 'react';
import ReactDOM from 'react-dom';
 
class Invaders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {blockPositionLeft: 0, 
                        blockPositionTop: 0,
                        direction: "to_right"};

        // bind manually because React class components don't auto-bind
        // http://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
       // this.onChange = this.onChange.bind(this);
      }

    componentDidMount() {
        setInterval(function() {
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
        }.bind(this), 1000);  
    } 

    render() {
        var invader = {
            img: <img src="alien.png" width='20' height='20' />,
            alive: true
        }

        var invaders = [];
        for(var i = 0; i < 90; i++) {
            invaders.push(invader);
        }

        var spaceInvader = invaders.map(function(inv, i) {
            if(inv.alive) {
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
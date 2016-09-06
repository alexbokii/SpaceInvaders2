import React from 'react';
import ReactDOM from 'react-dom';
 
class Defender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defenderBullets: []
        };
    }

    componentDidMount() {
        var defenderBulletsInterval = setInterval(function() {
            for(var i = 0; i < this.state.defenderBullets.length; i++) {
                var updatedBulletPositionArray = this.state.defenderBullets;
                updatedBulletPositionArray[i].bottomPosition = updatedBulletPositionArray[i].bottomPosition + 5;
                this.setState({defenderBullets: updatedBulletPositionArray});
            }
        }.bind(this), 300);   
    }

    generateDefenderBullets() {
        var bullet = {
            bottomPosition: 0,
            active: true
        }
        var newBulletsArray = this.state.defenderBullets;
        newBulletsArray.push(bullet);
        this.setState({defenderBullets: newBulletsArray});
    }

    render() {
        return (
            <div>
                defender
            </div>
        )
    }
}

export default Defender;

// toDo
// defender svg
// move it to the lrft/right with a key
// fire
import React from 'react';
import TravoltaGif from './travolta.gif';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Travolta extends React.Component {
  render() {
    const st = {
      backgroundImage: `url('${TravoltaGif}')`,
      backgroundSize: 'auto 70%',
      backgroundPosition: 'right top',
      backgroundRepeat: 'no-repeat',
      width: '50vw',
      height: '50vh',
      position: 'fixed',
      top: 0,
      right: 0
    }
    return (
      <div className="Travolta" style={st}>

      </div>
    )
  }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user, questions } = authentication;
    return {
        user,
        users,
        questions
    };
}


const connectedTravolta = connect(mapStateToProps)(Travolta);
export { connectedTravolta as Travolta };

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Travolta } from '../_components';

class QuestionForm extends Component {
  constructor() {
    super()
    this.state = {
      timeToShowTravolta: 10
    }
  }

  componentDidMount() {
    setInterval(() => {
      if(this.state.timeToShowTravolta > 0) {
        this.setState({timeToShowTravolta: this.state.timeToShowTravolta - 1})
      }
    }, 1000);
    this.props.dispatch(userActions.getAll());
  }

  _handleSubmit(event) {
    event.preventDefault();

    let body = this._body;
    let data = {body: body.value, user_id: this.props.user.id }

    if (!this._body.value.length) {
      alert('Text field is blank');
      return;
    } else {
      body.value = '';
      this.props.addQuestion(data);
    }
  }

  _onChange(event) {
    this.setState({timeToShowTravolta: 10})
  }

  render() {
    const { user, users } = this.props;
    return (
      <form className="question-form" onSubmit={this._handleSubmit.bind(this)}>
      {this.state.timeToShowTravolta <= 0 && <Travolta />}
        <div >
          <input placeholder="Question:" ref={(input) => this._body = input} onChange={this._onChange.bind(this)} />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;

  return {
      user,
      users
  };
}

const connectedQuestionForm = connect(mapStateToProps)(QuestionForm);
export { connectedQuestionForm as QuestionForm };

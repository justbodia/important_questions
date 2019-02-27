import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { QuestionsBlock } from '../_questions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      questionsCount: 0,
      importantQuestionsCount: 0
    }
  }

  componentDidMount() {
    this.bindLastQuestion();
    this.props.dispatch(userActions.getAll());
  }

  bindLastQuestion() {
    this.setState({ questionsCount: JSON.parse(localStorage.getItem('questions')) &&
                                      JSON.parse(localStorage.getItem('questions')).length,
                   importantQuestionsCount: JSON.parse(localStorage.getItem('importantQuestionsIds')) &&
                                              JSON.parse(localStorage.getItem('importantQuestionsIds')).length })
  }

  render() {
      const { user, users, questions } = this.props;
      return (
        <div className='main-wrapper-column'>
          <div className="header-helper"></div>
          <div className="header">
            <div>
              <span>You are logged in as </span>
              <span className="full-name">{this.props.user.firstName} {this.props.user.lastName}.</span>
            </div>
            <div>
              {this.state.importantQuestionsCount != 10 &&
                this.state.questionsCount == 100 &&
                <span>Define your 10 most important questions!</span>}
              {this.state.importantQuestionsCount != 10 &&
                this.state.questionsCount < 100 &&
                <span>Write down 100 questions!</span>}
              {this.state.importantQuestionsCount == 10 && <span>Congratulations!</span>}
            </div>
            <div className='header--menu-buttons'>
              <MuiThemeProvider>
                <RaisedButton label="logout" secondary={true} href="/login"/>
              </MuiThemeProvider>
            </div>
          </div>
          <div>
            <QuestionsBlock bindLastQuestion={this.bindLastQuestion.bind(this)}/>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user, questions, important_questions_ids } = authentication;

  return {
    user,
    users,
    questions,
    important_questions_ids
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };

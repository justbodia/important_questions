import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { QuestionForm } from '../_questions';

class QuestionsBlock extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      importantQuestionsIds: []
    };
  }

  componentWillMount() {
    this._fetchQuestions();
  }

  _handleItemClick(event) {
    const data = {question: event.target.id }
    const questions = this._getQuestions() || [];
    const important_questions_ids = this._getImportantQuestionsIds() || [];
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    if (questions.length == 100 && important_questions_ids.length < 10) {
      return fetch('/important_questions_ids', requestOptions)
        .then(
          (result) => {
            this.props.bindLastQuestion();
            this.setState({importantQuestionsIds: JSON.parse(localStorage.getItem('importantQuestionsIds'))})
          }
        );
    }
  }

  _fetchQuestions() {
    this.setState({ questions: this.props.questions, importantQuestionsIds: this.props.importantQuestionsIds });
  }

  _clearImportantQeustionsList() {
    if (localStorage.removeItem('importantQuestionsIds') == undefined) {
      this.setState({ importantQuestionsIds: [] });
      location.reload();
    }
  }

  _getQuestions() {
    let questions = []
    this.state.questions && this.state.questions.map((question =>
      this.props.user.id == question.user_id && questions.push(question)
    ))

    return questions
  }

  _getImportantQuestionsIds() {
    let importantQuestionsIds = []
    this.state.importantQuestionsIds && this.state.importantQuestionsIds.map((important_questions_id =>
      importantQuestionsIds.push(important_questions_id.question)
    ))

    return importantQuestionsIds
  }

  _addQuestion(data) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    return fetch('/questions', requestOptions)
      .then(
        (result) => {
          this.props.bindLastQuestion();
          this.setState({ questions: JSON.parse(localStorage.getItem('questions'))});
        }
      );
  }

  render() {
    const { user, users } = this.props;
    const questions = this._getQuestions() || [];
    const important_questions_ids = this._getImportantQuestionsIds() || [];

    return (
      <div>
        {questions.length < 100 && <h2 className='text-align-left'>Write your question:</h2>}
        {questions.length == 100 && <h2 className='text-align-left margin-bottom'>Define 10 most important questions:</h2>}
        {questions.length < 100 && <QuestionForm addQuestion={this._addQuestion.bind(this)} />}
          <div className='remaining'>
            {questions.length < 100 && questions.length > 0 && <span>{(100 - questions.length)} questions remaining...</span>}
            {questions.length == 100 &&
              <span>{(10 - important_questions_ids.length)} important questions remaining...</span>}
          </div>
          <div className="flex-row">
            <div className="half-width-column">
              <h3>All questions:</h3>
              <ol>
                {questions.map((question) =>
                  <li key={question.id}
                      className={important_questions_ids.indexOf(question.id + '') > -1 && 'active' ||
                                  questions.length == 100 && important_questions_ids.length < 10 && '-clickable' ||
                                  ''}
                      onClick = {this._handleItemClick.bind(this)}
                       id={question.id}>
                    {question.body}
                  </li>
                )}
              </ol>
            </div>
            <div className="half-width-column">
            <div className="fixed-wrapper">
              <h3 className='inline'>Important questions: </h3>
              <span className='clean' onClick = {this._clearImportantQeustionsList.bind(this)}>clean list</span>
              <ol>
                {questions.map((question) =>
                  important_questions_ids.indexOf(question.id + '') > -1 &&
                    <li key={question.id} className='active main-question'>
                      {question.body}
                    </li>)}
              </ol>
            </div>
            </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user, questions, importantQuestionsIds } = authentication;

  return {
      user,
      users,
      questions,
      importantQuestionsIds
  };
}

const connectedQuestionsBlock = connect(mapStateToProps)(QuestionsBlock);
export { connectedQuestionsBlock as QuestionsBlock };

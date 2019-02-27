import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
let questions = JSON.parse(localStorage.getItem('questions'));
let importantQuestionsIds = JSON.parse(localStorage.getItem('importantQuestionsIds'));
const initialState = user ? { loggedIn: true, user, questions, importantQuestionsIds } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
        questions: questions,
        importantQuestionsIds: importantQuestionsIds
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        questions: questions,
        importantQuestionsIds: importantQuestionsIds
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}

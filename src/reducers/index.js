import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  courses,
  authors,
  form: formReducer
});

export default rootReducer;

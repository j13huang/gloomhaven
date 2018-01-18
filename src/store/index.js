import { combineReducers, createStore } from 'redux';
import { reducer as attackModifierCards } from './attackModifierCards';
import { reducer as elements } from "./elements";
import {reducer as monsters} from './monsters';

export const store = createStore(
  combineReducers({
    attackModifierCards,
    elements,
    monsters,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

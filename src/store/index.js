import { combineReducers, createStore } from 'redux';
import {reducer as players} from './players';
import { reducer as attackModifierDecks } from './attackModifierDecks';
import { reducer as elements } from "./elements";
import {reducer as boss} from './boss';
import {reducer as monsters} from './monsters';
import {reducer as monsterDecks} from './monsterDecks';
import {reducer as turn} from './turn';

export const store = createStore(
  combineReducers({
    players,
    attackModifierDecks,
    elements,
    boss,
    monsters,
    monsterDecks,
    turn,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

import { combineReducers } from 'redux';
import {reducer as attackModifierCards} from './attackModifierCards';
import {reducer as elements} from "./elements";
//import {monsterCards} from './monsterCards';

export const reducer = combineReducers({
  attackModifierCards,
  elements,
  //monsterCards,
});

import { combineReducers } from 'redux'
import {reducer as attackModifierCards} from './attackModifierCards'
//import {monsterCards} from './monsterCards'

export const reducer = combineReducers({
  attackModifierCards,
  //monsterCards,
})

export const END_TURN = "endTurn";

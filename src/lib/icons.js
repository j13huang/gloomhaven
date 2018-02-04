import {iconForElement} from './elements';
import {iconForBonus} from "./bonuses";
import {iconForStatusEffect} from './statusEffects';
import {iconForAction} from './actions/index';

export function getIcon(name) {
    return iconForElement(name) || iconForStatusEffect(name) || iconForBonus(name) || iconForAction(name);
}
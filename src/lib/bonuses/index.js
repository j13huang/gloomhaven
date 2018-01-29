import healIcon from "./heal.svg";
import retaliateIcon from "./retaliate.svg";
import shieldIcon from "./shield.svg";
import pierceIcon from "./pierce.svg";
import addTargetIcon from "./add_target.svg";

export const HEAL = "heal";
export const RETALIATE = "retaliate";
export const SHIELD = "shield";
export const PIERCE = "pierce";
export const ADD_TARGET = "add_target";

const bonusIcons = {
    [HEAL]: healIcon,
    [RETALIATE]: retaliateIcon,
    [SHIELD]: shieldIcon,
    [PIERCE]: pierceIcon,
    [ADD_TARGET]: addTargetIcon,
};

export const BONUSES = Object.keys(bonusIcons);

export function iconForBonus(name) {
    return bonusIcons[name];
}

export function pierce(value) {
    return {type: PIERCE, value};
}

export function shield(value, self = true) {
    return {type: SHIELD, value, self};
}

export function heal(value, self = true) {
    return {type: HEAL, value, self};
}

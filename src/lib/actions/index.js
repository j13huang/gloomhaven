import attackIcon from "./attack.svg";
import healIcon from "./heal.svg";
import moveIcon from "./move.svg";
import pierceIcon from "./pierce.svg";
import rangeIcon from "./range.svg";
import retaliateIcon from "./retaliate.svg";
import shieldIcon from "./shield.svg";
import targetIcon from "./target.svg";
import lootIcon from "./loot.svg";
import pushIcon from "./push.svg";
import pullIcon from "./pull.svg";
import jumpIcon from "./jump.svg";

export const ATTACK = "Attack";
export const HEAL = "Heal";
export const MOVE = "Move";
export const RANGE = "Range";
export const RETALIATE = "Retaliate";
export const SHIELD = "Shield";
export const TARGET = "Target";
export const LOOT = "Loot";
export const COMPOUND_TEXT = "COMPOUND_TEXT";

export const JUMP = "Jump";

export const PIERCE = "PIERCE";
export const PUSH = "PUSH";
export const PULL = "PULL";

export const CURSE = "CURSE";
export const BLESS = "BLESS";

export function action(type, modifier, subActions, image) {
    return {
        type,
        modifier,
        subActions: subActions || [],
        image,
    };
}

const icons = {
    [ATTACK]: attackIcon,
    [HEAL]: healIcon,
    [MOVE]: moveIcon,
    [PIERCE]: pierceIcon,
    [RANGE]: rangeIcon,
    [RETALIATE]: retaliateIcon,
    [SHIELD]: shieldIcon,
    [TARGET]: targetIcon,
    [LOOT]: lootIcon,
    [PUSH]: pushIcon,
    [PULL]: pullIcon,
    [JUMP]: jumpIcon,
}

export function iconForAction(actionName) {
    return icons[actionName];
}

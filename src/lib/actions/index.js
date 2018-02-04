import attackIcon from "./attack.svg";
import healIcon from "./heal.svg";
import moveIcon from "./move.svg";
import rangeIcon from "./range.svg";
import retaliateIcon from "./retaliate.svg";
import shieldIcon from "./shield.svg";
import pushIcon from "./push.svg";
import pullIcon from "./pull.svg";

export const ATTACK = "attack";
export const HEAL = "heal";
export const MOVE = "move";
export const RANGE = "range";
export const RETALIATE = "retaliate";
export const SHIELD = "shield";
export const PUSH = "push";
export const PULL = "pull";

export function action(action, subActions, image) {
    return {
        action,
        subActions,
        image,
    };
}

export function attack(modifier) {
    return {
        type: ATTACK,
        modifier,
    }
}

const icons = {
    [ATTACK]: attackIcon,
    [HEAL]: healIcon,
    [MOVE]: moveIcon,
    [RANGE]: rangeIcon,
    [RETALIATE]: retaliateIcon,
    [SHIELD]: shieldIcon,
    [PUSH]: pushIcon,
    [PULL]: pullIcon,
}

export function iconForAction(actionName) {
    return icons[actionName];
}

import attackIcon from "./attack.svg";
import moveIcon from "./move.svg";
import rangeIcon from "./range.svg";

export const ATTACK = "attack";
export const MOVE = "move";
export const RANGE = "range";

const statIcons = {
    [ATTACK]: attackIcon,
    [MOVE]: moveIcon,
    [RANGE]: rangeIcon,
};

export const STATS = Object.keys(statIcons);

export function iconForStat(name) {
    return statIcons[name];
}


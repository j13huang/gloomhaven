import attackIcon from "./attack.svg";
import movementIcon from "./movement.svg";
import rangeIcon from "./range.svg";
import healthIcon from "./health.svg";

export const ATTACK = "attack";
export const MOVEMENT = "movement";
export const RANGE = "range";
export const HEALTH = "health";

const statIcons = {
    [ATTACK]: attackIcon,
    [MOVEMENT]: movementIcon,
    [RANGE]: rangeIcon,
    [HEALTH]: healthIcon,
};

export const STATS = Object.keys(statIcons);

export function iconForStat(name) {
    return statIcons[name];
}


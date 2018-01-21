import retaliateIcon from "./retaliate.svg";
import shieldIcon from "./shield.svg";

export const RETALIATE = "retaliate";
export const SHIELD = "shield";

const bonusIcons = {
    [RETALIATE]: retaliateIcon,
    [SHIELD]: shieldIcon,
};

export const BONUSES = Object.keys(bonusIcons);

export function iconForBonus(name) {
    return bonusIcons[name];
}


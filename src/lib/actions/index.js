const MOVE = "move";
const ATTACK = "attack";
const SHIELD = "shield";
const RANGE = "range";
const HEAL = "heal";
const HEALTH = "health";
const RETALIATE = "retaliate";
const PUSH = "push";

export function attack(modifier, subtext = []) {
    return {
        type: ATTACK,
        modifier,
        subtext,
    }
}
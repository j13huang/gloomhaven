const MOVE = "move";
const ATTACK = "attack";
const SHIELD = "shield";
const HEAL = "heal";
const RETALIATE = "retaliate";
const PUSH = "push";

export function attack(modifier, subtext = []) {
    return {
        type: ATTACK,
        modifier,
        subtext,
    }
}
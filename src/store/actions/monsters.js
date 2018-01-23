export const RESET_MONSTERS = "monsters/reset";
export const ADD_MONSTERS = "monsters/add";
export const REMOVE_MONSTER = "monsters/remove";

export function resetMonstersAction() {
    return {type: RESET_MONSTERS};
}

export function removeMonsterAction(name) {
    return {type: REMOVE_MONSTER, name};
}

export function addMonstersAction(monsterNames, level) {
    return {type: ADD_MONSTERS, monsters: monsterNames, level};
}

export const RESET_MONSTERS = "monsters/reset";
export const ADD_MONSTERS = "monsters/add";
export const REMOVE_MONSTER = "monsters/remove";

export function resetMonstersAction(dispatch) {
    dispatch({type: RESET_MONSTERS});
}

export function removeMonsterAction(dispatch, name) {
    dispatch({type: REMOVE_MONSTER, name});
}

export function addMonstersAction(dispatch, monsterNames, level) {
    dispatch({type: ADD_MONSTERS, monsters: monsterNames, level});
}

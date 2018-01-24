export const ADD_PLAYER = "players/add";
export const REMOVE_PLAYER = "players/remove";

export function addPlayerAction(name, characterClass) {
    return {type: ADD_PLAYER, name, class: characterClass};
}

export function removePlayerAction(name) {
    return {type: REMOVE_PLAYER, name};
}

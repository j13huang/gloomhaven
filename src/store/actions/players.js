export const ADD_PLAYER = "players/add";
export const REMOVE_PLAYER = "players/remove";
const RESET_PLAYERS = "players/reset";

export function addPlayerAction(name, characterClass) {
    return {type: ADD_PLAYER, name, class: characterClass};
}

export function resetPlayersAction() {
    return {type: RESET_PLAYERS};
}

export function removePlayerAction(name) {
    return {type: REMOVE_PLAYER, name};
}

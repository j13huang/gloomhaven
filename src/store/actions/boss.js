export const SET_BOSS = "monsters/boss/set"
export const REMOVE_BOSS = "monsters/boss/remove";

export function setBossAction(name, level, numPlayers) {
    return {type: SET_BOSS, name, level, numPlayers};
}

export function removeBossAction() {
    return {type: REMOVE_BOSS};
}

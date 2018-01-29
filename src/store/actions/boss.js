export const SET_BOSS = "monsters/boss/set"
export const REMOVE_BOSS = "monsters/boss/remove";

export function setBossAction(dispatch, name, level, numPlayers) {
    dispatch({type: SET_BOSS, name, level, numPlayers});
}

export function removeBossAction(dispatch) {
    dispatch({type: REMOVE_BOSS});
}

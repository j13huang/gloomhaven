import {getCharacterStats} from "../lib/classes";
import {newStatusEffectTracker} from "../lib/statusEffects";
import {ADD_PLAYER, REMOVE_PLAYER} from "./actions/players";

function newPlayer(characterClass, level) {
    const stats = getCharacterStats(characterClass, level - 1);
    return {
        level: level,
        class: characterClass,
        hp: stats.maxHP,
        maxHP: stats.maxHP,
        statusEffects: newStatusEffectTracker(),
    };
}

const defaultState = {
    levelAdjustment: 0,
    players: {},
};

const SET_LEVEL = "players/level/set";
const SET_LEVEL_ADJUSTMENT = "players/level/setAdjustment";
const TOGGLE_STATUS_EFFECT = "players/statusEffect/toggle";
const SET_HP = "players/hp/set";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
        {
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        ...newPlayer(action.class, 1),
                    },
                },
            };
        }
        case REMOVE_PLAYER:
        {
            const newPlayers = {...state.players};
            delete newPlayers[action.name];
            return {
                ...state,
                players: newPlayers,
            };
        }
        case SET_LEVEL:
        {
            const player = state.players[action.name];
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        ...newPlayer(player.class, action.level),
                    },
                },
            };
        }
        case SET_LEVEL_ADJUSTMENT:
        {
            return {
                ...state,
                levelAdjustment: action.levelAdjustment,
            };
        }
        case TOGGLE_STATUS_EFFECT:
        {
            const player = state.players[action.name];
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        ...player,
                        statusEffects: {
                            ...player.statusEffects,
                            [action.statusEffect]: !player.statusEffects[action.statusEffect],
                        },
                    },
                },
            };
        }
        case SET_HP:
        {
            const player = state.players[action.name];
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        ...player,
                        hp: action.hp,
                    },
                },
            };
        }
        default: return state;
    }
}

export function setLevelAction(name, level) {
    return {type: SET_LEVEL, name, level};
}

export function setLevelAdjustmentAction(levelAdjustment) {
    return {type: SET_LEVEL_ADJUSTMENT, levelAdjustment};
}

export function toggleStatusEffectAction(name, statusEffect) {
    return {type: TOGGLE_STATUS_EFFECT, name, statusEffect};
}

export function setHPAction(name, hp) {
    return {type: SET_HP, name, hp};
}

export const selectors = {
    numPlayers: (state) => Object.keys(state.players.players).length,
    baseScenarioLevel: (state) => {
        return Math.ceil(Object.keys(state.players.players).reduce((sum, p) => {
            const player = state.players.players[p];
            return sum + player.level;
        }, 0) / 2);
    },
    // + adjustment
    scenarioLevel: (state) => {
        return Math.ceil(Object.keys(state.players.players).reduce((sum, p) => {
            const player = state.players.players[p];
            return sum + player.level;
        }, state.players.levelAdjustment) / 2);
    },
};

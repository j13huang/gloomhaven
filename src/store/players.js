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

function calculateScenarioLevel(players, baseLevel) {
    const playerNames = Object.keys(players);
    if (playerNames.length === 0) {
        return 0;
    }
    return Math.ceil(playerNames.reduce((sum, p) => {
        const player = players[p];
        return sum + player.level;
    }, baseLevel) / playerNames.length / 2);
}

export const selectors = {
    numPlayers: (state) => Object.keys(state.players.players).length,
    baseScenarioLevel: (state) => {
        return calculateScenarioLevel(state.players.players, 0);
    },
    // + level adjustment
    scenarioLevel: (state) => {
        return calculateScenarioLevel(state.players.players, state.players.levelAdjustment);
    },
};

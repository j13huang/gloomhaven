import {CLASS_NAMES, getCharacterStats} from "../lib/classes";
import {newStatusEffectTracker} from "../lib/statusEffects";
import {LOAD_PARTY} from "./actions/party";
import {ADD_PLAYER, REMOVE_PLAYER} from "./actions/players";
import {END_TURN} from "./actions/turn";

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
    selectableClasses: CLASS_NAMES.reduce((acc, c) => {acc[c] = true; return acc;}, {}),
    players: {},
    initiative: {},
};

const SET_LEVEL = "players/level/set";
const SET_LEVEL_ADJUSTMENT = "players/level/setAdjustment";
const TOGGLE_STATUS_EFFECT = "players/statusEffect/toggle";
const SET_HP = "players/hp/set";
const TOGGLE_INITIATIVE = "players/initiative/toggle";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_PARTY:
        {
            const loadedPlayers = Object.entries(action.party).reduce((acc, [playerName, playerData]) => {
                acc[playerName] = newPlayer(playerData.class, playerData.level);
                return acc;
            }, {});
            return {
                ...defaultState,
                players: loadedPlayers,
            };
        }
        case ADD_PLAYER:
        {
            return {
                ...state,
                selectableClasses: {
                    ...state.selectableClasses,
                    [action.class]: false,
                },
                players: {
                    ...state.players,
                    [action.name]: {
                        ...newPlayer(action.class, action.level || 1),
                    },
                },
            };
        }
        case REMOVE_PLAYER:
        {
            const player = state.players[action.name];
            const newPlayers = {...state.players};
            delete newPlayers[action.name];
            return {
                ...state,
                selectableClasses: {
                    ...state.selectableClasses,
                    [player.class]: true,
                },
                players: newPlayers,
                initiative: {},
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
        case TOGGLE_INITIATIVE:
        {
            return {
                ...state,
                initiative: {
                    ...state.initiative,
                    [action.initiative]: {
                        ...state.initiative[action.initiative],
                        [action.playerName]: !(state.initiative[action.initiative] || {})[action.playerName],
                    }
                },
            };
        }
        case END_TURN:
        {
            return {
                ...state,
                initiative: {},
            };
        }
        default: return state;
    }
}

export function setLevelAction(dispatch, name, level) {
    dispatch({type: SET_LEVEL, name, level});
}

export function setLevelAdjustmentAction(dispatch, levelAdjustment) {
    dispatch({type: SET_LEVEL_ADJUSTMENT, levelAdjustment});
}

export function toggleStatusEffectAction(dispatch, name, statusEffect) {
    dispatch({type: TOGGLE_STATUS_EFFECT, name, statusEffect});
}

export function setHPAction(dispatch, name, hp) {
    dispatch({type: SET_HP, name, hp});
}

export function toggleIntiativeAction(dispatch, playerName, initiative) {
    dispatch({type: TOGGLE_INITIATIVE, playerName, initiative});
}

function calculateScenarioLevel(players) {
    const playerNames = Object.keys(players);
    if (playerNames.length === 0) {
        return 0;
    }
    const averageLevel = playerNames.reduce((sum, p) => {
        const player = players[p];
        return sum + player.level;
    }, 0) / playerNames.length;
    return Math.ceil(averageLevel / 2);
}

export const selectors = {
    selectableClasses: (state) => {
        return Object.keys(state.players.selectableClasses).filter((c) => {
            return state.players.selectableClasses[c];
        });
    },
    numPlayers: (state) => Object.keys(state.players.players).length,
    baseScenarioLevel: (state) => calculateScenarioLevel(state.players.players),
    // + level adjustment
    scenarioLevel: (state) => {
        return calculateScenarioLevel(state.players.players) + state.players.levelAdjustment;
    },
};

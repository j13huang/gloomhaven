import {CLASS_NAMES, getCharacterStats} from "../lib/classes";
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
        summons: {},
    };
}

const defaultState = {
    levelAdjustment: 0,
    selectableClasses: CLASS_NAMES.reduce((acc, c) => {acc[c] = true; return acc;}, {}),
    summonInput: {
        name: "",
        hp: 0,
        movement: 0,
        attack: 0,
        range: 0,
        extra: "",
    },
    players: {},
};

const SET_LEVEL = "players/level/set";
const SET_LEVEL_ADJUSTMENT = "players/level/setAdjustment";
const TOGGLE_STATUS_EFFECT = "players/statusEffect/toggle";
const SET_HP = "players/hp/set";
const UPDATE_SUMMON_INPUT = "summonInput/update";
const ADD_SUMMON = "players/summons/add";
const REMOVE_SUMMON = "players/summons/remove";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
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
                        ...newPlayer(action.class, 1),
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
        case UPDATE_SUMMON_INPUT:
        {
            return {
                ...state,
                summonInput: {
                    ...state.summonInput,
                    ...action.summonInput,
                },
            };
        }
        case ADD_SUMMON:
        {
            const player = state.players[action.name];
            const summonName = action.summonName ? action.summonName : `${action.name} summon #${Object.keys(player.summons)}`;
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        ...player,
                        summons: {
                            ...player.summons,
                            [summonName]: action.summonInput,
                        },
                    },
                },
            };
        }
        case REMOVE_SUMMON:
        {
            const player = state.players[action.name];
            const newSummons = {...player.summons};
            delete newSummons[action.summonName];
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.name]: {
                        ...player,
                        summons: newSummons,
                    },
                },
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

export function updateSummonInputAction(summonInput) {
    return {type: UPDATE_SUMMON_INPUT, summonInput};
}

export function addSummonAction(name, summonName, summonInput) {
    return {type: ADD_SUMMON, summonName, summonInput};
}

export function removeSummonAction(name, summonName) {
    return {type: REMOVE_SUMMON, summonName};
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
    baseScenarioLevel: (state) => {
        return calculateScenarioLevel(state.players.players);
    },
    // + level adjustment
    scenarioLevel: (state) => {
        return calculateScenarioLevel(state.players.players) + state.players.levelAdjustment;
    },
};

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
};

const SET_LEVEL = "players/level/set";
const TOGGLE_STATUS_EFFECT = "players/statusEffect/toggle";
const SET_HP = "players/hp/set";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PLAYER:
        {
            return {
                ...state,
                [action.name]: {
                    ...newPlayer(action.class, 1),
                },
            };
        }
        case REMOVE_PLAYER:
        {
            const newState = {...state};
            delete newState[action.name];
            return newState;
        }
        case SET_LEVEL:
        {
            const player = state[action.name];
            return {
                ...state,
                [action.name]: {
                    ...newPlayer(player.class, action.level),
                },
            };
        }
        case TOGGLE_STATUS_EFFECT:
        {
            const player = state[action.name];
            return {
                ...state,
                [action.name]: {
                    ...player,
                    statusEffects: {
                        ...player.statusEffects,
                        [action.statusEffect]: !player.statusEffects[action.statusEffect],
                    },
                },
            };
        }
        case SET_HP:
        {
            const player = state[action.name];
            return {
                ...state,
                [action.name]: {
                    ...player,
                    hp: action.hp,
                },
            };
        }
        default: return state;
    }
}

export function setLevelAction(name, level) {
    return {type: SET_LEVEL, name, level};
}

export function toggleStatusEffectAction(name, statusEffect) {
    return {type: TOGGLE_STATUS_EFFECT, name, statusEffect};
}

export function setHPAction(name, hp) {
    return {type: SET_HP, name, hp};
}

export const selectors = {
    numPlayers: (state) => Object.keys(state.players).length,
    scenarioLevel: (state) => {
        return Math.ceil(Object.keys(state.players).reduce((sum, p) => {
            const player = state.players[p];
            return sum + player.level;
        }, 0) / 2);
    },
};

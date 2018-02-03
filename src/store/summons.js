import {newStatusEffectTracker} from "../lib/statusEffects";

export const baseStats = {
    name: "",
    hp: 1,
    movement: 0,
    attack: 0,
    range: 0,
    extra: "",
};

function newSummon(summon, name) {
    return {
        ...summon,
        name,
        maxHP: summon.hp,
        statusEffects: newStatusEffectTracker(),
    }
}

const defaultState = {};

const ADD_SUMMON = "summons/add";
const REMOVE_SUMMON = "summons/remove";
const TOGGLE_STATUS_EFFECT = "summons/statusEffects/toggle";
const SET_HP = "summons/hp/set";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_SUMMON:
        {
            const summons = state[action.playerName];
            const name = action.summon.name ? action.summon.name : `Summon #${summons ? Object.keys(summons).length + 1 : 1}`;
            return {
                ...state,
                [action.playerName]: {
                    ...summons,
                    [name]: newSummon(action.summon, name),
                },
            };
        }
        case REMOVE_SUMMON:
        {
            const newSummons = {...state[action.playerName]};
            delete newSummons[action.name];
            return {
                ...state,
                [action.playerName]: newSummons,
            };
        }
        case SET_HP:
        {
            return {
                ...state,
                [action.playerName]: {
                    ...state[action.playerName],
                    [action.name]: {
                        ...state[action.playerName][action.name],
                        hp: action.hp,
                    },
                },
            };
        }
        case TOGGLE_STATUS_EFFECT:
        {
            return {
                ...state,
                [action.playerName]: {
                    ...state[action.playerName],
                    [action.name]: {
                        ...state[action.playerName][action.name],
                        statusEffects: {
                            ...state[action.playerName][action.name].statusEffects,
                           [action.statusEffect]: !state[action.playerName][action.name].statusEffects[action.statusEffect],
                        },
                    },
                },
            };
        }
        default: return state;
    }
}

export function addSummonAction(dispatch, playerName, summon) {
    dispatch({type: ADD_SUMMON, playerName, summon});
}

export function removeSummonAction(dispatch, playerName, name) {
    dispatch({type: REMOVE_SUMMON, playerName, name});
}

export function toggleStatusEffectAction(dispatch, playerName, name, statusEffect) {
    dispatch({type: TOGGLE_STATUS_EFFECT, playerName, name, statusEffect});
}

export function setHPAction(dispatch, playerName, name, hp) {
    dispatch({type: SET_HP, playerName, name, hp});
}

export function nextSummonName(state, playerName) {
    const summons = state[playerName];
    return `${playerName} summon #${summons ? Object.keys(summons).length + 1 : 1}`
}

export const selectors = {
    nextSummonName: (state, name) => nextSummonName(state.summons, name),
};

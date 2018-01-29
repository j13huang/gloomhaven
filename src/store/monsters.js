import {STATUS_EFFECTS, newStatusEffectTracker} from "../lib/statusEffects";
import {MONSTERS} from "../lib/monsters";
import {RESET_MONSTERS, ADD_MONSTERS, REMOVE_MONSTER} from "./actions/monsters";

function newMonster(name, level, alive, elite) {
    const monsterStats = MONSTERS[name].stats[level];
    const stats = elite ? monsterStats.elite : monsterStats.normal;
    return {
        alive: alive,
        elite: elite,
        maxHP: stats.maxHP,
        currentHP: stats.maxHP,
        statusEffects: newStatusEffectTracker(),
    }
}

function newMonsters(name, level) {
    const monster = MONSTERS[name];
    return {
        monsters: new Array(monster.tokenCount).fill(newMonster(name, level, false, false))
  };
}

function getAllStatusEffects(monsters) {
    const aliveMonsters = monsters.filter((m) => m.alive);
    return STATUS_EFFECTS.reduce((acc, s) => {
        if (aliveMonsters.length === 0 ) {
            acc[s] = false;
            return acc;
        }
        acc[s] = true;
        aliveMonsters.forEach((m) => {
            acc[s] = acc[s] && m.statusEffects[s];
        });
        return acc;
    }, {});
};

const defaultState = {};

const TOGGLE_ELITE = "monsters/toggleElite";
const TOGGLE_ALIVE = "monsters/toggleAlive";
const TOGGLE_ALL_STATUS_EFFECTS = "monsters/statusEffect/setAll";
const TOGGLE_STATUS_EFFECT = "monsters/statusEffect/toggle";
const SET_HP = "monsters/hp/set";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case RESET_MONSTERS: return defaultState;
        case ADD_MONSTERS:
        {
            return {
                ...state,
                ...action.monsters.reduce((acc, name) => {
                    acc[name] = newMonsters(name, action.level, action.numPlayers);
                    return acc;
                }, {}),
            };
        }
        case REMOVE_MONSTER:
        {
            const newState = {...state};
            delete newState[action.name];
            return newState;
        }
        case TOGGLE_ELITE:
        {
            const monsters = state[action.name].monsters;
            const monster = monsters[action.index];
            return {
                ...state,
                [action.name]: {
                    monsters: [
                        ...monsters.slice(0, action.index),
                        newMonster(
                            action.name,
                            action.level,
                            monster.alive,
                            !monster.elite,
                        ),
                        ...monsters.slice(action.index + 1),
                    ],
                },
            };
        }
        case TOGGLE_ALIVE:
        {
            const monsters = state[action.name].monsters;
            const monster = monsters[action.index];
            return {
                ...state,
                [action.name]: {
                    monsters: [
                        ...monsters.slice(0, action.index),
                        newMonster(
                            action.name,
                            action.level,
                            !monster.alive,
                            monster.elite,
                        ),
                        ...monsters.slice(action.index + 1),
                    ],
                },
            };
        }
        case TOGGLE_ALL_STATUS_EFFECTS:
        {
            const monsters = state[action.name].monsters;
            const allStatusEffects = getAllStatusEffects(monsters);
            return {
                ...state,
                [action.name]: {
                    monsters: monsters.map((m) => {
                        if (!m.alive) {
                          return m;
                        }
                        return {
                            ...m,
                            statusEffects: {
                                ...m.statusEffects,
                                [action.statusEffect]: !allStatusEffects[action.statusEffect],
                            },
                        };
                    })
                },
            };
        }
        case TOGGLE_STATUS_EFFECT:
        {
            const monsters = state[action.name].monsters;
            const monster = monsters[action.index];
            return {
                ...state,
                [action.name]: {
                    monsters: [
                        ...monsters.slice(0, action.index),
                        {
                            ...monster,
                            statusEffects: {
                                ...monster.statusEffects,
                                [action.statusEffect]: !monster.statusEffects[action.statusEffect],
                            },
                        },
                        ...monsters.slice(action.index + 1),
                    ],
                },
            };
        }
        case SET_HP:
        {
            const monsters = state[action.name].monsters;
            const monster = monsters[action.index];
            return {
                ...state,
                [action.name]: {
                    monsters: [
                        ...monsters.slice(0, action.index),
                        {
                            ...monster,
                            currentHP: action.hp,
                        },
                        ...monsters.slice(action.index + 1),
                    ],
                },
            };
        }
        default: return state;
    }
}

export function toggleAliveAction(dispatch, name, index, level) {
    dispatch({type: TOGGLE_ALIVE, name, index, level});
}

export function toggleEliteAction(dispatch, name, index, level) {
    dispatch({type: TOGGLE_ELITE, name, index, level});
}

export function toggleAllStatusEffectsAction(dispatch, name, statusEffect) {
    dispatch({type: TOGGLE_ALL_STATUS_EFFECTS, name, statusEffect});
}

export function toggleStatusEffectAction(dispatch, name, index, statusEffect) {
    dispatch({type: TOGGLE_STATUS_EFFECT, name, index, statusEffect});
}

export function setHPAction(dispatch, name, index, hp) {
    dispatch({type: SET_HP, name, index, hp});
}

export const selectors = {
    // status effects across all monsters
    allStatusEffects: (state, name) => getAllStatusEffects(state.monsters[name].monsters),
    isActive: (state, name) => state.monsters[name].monsters.some((m) => m.alive),
    hasMonstersInPlay: (state) => state.boss || Object.keys(state.monsters).length > 0,
};

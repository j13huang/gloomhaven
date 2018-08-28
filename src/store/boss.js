import {STATUS_EFFECTS} from "../lib/statusEffects";
import {BOSS_STATS} from "../lib/monsters";
import {LOAD_PARTY} from "./actions/party";
import {SET_BOSS, REMOVE_BOSS} from "./actions/boss";
import {RESET_MONSTERS} from "./actions/monsters";

function newBoss(name, level, numPlayers) {
    const stats = BOSS_STATS[name][level](numPlayers);
    return {
        name,
        maxHP: stats.maxHP,
        currentHP: stats.maxHP,
        statusEffects: STATUS_EFFECTS.reduce((acc, s) => {
            acc[s] = false;
            return acc;
        }, {}),
    };
}

const defaultState = null;

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_PARTY:
        {
            return defaultState;
        }
        case RESET_MONSTERS:
        {
            return defaultState;
        }
        case SET_BOSS:
        {
            if (action.name === "Inox Bodyguard") {
                return [
                    newBoss(action.name, action.level, action.numPlayers),
                    newBoss(action.name, action.level, action.numPlayers),
                ];
            }
            return [
                newBoss(action.name, action.level, action.numPlayers),
            ];
        }
        case REMOVE_BOSS:
        {
            return defaultState;
        }
        default: return state;
    }
}

export const selectors = {
};

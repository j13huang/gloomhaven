import {END_TURN} from "./actions/turn";

const defaultState = 1;

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case END_TURN:
        {
            return state + 1;
        }
        default: return state
    }
}


import {ELEMENTS, INERT, WANING, STRONG} from "../lib/elements";
import {END_TURN} from "./actions/turn";

const defaultState = ELEMENTS.reduce((acc, e) => {acc[e] = INERT; return acc;}, {});

const SET_STATUS = "elements/status/set";

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_STATUS:
        {
            return {
                ...state,
                [action.element]: action.status,
            };
        }
        case END_TURN:
        {
            return Object.keys(state).reduce((acc, e) => {
                const status = state[e];
                acc[e] = {[STRONG]: WANING, [WANING]: INERT, [INERT]: INERT}[status];
                return acc;
            }, {});
        }
        default: return state
    }
}

export function setStatusAction(dispatch, element, status) {
    dispatch({type: SET_STATUS, element, status});
}

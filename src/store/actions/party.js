export const LOAD_PARTY = "party/load";

export function loadPartyAction(dispatch, party) {
    dispatch({type: LOAD_PARTY, party});
}

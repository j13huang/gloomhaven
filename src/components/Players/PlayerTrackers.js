import React from "react";
import {connect} from "react-redux";

import {PlayerTracker} from "./PlayerTracker";
import {AddPlayer} from "./AddPlayer";
import {selectors as monstersSelectors} from "../../store/monsters";
import {selectors as playersSelectors} from "../../store/players";

import "./PlayerTrackers.css";

function PlayerTrackersComponent({playerNames, hasMonstersInPlay, selectableClasses}) {
    return (<div className="PlayerTrackers">
        {playerNames.map((p) => {
            return (<PlayerTracker key={p} name={p} />)
        })}
        {/* use key to force re-render on new player */}
        {!hasMonstersInPlay && selectableClasses.length > 0 &&
            <AddPlayer
                key={playerNames.length}
                initialPlayerNumber={playerNames.length + 1}
            />
        }
    </div>);
}

export const PlayerTrackers = connect(
    (state) => {
        return {
            playerNames: Object.keys(state.players.players),
            hasMonstersInPlay: monstersSelectors.hasMonstersInPlay(state),
            selectableClasses: playersSelectors.selectableClasses(state),
        };
    }
)(PlayerTrackersComponent);

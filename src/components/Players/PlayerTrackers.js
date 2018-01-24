import React from "react";
import {connect} from "react-redux";

import {PlayerTracker} from "./PlayerTracker";

import "./PlayerTrackers.css";

function PlayerTrackersComponent({playerNames}) {
    return (<div className="PlayerTrackers">
      {playerNames.map((p) => {
        return (<PlayerTracker key={p} name={p} />)
      })}
    </div>);
}

export const PlayerTrackers = connect(
    (state) => {
        return {
            playerNames: Object.keys(state.players.players),
        };
    }
)(PlayerTrackersComponent);

import React from "react";
import {connect} from "react-redux";

import {SummonTracker} from "./SummonTracker";

import "./SummonTrackers.css";

class SummonTrackersComponent extends React.Component {
    render() {
        if (!this.props.summons) {
            return null;
        }
        return (<div>
            {Object.entries(this.props.summons).map(([name, s]) => <SummonTracker key={name} playerName={this.props.name} name={name} />)}
        </div>);
    }
}

export const SummonTrackers = connect(
    (state, ownProps) => {
        return {
            summons: state.summons[ownProps.name],
        };
    },
)(SummonTrackersComponent);
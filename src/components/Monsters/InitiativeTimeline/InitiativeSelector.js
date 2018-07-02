import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import { toggleIntiativeAction } from "../../../store/players";

import "./InitiativeSelector.css";

class InitiativeSelectorComponent extends React.Component {
    render() {
        const {players, playerInitiativeNames, togglePlayerInitiative} = this.props;
        return (<div className="InitiativeSelector--container">
            <div className="InitiativeSelector--players">
                {Object.keys(players).map((p) =>
                    <div key={p}
                        className={classNames(
                            "InitiativeSelector--player",
                            playerInitiativeNames.includes(p) && "InitiativeSelector--player--selected",
                        )}
                        onClick={() => togglePlayerInitiative(p)}
                    >
                        {p}
                    </div>
                )}
            </div>
            <div className="InitiativeSelector--arrows">
                <div className="InitiativeSelector--arrowBorder"></div>
                <div className="InitiativeSelector--arrow"></div>
            </div>
        </div>);
    }
}

export const InitiativeSelector = connect(
    (state, ownProps) => {
        return {
            players: state.players.players,
        };
    },
    (dispatch, ownProps) => {
        return {
            togglePlayerInitiative: (playerName) => {toggleIntiativeAction(dispatch, playerName, ownProps.initiative)},
        };
    },
)(InitiativeSelectorComponent);


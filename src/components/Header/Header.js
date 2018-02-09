import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {ElementTracker} from "../ElementTracker/ElementTracker"
import {endTurnAction} from "../../store/actions/turn";
import { selectors as monstersSelectors } from "../../store/monsterDecks";

import "./Header.css";

function HeaderComponent({turn, endTurnReady, endTurn}) {
    return (<div>
        <div className="Header">
            <div className="Header--Content">
                <ElementTracker className="Header--Content--Section"/>
                {/*<div className={classNames("Header--Content--Section", "Header--TurnTracker")}>Turn {turn}</div>*/}
                <button
                    className={classNames({
                        "Header--EndTurnButton": true,
                        "Header--EndTurnButton--Ready": endTurnReady,
                    })}
                    disabled={!endTurnReady}
                    onClick={() => endTurn()}
                >
                    <div>End Turn</div>
                    <div>(Turn {turn})</div>
                </button>
            </div>
        </div>
        <div className="Header--HeightOffset"></div>
    </div>);
}

export const Header = connect(
    (state) => {
        return {
            endTurnReady: monstersSelectors.hasActiveCards(state),
            turn: state.turn,
        };
    },
    (dispatch) => ({
        endTurn: () => endTurnAction(dispatch),
    }),
)(HeaderComponent);

import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {ElementTracker} from "../ElementTracker/ElementTracker"
import {EndTurnButton} from "./EndTurnButton"
import {endTurnAction} from "../../store/actions/turn";
import { selectors as monstersSelectors } from "../../store/monsterDecks";

import "./Header.css";

function HeaderComponent({turn, endTurnReady, endTurn}) {
    return (<div>
        <div className="Header">
            <div className="Header--Content">
                <ElementTracker className="Header--Content--Section"/>
                <EndTurnButton
                    className={classNames({
                        "Header--EndTurnButton": true,
                        "Header--EndTurnButton--Ready": endTurnReady,
                    })}
                    turn={turn}
                    endTurnReady={endTurnReady}
                    endTurn={() => endTurn()}
                />
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

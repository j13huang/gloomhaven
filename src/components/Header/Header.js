import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {ElementTracker} from "../ElementTracker/ElementTracker"
import {endTurnAction} from "../../store/turn";
import { selectors as monstersSelectors } from "../../store/monsters";

import "./Header.css";

 class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: 1,
        };
    }

    endTurn() {
        this.setState({turn: this.state.turn + 1});
        this.props.endTurn();
    }

    render() {
        return (<div>
            <div className="Header">
                <div className="Header--Content">
                    <ElementTracker className="Header--Content--Section"/>
                    <div className={classNames("Header--Content--Section", "Header--TurnTracker")}>Turn {this.state.turn}</div>
                    <button
                        className={classNames({
                            "Header--EndTurnButton": true,
                            "Header--EndTurnButton--Ready": this.props.endTurnReady,
                        })}
                        disabled={!this.props.endTurnReady}
                        onClick={() => this.endTurn()}
                    >
                        End Turn
                    </button>
                </div>
            </div>
            <div className="Header--HeightOffset"></div>
        </div>);
    }
}

export const Header = connect(
    (state) => {
        return {
            endTurnReady: monstersSelectors.hasActiveCards(state),
        };
    },
    (dispatch) => ({
        endTurn: () => dispatch(endTurnAction()),
    }),
)(HeaderComponent);

import React from "react";
import {connect} from "react-redux";

import {ElementTracker} from "../ElementTracker/ElementTracker"
import {endTurnAction} from "../../reducers/turn";

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
                    <ElementTracker />
                    <div className="Header--TurnTracker">Turn {this.state.turn}</div>
                    <button className="Header--EndTurn" onClick={() => this.endTurn()}>End Turn</button>
                </div>
            </div>
            <div className="Header--HeightOffset"></div>
        </div>);
    }
}

export const Header = connect(
    () => ({}),
    (dispatch) => ({
        endTurn: () => dispatch(endTurnAction()),
    }),
)(HeaderComponent);

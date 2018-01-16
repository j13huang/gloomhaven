import React from "react";
import {connect} from "react-redux";

import {ElementTracker} from "../ElementTracker/ElementTracker"
import {TurnTracker} from "./TurnTracker"
import {END_TURN} from "../../reducers";

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
            <div className="Game--Header">
                <div className="Game--Header--Content">
                    <ElementTracker />
                    <TurnTracker turn={this.state.turn} />
                    <button className="Game--Header--EndTurn" onClick={() => this.endTurn()}>End Turn</button>
                </div>
            </div>
            <div className="Game--Header--HeightOffset"></div>
        </div>);
    }
}

export const Header = connect(
    () => ({}),
    (dispatch) => ({
        endTurn: () => dispatch({type: END_TURN}),
    }),
)(HeaderComponent);

import React from "react";

import "./TurnTracker.css";

export class TurnTracker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            turn: 1,
        };
    }

    render() {
        return (<div className="TurnTracker">
            Turn {this.state.turn}
        </div>);
    }
}
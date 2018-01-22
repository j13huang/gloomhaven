import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {BonusSelectors} from "../Bonuses";
import {StatusEffectTracker} from "../StatusEffectTracker";
import {HPTracker} from "../HPTracker";

//import "./PlayerTracker.css";

class PlayerTrackerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xp: 0,
            level: 1,
        };
    }

    setXP(xp) {
        this.setState({
            xp,
        })
    }

    render() {
        const levelSelectID = `Player-${this.props.name}-LevelSelect`;
        return (<div className="PlayerTracker">
            <div>
                <label className="" htmlFor={levelSelectID}>Level: </label>
                <select id={levelSelectID} disabled={this.props.monsters.length > 0} value={this.props.level} onChange={(event) => this.props.selectLevel(event.target.value)}>
                    {new Array(9).fill().map((_, i) => {
                        const level = i + 1;
                        return (<option key={level} value={level}>{level}</option>);
                    })}
                </select>
            </div>
            <div className="PlayerTracker--XP">
                XP:
                <button onClick={() => this.setXP(this.state.xp - 1)}>-</button>
                {this.state.xp}
                <button onClick={() => this.setXP(this.state.xp + 1)}>+</button>
            </div>
            <StatusEffectTracker />
            {/* unique key on level so that when the level changes the hp gets rerendered */}
            <BonusSelectors />
            <HPTracker key={this.state.level} maxHP={20} />
        </div>);
    }
}

export const PlayerTracker = connect(
    (state) => {
        return {
            monsters: Object.keys(state.monsters),
        };
    },
    (dispatch) => {
        return {
            selectLevel: () => {}, //dispatch(),
        };
    },
)(PlayerTrackerComponent);

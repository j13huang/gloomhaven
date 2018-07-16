import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {addPlayerAction} from "../../store/actions/players";
import {selectors as playersSelectors} from "../../store/players";

import "./AddPlayer.css";

class AddPlayerComponent extends React.Component {
    constructor(props) {
        super(props);

        const initialPlayerName = `Player ${props.initialPlayerNumber}`;
        this.state = {
            selectedClass: props.selectableClasses[0],
            level: 1,
            playerNameInput: initialPlayerName,
            duplicateNameWarning: props.playerNames.includes(initialPlayerName),
        };
    }

    playerNameInputChange(input) {
        this.setState({
            playerNameInput: input,
            duplicateNameWarning: this.props.playerNames.includes(input),
        });
    }

    selectClass(selectedClass) {
        this.setState({
            selectedClass,
        });
    }

    selectLevel(level) {
        this.setState({
            level,
        });
    }

    addPlayer(name, characterClass, level) {
        if (this.state.duplicateNameWarning) {
            return;
        }
        this.props.addPlayer(name, characterClass, level);
    }

    render() {
        return (<div className="AddPlayer--container">
            <input
                className={"AddPlayer--playerName"}
                placeholder="Name"
                // || this.props.playerNames.length === 4}
                value={this.state.playerNameInput}
                onChange={(e) => this.playerNameInputChange(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        this.addPlayer(this.state.playerNameInput, this.state.selectedClass, this.state.level);
                    }
                }}
            />
            {this.state.duplicateNameWarning &&
                <div className="AddPlayer--duplicateNameWarning">A player with that name already exists</div>}
            <div className={classNames("AddPlayer--section", "AddPlayer--selectors")}>
                <div className="AddPlayer--selector">
                    Class:
                    <select
                        size="5"
                        value={this.state.selectedClass}
                        onChange={(event) => this.selectClass(event.target.value)}
                    >
                        {this.props.selectableClasses.map((c) => <option value={c} key={c}>{c}</option>)}
                    </select>
                </div>
                <div className="AddPlayer--selector">
                    Level:
                    <select
                        size="5"
                        value={this.state.level}
                        onChange={(event) => this.selectLevel(event.target.value)}
                    >
                        {new Array(9).fill().map((_, i) => {
                            const level = i + 1;
                            return (<option key={level} value={level}>{level}</option>);
                        })}
                    </select>
                </div>
            </div>
            <button
                className={classNames("AddPlayer--section", "AddPlayer--button", this.state.duplicateNameWarning && "AddPlayer--button--disabled")}
                disabled={this.state.duplicateNameWarning}
                onClick={() => this.addPlayer(this.state.playerNameInput, this.state.selectedClass, this.state.level)}
            >Add Player</button>
        </div>);
    }
}

export const AddPlayer = connect(
    (state, ownProps) => {
        return {
            players: state.players.players,
            playerNames: Object.keys(state.players.players),
            selectableClasses: playersSelectors.selectableClasses(state),
        };
    },
    (dispatch, ownProps) => {
        return {
            addPlayer: (name, characterClass, level) => addPlayerAction(dispatch, name, characterClass, parseInt(level, 10)),
        };
    },
)(AddPlayerComponent);


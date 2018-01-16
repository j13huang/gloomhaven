import React from 'react';
import {connect} from "react-redux";

import {Header} from "./Header/Header"
import {Deck as AttackModifierDeck} from "./AttackModifiers/Deck"
import {Monsters} from "./Monsters/Monsters"
import {CLASSES} from "../lib/classes";
import {
    addDeckAction,
    resetPlayersAction,
    selectors as attackModifierCardsSelectors,
} from "../reducers/attackModifierCards";

import "./Game.css";

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            selectableClasses: CLASSES,
            selectedClass: "",
        };
    }

    selectClass(selectedClass) {
        this.setState({
            selectedClass,
        });
    }

    canAddPlayer() {
        // 4 + monsters players
        return this.state.selectedClass && this.props.players.length < 5 && this.state.playerNameInput !== "";
    }

    addPlayer(name, selectedClass) {
        if (!this.canAddPlayer()) {
            return;
        }
        this.setState({
            playerNameInput: "",
            selectedClass: "",
            selectableClasses: this.state.selectableClasses.filter((c) => c !== selectedClass),
        });
        this.props.addPlayer(name, selectedClass);
    }

    resetPlayers() {
        this.setState({
            selectableClasses: CLASSES,
        });
        this.props.resetPlayers();
    }

    render() {
        return (
            <div>
                <Header />
                <div className="Game--Section">
                    <h3>Attack Modifier Cards</h3>
                    <div>Total Curse cards: {this.props.totalCurses}</div>
                    <div>Total Blessing cards: {this.props.totalBlessings}</div>
                    <div className="Game--Players">
                        <input
                            value={this.state.playerNameInput}
                            onChange={(e) => this.setState({playerNameInput: e.target.value})}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    this.addPlayer(this.state.playerNameInput, this.state.selectedClass);
                                }
                            }}
                        />
                        <select value={this.state.selectedClass} onChange={(event) => this.selectClass(event.target.value)}>
                            <option value="">Select a class...</option>
                            {this.state.selectableClasses.map((c) => <option value={c} key={c}>{c}</option>)}
                        </select>
                        <button
                            disabled={!this.canAddPlayer()}
                            onClick={() => this.addPlayer(this.state.playerNameInput, this.state.selectedClass)}
                        >Add Player</button>
                        <button onClick={() => this.resetPlayers()}>Reset</button>
                    </div>
                    <div className="Game--AttackModifierDecks">
                        {this.props.players.map((name, i) => {
                            return <AttackModifierDeck key={i} name={name} />
                        })}
                    </div>
                </div>
                <div className="Game--Section">
                    <h3>Monsters</h3>
                    <Monsters numPlayers={this.props.players.length}/>
                </div>
            </div>
        );
    }
}

export const Game = connect(
    (state, ownProps) => {
        return {
            players: Object.keys(state.attackModifierCards),
            totalCurses: attackModifierCardsSelectors.totalCurses(state.attackModifierCards),
            totalBlessings: attackModifierCardsSelectors.totalBlessings(state.attackModifierCards),
        };
    },
    (dispatch, ownProps) => ({
        addPlayer: (name, characterClass) => dispatch(addDeckAction(name, characterClass)),
        resetPlayers: (card) => dispatch(resetPlayersAction()),
    }),
)(GameComponent);

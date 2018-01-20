import React from 'react';
import {connect} from "react-redux";

import {Header} from "./Header/Header"
import {Deck as AttackModifierDeck} from "./AttackModifiers/Deck"
import curseCard from "./AttackModifiers/curse_card.jpg";
import blessCard from "./AttackModifiers/bless_card.jpg";
import {MonsterCards} from "./Monsters/MonsterCards"
import {MonsterTrackers} from "./Monsters/MonsterTrackers"
import {CLASSES} from "../lib/classes";
import {
    addDeckAction,
    resetDecksAction,
    selectors as attackModifierCardsSelectors,
} from "../store/attackModifierCards";

import "./Game.css";

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            selectableClasses: CLASSES,
            selectedClass: "",
            selectedLevel: 1,
            duplicateNameWarning: false,
        };
    }

    playerNameInputChange(input) {
        this.setState({
            playerNameInput: input,
            duplicateNameWarning: this.props.players.includes(input),
        });
    }

    selectClass(selectedClass) {
        this.setState({
            selectedClass,
        });
    }

    selectLevel(level) {
        this.setState({
            selectedLevel: level,
        });
    }

    canAddPlayer() {
        // monsters + 4 players
        return this.state.selectedClass &&
            this.props.players.length < 5 &&
            this.state.playerNameInput !== "" &&
            !this.state.duplicateNameWarning;
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
                    <div className="Game--SpecialCardCount--Container">
                        Player card count: 
                        <div className="Game--SpecialCardCount">
                            <img className="Game--SpecialCardCount--Icon" src={curseCard} alt="curse cards"/>
                            <div>{`(${this.props.totalCurses})`}</div>
                        </div>
                        <div className="Game--SpecialCardCount">
                            <img className="Game--SpecialCardCount--Icon" src={blessCard} alt="blessing cards"/>
                            <div>{`(${this.props.totalBlessings})`}</div>
                        </div>
                    </div>
                    <div className="Game--Players">
                        <input
                            value={this.state.playerNameInput}
                            onChange={(e) => this.playerNameInputChange(e.target.value)}
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
                    {this.state.duplicateNameWarning &&
                        <div className="Game--DuplicatePlayerWarning">A player with that name already exists</div>}
                    <div className="Game--AttackModifierDecks">
                        {this.props.players.map((name) => {
                            return <AttackModifierDeck key={name} name={name} />
                        })}
                    </div>
                </div>
                <div className="Game--Section">
                    <MonsterCards selectedLevel={this.state.selectedLevel} onSelectLevel={(level) => this.selectLevel(level)} />
                </div>
                <div className="Game--Section">
                    <MonsterTrackers level={this.state.selectedLevel} />
                </div>
            </div>
        );
    }
}

export const Game = connect(
    (state, ownProps) => {
        return {
            players: Object.keys(state.attackModifierCards),
            totalCurses: attackModifierCardsSelectors.totalCurses(state),
            totalBlessings: attackModifierCardsSelectors.totalBlessings(state),
        };
    },
    (dispatch, ownProps) => ({
        addPlayer: (name, characterClass) => dispatch(addDeckAction(name, characterClass)),
        resetPlayers: (card) => dispatch(resetDecksAction()),
    }),
)(GameComponent);

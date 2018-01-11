import React from 'react';
import {Deck as AttackModifierDeck} from "./AttackModifiers/Deck"
import {Monsters} from "./Monsters/Monsters"

import {CLASSES} from "../lib/classes";
import "./Game.css";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            selectableClasses: CLASSES,
            selectedClass: "",
            players: [],
        };
    }

    selectClass(selectedClass) {
        this.setState({
            selectedClass,
        });
    }

    canAddPlayer() {
        return this.state.selectedClass && this.state.players.length < 4 && this.state.playerNameInput !== "";
    }

    addPlayer(name, selectedClass) {
        if (!this.canAddPlayer()) {
            return;
        }
        this.setState({
            playerNameInput: "",
            selectedClass: "",
            selectableClasses: this.state.selectableClasses.filter((c) => c !== selectedClass),
            players: this.state.players.concat({name, class: selectedClass}),
        });
    }

    resetPlayers() {
        this.setState({
            selectableClasses: CLASSES,
            players: [],
        });
    }

    render() {
        return (
            <div>
                <div className="Game--Controls">
                    <h3>Attack Modifier Cards</h3>
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
                        {[{class: "Monsters", name: ""}].concat(this.state.players).map((p, i) => {
                            return <AttackModifierDeck
                                class={p.class}
                                name={p.name}
                                key={i}
                            />
                        })}
                    </div>
                </div>
                <div className="Game--Controls">
                    <h3>Monster Ability Cards</h3>
                    <Monsters />
                </div>
            </div>
        );
    }
}
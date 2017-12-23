import React from 'react';
import {Deck as AttackModifierDeck} from "./AttackModifiers/Deck"
import {Monsters} from "./Monsters/Monsters"

import "./Game.css";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            players: [],
        };
    }

    canAddPlayer() {
        return this.state.players.length < 4 && this.state.playerNameInput !== "";
    }

    addPlayer(name) {
        if (!this.canAddPlayer()) {
            return;
        }
        this.setState({
            playerNameInput: "",
            players: this.state.players.concat(name),
        });
    }

    resetPlayers() {
        this.setState({players: []})
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
                                this.addPlayer(this.state.playerNameInput);
                                }
                            }}
                        />
                        <button
                            disabled={!this.canAddPlayer()}
                            onClick={() => this.addPlayer(this.state.playerNameInput)}
                        >Add Player</button>
                        <button onClick={() => this.resetPlayers()}>Reset</button>
                    </div>
                    <div className="Game--AttackModifierDecks">
                        {["Monsters"].concat(this.state.players).map((name, i) => {
                            return <AttackModifierDeck
                                name={name}
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
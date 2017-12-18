import React from 'react';
import {Deck as AttackModifierDeck} from "./AttackModifiers/Deck"

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

    render() {
        return (
            <div>
                <div className="GameBar">
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
                </div>
                <div className="AttackModifierCards">
                    {["Monsters"].concat(this.state.players).map((name, i) => {
                        return <AttackModifierDeck owner={name} key={i} />
                    })}
                </div>
                <div className="RoundControls">
                    <button>End Round</button>
                </div>
            </div>
        );
    }
}
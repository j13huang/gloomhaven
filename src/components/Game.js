import React from 'react';
import {Deck as AttackModifierDeck} from "./AttackModifiers/Deck"
import { Deck as MonsterAbilityDeck} from "./Monsters/Deck"
import {List as MonsterList} from "./Monsters/List"

import "./Game.css";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            players: [],
            monsters: [],
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

    addMonsters(monsters) {
        this.setState({monsters: this.state.monsters.concat(monsters)});
    }

    resetMonsters() {
        this.setState({monsters: []})
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
                    <div className="Game--AttackModifierCards">
                        {["Monsters"].concat(this.state.players).map((name, i) => {
                            return <AttackModifierDeck owner={name} key={i} />
                        })}
                    </div>
                </div>
                <div className="Game--Controls">
                    <h3>Monster Ability Cards</h3>
                    <div className="Game--Monsters--Main">
                        <div className="Game--Monsters">
                            <MonsterList onAddMonsters={(monsters) => this.addMonsters(monsters)} selectedMonsters={this.state.monsters} />
                            <button onClick={() => this.resetPlayers()}>Reset</button>
                        </div>
                        <div className="Game--MonsterAbilityCards">
                            {this.state.monsters.map((name, i) => {
                                return <MonsterAbilityDeck name={name} key={i} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
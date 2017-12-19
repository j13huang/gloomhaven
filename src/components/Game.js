import React from 'react';
import {Deck} from "./Deck/Deck"
import {MonsterAbilityCard, cardBack as monsterCardBack} from "./Deck/MonsterAbilityCard"
import {AttackModifierCard, cardBack as attackModifierCardBack} from "./Deck/AttackModifierCard"
import {List as MonsterList} from "./Monsters/List"

import * as cardData from "./Deck/cardData"
import "./Game.css";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            players: [],
            monsters: ["Innox Shaman"],
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
                            return <Deck
                                name={name}
                                key={i}
                                initialData={cardData.ATTACK_MODIFIER_DECK}
                                CardComponent={AttackModifierCard}
                                cardBack={attackModifierCardBack}
                                extraButtons={[{card: cardData.CURSE, name: "Curse"}, {card: cardData.BLESSING, name: "Blessing"}]}
                            />
                        })}
                    </div>
                </div>
                <div className="Game--Controls">
                    <h3>Monster Ability Cards</h3>
                    <div className="Game--Monsters--Main">
                        <div className="Game--Monsters">
                            <MonsterList
                                onAddMonsters={(monsters) => this.addMonsters(monsters)}
                                selectedMonsters={this.state.monsters} 
                                monsterList={cardData.MONSTER_LIST}
                                onReset={() => this.resetMonsters()}
                            />
                        </div>
                        <div className="Game--MonsterAbilityCards">
                            {this.state.monsters.map((name, i) => {
                                //return <MonsterAbilityDeck name={name} key={i} />
                                return <Deck
                                    name={name}
                                    key={i}
                                    initialData={cardData.MONSTER_DECK[name]}
                                    CardComponent={MonsterAbilityCard}
                                    cardBack={monsterCardBack}
                                    autoShuffle
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
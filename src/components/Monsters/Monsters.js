import React from 'react';

import {List} from "./List";
import {Deck} from "./Deck";
import {BossMonsterTracker, MonsterTracker} from "./MonsterTracker";
import {MONSTERS, MONSTER_LIST, END_ACTIONS} from "../../lib/gameData";
import {shuffleCards, newDeck} from "../../lib/deck";

import "./Monsters.css";

export class Monsters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLevel: 1,
            monsters: {},
        };
    }

    selectLevel(level) {
        this.setState({
            selectedLevel: level,
        });
    }

    addMonsters(monsters) {
        const newMonsters = {...this.state.monsters};
        monsters.forEach((name) => { newMonsters[name] = newDeck(MONSTERS[name].cards)})
        this.setState({
            monsters: newMonsters,
        });
    }

    removeMonster(monster) {
        const newMonsters = {...this.state.monsters};
        delete newMonsters[monster];
        this.setState({
            monsters: newMonsters,
        });
    }

    resetMonsters() {
        this.setState({monsters: {}})
    }

    revealNextCards(deckNames) {
        const newMonsters = {...this.state.monsters};
        deckNames.forEach((name) => {
            const {cards, currentIndex, playedCards} = this.state.monsters[name];
            let nextCards = cards;
            let nextIndex = currentIndex + 1;
            const currentCard = playedCards[0];
            if ((currentCard && currentCard.endAction === END_ACTIONS.RESHUFFLE) ||
                (nextIndex >= cards.length)) {
                nextCards = shuffleCards(cards);
                nextIndex = 0;
            }
            const nextCard = nextCards[nextIndex];
            newMonsters[name] = {
                cards: nextCards,
                currentIndex: nextIndex,
                playedCards: [nextCard].concat(playedCards),
            };
        });
        this.setState({
            monsters: newMonsters,
        });
    }

    cleanupPlayedCards(deckNames) {
        const newMonsters = {...this.state.monsters};
        deckNames.forEach((name) => {
            const {cards} = this.state.monsters[name];
            newMonsters[name] = {
                cards: shuffleCards(cards),
                currentIndex: -1,
                playedCards: [],
            };
        });

        this.setState({
            monsters: newMonsters,
        });
    }

    render() {
        const {monsters} = this.state;
        const levelSelectID = "Monsters-LevelSelect";
        return (
            <div className="Monsters">
                <div className="Monsters--List--Container">
                    <div>
                        <label htmlFor={levelSelectID}>Level: </label>
                        <select id={levelSelectID} disabled={Object.keys(this.state.monsters).length > 0} value={this.state.selectedLevel} onChange={(event) => this.selectLevel(event.target.value)}>
                            {new Array(10).fill().map((_, i) => {
                                const level = i + 1;
                                return (<option key={level} value={level}>{level}</option>);
                            })}
                        </select>
                    </div>
                    <List
                        onAddMonsters={(monsters) => this.addMonsters(monsters)}
                        monstersInPlay={Object.keys(monsters)} 
                        monsterList={MONSTER_LIST}
                        onReset={() => this.resetMonsters()}
                    />
                    <button onClick={() => this.revealNextCards(Object.keys(monsters))}>Flip all</button>
                    <button onClick={() => this.cleanupPlayedCards(Object.keys(monsters))}>Clear all</button>
                </div>
                {Object.keys(monsters).map((name, i) => {
                    const isBoss = name === "Boss";
                    return (<div key={i} className="Monsters--Monster">
                        <h5 className="Monsters--Monster--Name">{name}<button onClick={() => this.removeMonster(name)}>X</button></h5>
                        {isBoss ?
                            <BossMonsterTracker level={this.state.selectedLevel} numPlayers={this.props.numPlayers} /> :
                            <MonsterTracker name={name} level={this.state.selectedLevel} numPlayers={this.props.numPlayers} />
                        }
                        <Deck
                            name={name}
                            playedCards={this.state.monsters[name].playedCards || []}
                            revealNextCard={(name) => this.revealNextCards([name])}
                            cleanupPlayedCards={(name) => this.cleanupPlayedCards([name])}
                        />
                    </div>);
                })}
            </div>
        );
    }
}
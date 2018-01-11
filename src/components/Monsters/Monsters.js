import React from 'react';

import {List} from "./List";
import {Deck} from "./Deck";
import {MONSTER_DECKS, MONSTER_LIST} from "../../lib/cardData";
import {shuffleCards, newDeck} from "../../lib/deck";
import * as cardData from "../../lib/cardData";

import "./Monsters.css";

export class Monsters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            monsters: {},
        };
    }

    addMonsters(monsters) {
        const newMonsters = {...this.state.monsters};
        monsters.forEach((name) => { newMonsters[name] = newDeck(MONSTER_DECKS[name])})
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
            if ((currentCard && currentCard.endAction === cardData.END_ACTIONS.RESHUFFLE) ||
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
        return (
            <div className="Monsters">
                <div className="Monsters--List">
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
                    return <Deck
                        name={name}
                        key={i}
                        playedCards={this.state.monsters[name].playedCards || []}
                        revealNextCard={(name) => this.revealNextCards([name])}
                        cleanupPlayedCards={(name) => this.cleanupPlayedCards([name])}
                    />
                })}
            </div>
        );
    }
}
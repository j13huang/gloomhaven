import React from 'react';
import * as classNames from "classnames";

import {Card} from "./Card";
import cardBack from "./attack_modifier_card_back.jpg";
import * as cardData from "../../lib/cardData";
import {newDeck, shuffleCards} from "../../lib/deck";

import "./Deck.css";

function reshuffleCards(cards, currentIndex) {
    // remove played discards
    const filteredCards = cards.filter((c, i) => !((c.endAction === cardData.END_ACTIONS.DISCARD) && (i <= currentIndex)));
    return shuffleCards(filteredCards);
}

export class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...newDeck(cardData.ATTACK_MODIFIER_DECK),
            needsShuffle: false,
        };
    }

    // insert card into random spot of remaining deck
    addCard(card) {
        const {cards} = this.state;
        // in case of -1 index
        const currentIndex = Math.max(0, this.state.currentIndex);
        const randomIndex = (Math.random() * (cards.length - currentIndex)) + currentIndex;
        this.setState({
            cards: [
                ...cards.slice(0, randomIndex),
                card,
                ...cards.slice(randomIndex),
            ],
        });
    }

    revealNextCard() {
        const {currentIndex, playedCards, cards, needsShuffle} = this.state;
        let nextCards = cards;
        let nextIndex = currentIndex + 1;
        if (nextIndex >= cards.length) {
            nextCards = reshuffleCards(cards, currentIndex);
            nextIndex = 0;
        }

        const nextCard = nextCards[nextIndex];
        this.setState({
            cards: nextCards,
            currentIndex: nextIndex,
            playedCards: [nextCard].concat(playedCards),
            needsShuffle: needsShuffle || (nextCard.endAction === cardData.END_ACTIONS.RESHUFFLE),
        });
    }

    reshuffle() {
        const {cards, currentIndex} = this.state;

        this.setState({
            cards: reshuffleCards(cards, currentIndex),
            currentIndex: -1,
            playedCards: [],
            needsShuffle: false,
        });
    }

    render() {
        return (
            <div className={classNames({
                "Deck": true,
                "Deck--NeedsShuffle": this.state.needsShuffle,
            })}>
                <div>{this.props.name}</div>
                <div>
                    <button onClick={() => {this.addCard(cardData.CURSE)}}>Add Curse</button>
                    <button onClick={() => {this.addCard(cardData.BLESSING)}}>Add Blessing</button>
                </div>
                <div>
                    <img src={cardBack} className="Deck--CardBack" onClick={() => {this.revealNextCard()}} alt="card back" />
                </div>
                <button
                    className={classNames({
                        "Deck--Button": true,
                        "Deck--Button--NeedsShuffle": this.state.needsShuffle,
                    })}
                    onClick={() => {this.reshuffle()}}
                    disabled={!this.state.needsShuffle}
                >
                    Shuffle
                </button>
                <div className="Deck--PlayedCards">
                    {this.state.playedCards && this.state.playedCards.map((card, i) => {
                        return <Card
                            className={classNames({
                                "Deck--Card": true,
                                "Deck--Card--MostRecent": i === 0,
                                "Deck--Card--Reshuffle": card.endAction === cardData.END_ACTIONS.RESHUFFLE,
                                "Deck--Card--Discard": card.endAction === cardData.END_ACTIONS.DISCARD,
                            })}
                            key={i}
                            card={card}
                        />
                    })
                    }
                </div>
            </div>
        );
    }
}
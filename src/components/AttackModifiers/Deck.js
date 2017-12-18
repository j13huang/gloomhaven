import React from 'react';

import * as constants from "./constants";
import cardBack from "./card_back.jpg";
import {Card} from "./Card";

import './Deck.css';

export class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: constants.shuffleDeck(constants.BASE_DECK),
            currentIndex: -1,
            playedCards: [],
        };
    }

    // insert card into random spot of remaining deck
    addCard(card) {
        const {deck} = this.state;
        // in case of -1 index
        const currentIndex = Math.max(0, this.state.currentIndex);
        const randomIndex = (Math.random() * (deck.length - currentIndex)) + currentIndex;
        this.setState({
            deck: [
                ...deck.slice(0, randomIndex),
                card,
                ...deck.slice(randomIndex),
            ],
        });
    }

    revealNextCard() {
        const {currentIndex, playedCards, deck} = this.state;
        const newState = {
            deck,
            currentIndex: currentIndex + 1,
            playedCards,
        };
        const currentCard = playedCards[playedCards.length - 1];
        if ((currentCard && currentCard.action === constants.ACTIONS.RESHUFFLE) || (
            newState.currentIndex >= deck.length)) {
            // remove played discards
            const newDeck = deck.filter((c, i) => !((c.action === constants.ACTIONS.DISCARD) && (i <= currentIndex)));
            newState.deck = constants.shuffleDeck(newDeck);
            newState.currentIndex = 0;
        }
        this.setState({
            ...newState,
            playedCards: [newState.deck[newState.currentIndex]].concat(newState.playedCards),
        });
    }

    clearPlayedCards() {
        // don't clear from the most recent card if it's a reshuffle
        const firstReshuffleIndex = this.state.playedCards.findIndex((c, i) => (i > 0) && (c.action === constants.ACTIONS.RESHUFFLE));
        if (firstReshuffleIndex === -1) {
            return;
        }

        this.setState({
            playedCards: this.state.playedCards.filter((c, i) => i < firstReshuffleIndex),
        });
    }

    render() {
        return (
            <div className="Deck">
                <div>{this.props.owner}</div>
                <div>
                    <button onClick={() => {this.addCard(constants.CURSE)}}>Add Curse</button>
                    <button onClick={() => {this.addCard(constants.BLESS)}}>Add Blessing</button>
                </div>
                <div>
                    <img src={cardBack} className="Deck--CardBack" onClick={() => {this.revealNextCard()}} alt="card back" />
                </div>
                <button onClick={() => {this.clearPlayedCards()}}>Clear</button>
                <div className="Deck--PlayedCards">
                    {this.state.playedCards && this.state.playedCards.map((card, i) => {
                        return <Card card={card} mostRecent={i === 0} key={i} />
                    })
                    }
                </div>
            </div>
        );
    }
}
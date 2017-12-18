import React from 'react';

import * as constants from "./constants";
import cardBack from "./card_back.jpg";
import {Card} from "./Card";

import './Deck.css';

export class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: constants.shuffleDeck(constants.MONSTERS[props.name]),
            currentIndex: -1,
            playedCards: [],
        };
    }

    revealNextCard() {
        const {currentIndex, playedCards, deck} = this.state;
        const newState = {
            deck,
            currentIndex: currentIndex + 1,
            playedCards,
        };
        const currentCard = playedCards[playedCards.length - 1];
        if ((currentCard && currentCard.endAction === constants.END_ACTIONS.RESHUFFLE) || (
            newState.currentIndex >= deck.length)) {
            newState.deck = constants.shuffleDeck(deck);
            newState.currentIndex = 0;
        }
        this.setState({
            ...newState,
            playedCards: [newState.deck[newState.currentIndex]].concat(newState.playedCards),
        });
    }

    clearPlayedCards() {
        // don't clear from the most recent card if it's a reshuffle
        const firstReshuffleIndex = this.state.playedCards.findIndex((c, i) => (i > 0) && (c.endAction === constants.END_ACTIONS.RESHUFFLE));
        if (firstReshuffleIndex === -1) {
            return;
        }

        this.setState({
            playedCards: this.state.playedCards.filter((c, i) => i < firstReshuffleIndex),
        });
    }

    render() {
        return (
            <div className="Monsters--Deck">
                <div>{this.props.name}</div>
                <div>
                    <img src={cardBack} className="Monsters--Deck--CardBack" onClick={() => {this.revealNextCard()}} alt="card back" />
                </div>
                <button onClick={() => {this.clearPlayedCards()}}>Clear</button>
                <div className="Monsters--Deck--PlayedCards">
                    {this.state.playedCards && this.state.playedCards.map((card, i) => {
                        return <Card card={card} mostRecent={i === 0} key={i} />
                    })
                    }
                </div>
            </div>
        );
    }
}
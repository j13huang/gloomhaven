import React from 'react';
import * as classNames from "classnames";

import * as cardData from "./cardData";

import "./Deck.css";

// https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4#gistcomment-2271465
function shuffleDeck(deck) {
    return deck.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
}

export class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: shuffleDeck(props.initialData),
            currentIndex: -1,
            playedCards: [],
            needsShuffle: false,
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
        const {autoShuffle} = this.props;
        const {currentIndex, playedCards, deck, needsShuffle} = this.state;
        let nextDeck = deck;
        let nextIndex = currentIndex + 1;
        const currentCard = playedCards[0];
        if ((autoShuffle && currentCard && currentCard.endAction === cardData.END_ACTIONS.RESHUFFLE) || (
            nextIndex >= deck.length)) {
            // remove played discards
            const filteredDeck = deck.filter((c, i) => !((c.endAction === cardData.END_ACTIONS.DISCARD) && (i <= currentIndex)));
            nextDeck = shuffleDeck(filteredDeck);
            nextIndex = 0;
        }
        const nextCard = nextDeck[nextIndex];
        this.setState({
            deck: nextDeck,
            currentIndex: nextIndex,
            playedCards: [nextCard].concat(playedCards),
            needsShuffle: needsShuffle || (!autoShuffle && (nextCard.endAction === cardData.END_ACTIONS.RESHUFFLE)),
        });
    }

    cleanupCards() {
        const {autoShuffle} = this.props;
        const {deck, playedCards} = this.state;

        const firstReshuffleIndex = this.state.playedCards.findIndex((c, i) => (i > 0) && (c.endAction === cardData.END_ACTIONS.RESHUFFLE));
        this.setState({
            deck: autoShuffle ? deck : shuffleDeck(deck),
            // don't clear from the most recent card if the card is a reshuffle
            playedCards: firstReshuffleIndex === -1 ? playedCards : playedCards.filter((c, i) => i < firstReshuffleIndex),
            needsShuffle: false,
        });
    }

    render() {
        const {CardComponent, autoShuffle} = this.props;

        return (
            <div className={classNames({
                "Deck": true,
                "Deck--NeedsShuffle": this.state.needsShuffle,
            })}>
                <div>{this.props.name}</div>
                <div>
                    {/* could make custom component to keep track of count here too*/}
                    {this.props.extraButtons &&
                        this.props.extraButtons.map((b, i) => <button key={i} onClick={() => {this.addCard(b.card)}}>Add {b.name}</button>)
                    }
                </div>
                <div>
                    <img src={this.props.cardBack} className="Deck--CardBack" onClick={() => {this.revealNextCard()}} alt="card back" />
                </div>
                <button
                    className={classNames({
                        "Deck--Button": true,
                        "Deck--Button--NeedsShuffle": this.state.needsShuffle,
                    })}
                    onClick={() => {this.cleanupCards()}}
                    disabled={!autoShuffle && !this.state.needsShuffle}
                >
                    {autoShuffle ? "Clear" : "Shuffle"}
                </button>
                <div className="Deck--PlayedCards">
                    {this.state.playedCards && this.state.playedCards.map((card, i) => {
                        return <CardComponent
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
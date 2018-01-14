import React from 'react';
import * as classNames from "classnames";

import {Card} from "./Card";
import cardBack from "./attack_modifier_card_back.jpg";
import * as gameData from "../../lib/gameData";
import {newPerks} from "../../lib/classes";
import {newDeck, shuffleCards} from "../../lib/deck";

import "./Deck.css";

function reshuffleCards(cards, currentIndex) {
    // remove played discards
    const filteredCards = cards.filter((c, i) => !((c.endAction === gameData.END_ACTIONS.DISCARD) && (i <= currentIndex)));
    return shuffleCards(filteredCards);
}

export class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...newDeck(gameData.BASE_ATTACK_MODIFIER_CARDS),
            needsShuffle: false,
            showPerks: false,
            perks: newPerks(props.class) || [],
            curseCount: 0,
            blessCount: 0,
        };
    }

    togglePerkDisplay(showPerks) {
        this.setState({showPerks});
    }

    togglePerk(i, j, value) {
        this.setState({
            perks: [
                ...this.state.perks.slice(0, i),
                {
                    ...this.state.perks[i],
                    used: [
                        ...this.state.perks[i].used.slice(0, j),
                        value,
                        ...this.state.perks[i].used.slice(j + 1),
                    ],
                },
                ...this.state.perks.slice(i + 1),
            ],
        });
    }

    resetDeck() {
        let cards = gameData.BASE_ATTACK_MODIFIER_CARDS;
        this.state.perks.forEach((p) => {
            p.used.forEach((u) => {
                if (u) {
                    cards = p.filterCards(cards);
                }
            });
        });
        this.setState({...newDeck(cards), curseCount: 0, blessCount: 0});
    }

    // insert card into random spot of remaining deck
    addCard(card) {
        if ((card === gameData.CURSE && this.state.curseCount === 10) ||
            (card === gameData.BLESSING && this.state.blessCount === 10)) {
            return;
        }
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
            curseCount: card === gameData.CURSE ? (this.state.curseCount + 1) : this.state.curseCount,
            blessCount: card === gameData.BLESSING ? (this.state.blessCount + 1) : this.state.blessCount,
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
            needsShuffle: needsShuffle || (nextCard.endAction === gameData.END_ACTIONS.RESHUFFLE),
            curseCount: nextCard === gameData.CURSE ? (this.state.curseCount - 1) : this.state.curseCount,
            blessCount: nextCard === gameData.BLESSING ? (this.state.blessCount - 1) : this.state.blessCount,
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
                <div className={classNames({"Deck--Name--Monsters": this.props.name === "Monsters"})}>
                    {this.props.name}
                </div>
                {this.props.name && <div className="Deck--Class">
                    {this.props.class}
                    {this.props.class &&
                        <button onClick={() => this.togglePerkDisplay(!this.state.showPerks)}>{`${this.state.showPerks ? "Hide" : "Show"} Perks`}</button>
                    }
                </div>}
                {this.state.showPerks && <div className="Deck--Perks">
                    {this.state.perks.map((p, i) => (
                        <div key={i} className="Deck--Perk">
                            {p.used.map((u, j) => <input key={j} type="checkbox" checked={u} onChange={(event) => this.togglePerk(i, j, event.target.checked)} />)}
                            <label className="Deck--Perk--Name">{p.description}</label>
                        </div>)
                    )}
                    <button onClick={() => {this.resetDeck()}}>Set deck</button>
                </div>}
                <div>
                    <button onClick={() => {this.addCard(gameData.CURSE)}}>Add Curse ({this.state.curseCount})</button>
                    <button onClick={() => {this.addCard(gameData.BLESSING)}}>Add Blessing({this.state.blessCount})</button>
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
                                "Deck--Card--Reshuffle": card.endAction === gameData.END_ACTIONS.RESHUFFLE,
                                "Deck--Card--Discard": card.endAction === gameData.END_ACTIONS.DISCARD,
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
import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {PerksModal} from "./PerksModal";
import {Card} from "./Card";
import curseCard from "./curse.jpg";
import blessCard from "./bless.jpg";
import cardBack from "./card_back.jpg";
import {CURSE, BLESS, shuffle, needsShuffle, END_ACTIONS, iconForEndAction} from "../../lib/cards";
import {
    revealNextCardAction,
    addCardAction,
    selectors as attackModifierDecksSelectors,
} from "../../store/attackModifierDecks";
import {removePlayerAction} from "../../store/actions/players";

import "./Deck.css";

class DeckComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPerks: false,
            discardingCards: [],
        };
    }

    componentWillReceiveProps(nextProps) {
        // pretty hacky:
        // overdrawing the entire deck will change the current index but won't empty the played card list
        // (it will start with 1 card). Undoing a drawn card will decrease the current index by 1
        // ending turn will empty the played card list
        if (this.props.deck.currentIndex - nextProps.deck.currentIndex > 1 || (nextProps.deck.currentIndex !== -1 && nextProps.deck.playedCards.length === 0)) {
            const shuffleDiscards = needsShuffle(this.props.deck);
            this.setState({
                discardingCards: this.props.deck.playedCards,
                shuffleDiscards,
            }, () => {
                /*
                if (shuffleDiscards) {
                    setTimeout(() => {
                        const shuffleCards = () => this.shuffleCards(this.state.discardingCards);
                        const intervalID = setInterval(shuffleCards, 200);
                        setTimeout(() => clearInterval(intervalID), 1800);
                    }, 200);
                }
                */
            });
            // timeout delay matching the transition/animation duration
            setTimeout(() => {
                this.setState({
                    discardingCards: [],
                    shuffleDiscards: false,
                });
            }, 1200);
            return;
        }
    }

    togglePerksModal(showPerks) {
        this.setState({showPerks});
    }

    shuffleCards(cards) {
        this.setState({
            discardingCards: shuffle(cards),
        });
    }

    render() {
        const {deck} = this.props;
        const willShuffle = needsShuffle(deck);
        return (
            <div className="Deck">
                <h5 className="Deck--Name">{this.props.name}</h5>
                {(this.props.name === "Monsters") ? <div className="Deck--MonsterPlaceholder" /> :
                    <div className="Deck--Class">
                        {deck.class}
                        <button className="Deck--Perks--Button" onClick={() => this.togglePerksModal(!this.state.showPerks)}>Perks</button>
                        {this.state.showPerks && <PerksModal name={this.props.name} onClose={() => this.togglePerksModal(false)} />}
                    </div>
                }
                <div className="Deck--CardsLeft">
                    Cards left ({deck.cards.length - (deck.currentIndex + 1)})
                    <img
                        className={classNames({"Deck--Shuffle": true, "Deck--WillShuffle": willShuffle})}
                        src={iconForEndAction(END_ACTIONS.SHUFFLE)}
                        alt="shuffle"
                    />
                </div>
                <div className="Deck--AddCards--Container">
                    <button
                        className="Deck--AddCards--Button"
                        disabled={(this.props.name === "Monsters" ? deck.curseCount : this.props.totalCurses) >= 10}
                        onClick={() => {this.props.addCard(CURSE)}}
                    >
                        +<img className="Deck--AddCards--Image"src={curseCard} alt="add curse" /> ({deck.curseCount})
                    </button>
                    <button
                        className="Deck--AddCards--Button"
                        disabled={(this.props.name === "Monsters" ? deck.blessCount : this.props.totalBlessings) >= 10}
                        onClick={() => {this.props.addCard(BLESS)}}
                    >
                        +<img className="Deck--AddCards--Image" src={blessCard} alt="add curse" /> ({deck.blessCount})
                    </button>
                </div>
                <div>
                    <img src={cardBack} className="Deck--CardBack" onClick={() => {this.props.revealNextCard()}} alt="card back" />
                </div>
                <div className="Deck--PlayedCards">
                    {deck.playedCards && deck.playedCards.map((card, i) => {
                        return <Card
                            key={i}
                            card={card}
                            name={this.props.name}
                            isMostRecentCard={i === 0}
                        />
                    }) }
                </div>
                <div className={classNames({
                    "Deck--PlayedCards": true,
                    "Deck--DiscardingCards": this.state.discardingCards.length > 0,
                    "Deck--DiscardingCards--Shuffle": this.state.shuffleDiscards,
                })}>
                    {this.state.discardingCards.map((card, i) => {
                        return <Card
                            key={i}
                            card={card}
                        />
                    })}
                </div>
            </div>
        );
    }
}

export const Deck = connect(
    (state, ownProps) => ({
        deck: state.attackModifierDecks[ownProps.name],
        totalCurses: attackModifierDecksSelectors.totalCurses(state),
        totalBlessings: attackModifierDecksSelectors.totalBlessings(state),
    }),
    (dispatch, ownProps) => ({
        removePlayer: () => dispatch(removePlayerAction(ownProps.name)),
        addCard: (card) => dispatch(addCardAction(ownProps.name, card)),
        revealNextCard: () => dispatch(revealNextCardAction(ownProps.name)),
    }),
)(DeckComponent);

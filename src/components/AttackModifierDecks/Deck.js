import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";
import * as _ from "lodash";

import {PerksModal} from "./PerksModal";
import {Card} from "./Card";
import curseCard from "./curse.jpg";
import blessCard from "./bless.jpg";
import cardBack from "./card_back.jpg";
import {CURSE, BLESS, needsShuffle, END_ACTIONS, iconForEndAction} from "../../lib/cards";
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
            collapseRemainingCards: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        // pretty hacky:
        // overdrawing the entire deck will change the current index but won't empty the played card list
        // (it will start with 1 card). Undoing a drawn card will decrease the current index by 1
        // ending turn will empty the played card list and not change the currentIndex
        const currentIndexDiff = this.props.deck.currentIndex - nextProps.deck.currentIndex;
        if (currentIndexDiff > 1 ||
            (currentIndexDiff === 0 && nextProps.deck.playedCards.length === 0) ||
            !_.isEqual(this.props.deck.cards, nextProps.deck.cards)
        ) {
            this.setState({
                discardingCards: this.props.deck.playedCards,
                shuffleDiscards: needsShuffle(this.props.deck),
            });
            // timeout delay matching the animation/transition duration
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

    collapseRemainingCards(collapse) {
        this.setState({
            collapseRemainingCards: collapse,
        });
    }

    render() {
        const {deck} = this.props;
        const willShuffle = needsShuffle(deck);
        const lastFiveCards = deck.playedCards.slice(0, 5);
        const remainingCards = deck.playedCards.slice(5);
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
                {lastFiveCards.length > 0 && <div className="Deck--PlayedCards">
                    {lastFiveCards.map((card, i) => {
                        return <Card
                            key={i}
                            card={card}
                            name={this.props.name}
                            isMostRecentCard={i === 0}
                        />
                    })}
                </div>}
                {remainingCards.length > 0 && <div className="Deck--RemainingCards"
                    onMouseEnter={() => this.collapseRemainingCards(false)}
                    onMouseLeave={() => this.collapseRemainingCards(true)}
                >
                    {remainingCards.map((card, i) => {
                        return <Card
                            key={i}
                            card={card}
                            name={this.props.name}
                        />;
                    })}
                    {(this.state.collapseRemainingCards && remainingCards.length > 1) && <div className="Deck--RemainingCards--Cover">
                        <div className="Deck--RemainingCards--CoverText">{remainingCards.length} more cards...</div>
                    </div>}
                </div>}
                <div className={classNames({
                    "Deck--PlayedCards": true,
                    "Deck--DiscardingCards": this.state.discardingCards.length > 0,
                })}>
                    {this.state.discardingCards.map((card, i) => {
                        return <Card
                            key={i}
                            card={card}
                            name={this.props.name}
                        >
                            {this.state.discardingCards.length > 0 &&
                                <div className="Deck--DiscardingCards--Cover">{this.state.shuffleDiscards ? "Shuffling..." : ""}</div>
                            }
                        </Card>
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
        removePlayer: () => removePlayerAction(dispatch, ownProps.name),
        addCard: (card) => addCardAction(dispatch, ownProps.name, card),
        revealNextCard: () => revealNextCardAction(dispatch, ownProps.name),
    }),
)(DeckComponent);

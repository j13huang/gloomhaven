import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {Card} from "./Card";
import cardBack from "./attack_modifier_card_back.jpg";
import {CURSE, BLESS, shuffle, needsShuffle} from "../../lib/cards";
import {
    resetCardsAction,
    revealNextCardAction,
    addCardAction,
    togglePerkAction,
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

    togglePerkDisplay(showPerks) {
        this.setState({showPerks});
    }

    shuffleCards(cards) {
        this.setState({
            discardingCards: shuffle(cards),
        });
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

    render() {
        const {deck} = this.props;
        return (
            <div className="Deck">
                <h5 className="Deck--Name">{this.props.name}</h5>
                {(this.props.name === "Monsters") ? <div className="Deck--MonsterPlaceholder" /> :
                    <div className="Deck--Class">
                        {deck.class}
                        <button onClick={() => this.togglePerkDisplay(!this.state.showPerks)}>{`${this.state.showPerks ? "Hide" : "Show"} Perks`}</button>
                    </div>
                }
                {this.state.showPerks && <div className="Deck--Perks">
                    {deck.perks.map((p, i) => (
                        <div key={i} className="Deck--Perk">
                            {p.used.map((u, j) => <input key={j} type="checkbox" checked={u} onChange={(event) => this.props.togglePerk(i, j, event.target.checked)} />)}
                            <label className="Deck--Perk--Name">{p.description}</label>
                        </div>)
                    )}
                    <button onClick={() => {this.props.resetCards()}}>Set deck</button>
                </div>}
                <div>Cards left ({deck.cards.length - (deck.currentIndex + 1)})</div>
                <div>
                    <button
                        disabled={(this.props.name === "Monsters" ? deck.curseCount : this.props.totalCurses) >= 10}
                        onClick={() => {this.props.addCard(CURSE)}}
                    >
                        Add Curse ({deck.curseCount})
                    </button>
                    <button
                        disabled={(this.props.name === "Monsters" ? deck.blessCount : this.props.totalBlessings) >= 10}
                        onClick={() => {this.props.addCard(BLESS)}}
                    >
                        Add Blessing ({deck.blessCount})
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
        resetCards: () => dispatch(resetCardsAction(ownProps.name)),
        addCard: (card) => dispatch(addCardAction(ownProps.name, card)),
        revealNextCard: () => dispatch(revealNextCardAction(ownProps.name)),
        togglePerk: (perkIndex, perkCheckIndex) => dispatch(togglePerkAction(ownProps.name, perkIndex, perkCheckIndex)),
    }),
)(DeckComponent);

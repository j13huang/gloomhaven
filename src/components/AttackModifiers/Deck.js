import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {Card} from "./Card";
import cardBack from "./attack_modifier_card_back.jpg";
import {END_ACTIONS, CURSE, BLESS} from "../../lib/cards";
import {
    resetDeckAction,
    revealNextCardAction,
    addCardAction,
    togglePerkAction,
    selectors as attackModifierCardsSelectors,
} from "../../reducers/attackModifierCards";

import "./Deck.css";

class DeckComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPerks: false,
        };
    }

    togglePerkDisplay(showPerks) {
        this.setState({showPerks});
    }

    render() {
        return (
            <div className={classNames({
                "Deck": true,
                //"Deck--NeedsShuffle": this.state.needsShuffle,
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
                    {this.props.perks.map((p, i) => (
                        <div key={i} className="Deck--Perk">
                            {p.used.map((u, j) => <input key={j} type="checkbox" checked={u} onChange={(event) => this.props.togglePerk(i, j, event.target.checked)} />)}
                            <label className="Deck--Perk--Name">{p.description}</label>
                        </div>)
                    )}
                    <button onClick={() => {this.props.resetDeck()}}>Set deck</button>
                </div>}
                <div>
                    <button
                        disabled={(this.props.name === "Monsters" ? this.props.curseCount : this.props.totalCurses) >= 10}
                        onClick={() => {this.props.addCard(CURSE)}}
                    >
                        Add Curse ({this.props.curseCount})
                    </button>
                    <button
                        disabled={(this.props.name === "Monsters" ? this.props.blessCount : this.props.totalBlessings) >= 10}
                        onClick={() => {this.props.addCard(BLESS)}}
                    >
                        Add Blessing ({this.props.blessCount})
                    </button>
                </div>
                <div>
                    <img src={cardBack} className="Deck--CardBack" onClick={() => {this.props.revealNextCard()}} alt="card back" />
                </div>
                <div className="Deck--PlayedCards">
                    {this.props.playedCards && this.props.playedCards.map((card, i) => {
                        return <Card
                            className={classNames({
                                "Deck--Card": true,
                                "Deck--Card--MostRecent": i === 0,
                                "Deck--Card--Shuffle": card.endAction === END_ACTIONS.SHUFFLE,
                                "Deck--Card--Discard": card.endAction === END_ACTIONS.DISCARD,
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

export const Deck = connect(
    (state, ownProps) => ({
        ...state.attackModifierCards[ownProps.name],
        totalCurses: attackModifierCardsSelectors.totalCurses(state.attackModifierCards),
        totalBlessings: attackModifierCardsSelectors.totalBlessings(state.attackModifierCards),
    }),
    (dispatch, ownProps) => ({
        resetDeck: () => dispatch(resetDeckAction(ownProps.name)),
        addCard: (card) => dispatch(addCardAction(ownProps.name, card)),
        revealNextCard: () => dispatch(revealNextCardAction(ownProps.name)),
        togglePerk: (perkIndex, perkCheckIndex) => dispatch(togglePerkAction(ownProps.name, perkIndex, perkCheckIndex)),
    }),
)(DeckComponent);

import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {Deck} from "./Deck";
import {endTurnAction} from "../../store/actions/turn";
import {
    revealNextCardsAction,
    selectors as monstersSelectors,
} from "../../store/monsterDecks";
import { selectors as playersSelectors } from "../../store/players";

import "./MonsterDecks.css";

function MonsterDecksComponent({scenarioLevel, decks, hasActiveCards, revealNextCards, endTurn}) {
    const deckNames = Object.keys(decks);
    const activeDecks = deckNames.filter((m) => decks[m].active);
    const inactiveDecks = deckNames.filter((m) => !decks[m].active);
    const deckOrder = activeDecks.sort((a, b) => {
        const deckA = decks[a];
        const deckB = decks[b];
        if (!deckA.currentCard && !deckB.currentCard) {
            return 0;
        }
        return deckA.currentCard.initiative - deckB.currentCard.initiative;
    }).concat(inactiveDecks);
    return (<div>
        <div className="MonsterDecks--Header">
            <button
                className="MonsterDecks--Header--Button"
                disabled={!deckNames.some((m) => decks[m].active) || hasActiveCards}
                onClick={() => revealNextCards(deckNames)}
            >
                Flip Cards
            </button>
            <button
                className={classNames({
                    "MonsterDecks--Header--Button": true,
                    "MonsterDecks--Header--ButtonReady": hasActiveCards,
                })}
                disabled={!hasActiveCards}
                onClick={() => endTurn()}
            >
                End Turn
            </button>
        </div>
        <div className="MonsterDecks">
            {deckOrder.map((name) => {
                const deck = decks[name];
                return (<Deck key={name} name={name} card={deck.currentCard} active={deck.active} />);
            })}
        </div>
    </div>);
}

export const MonsterDecks = connect(
    (state, ownProps) => {
        return {
            decks: state.monsterDecks,
            hasActiveCards: monstersSelectors.hasActiveCards(state),
            numPlayers: playersSelectors.numPlayers(state),
            scenarioLevel: playersSelectors.scenarioLevel(state),
        };
    },
    (dispatch) => {
        return {
            endTurn: () => dispatch(endTurnAction()),
            revealNextCards: () => {dispatch(revealNextCardsAction())},
        };
    },
)(MonsterDecksComponent);

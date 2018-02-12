import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {Deck} from "./Deck";
import {EndTurnButton} from "../Header/EndTurnButton";
import {MONSTERS, BOSS_STATS} from "../../lib/monsters";
import {endTurnAction} from "../../store/actions/turn";
import {
    revealNextCardsAction,
    selectors as monstersSelectors,
} from "../../store/monsterDecks";
import { selectors as playersSelectors, setIntiativeAction } from "../../store/players";

import "./MonsterDecks.css";

function MonsterDecksComponent({decks, hasActiveCards, revealNextCards, endTurn, showStats, numPlayers, scenarioLevel, boss, showTimeline, toggleTimeline, playerInitiative, setPlayerInitiative}) {
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
    const initiativeOrderMap = deckOrder.reduce((acc, m) => {
        const deck = decks[m];
        if (deck.currentCard) {
            acc[decks[m].currentCard.initiative] = true;
        }
        return acc;
    }, {});
    return (<div>
        <div className="MonsterDecks--Header">
            <button
                className="MonsterDecks--Header--Button"
                disabled={!deckNames.some((m) => decks[m].active) || hasActiveCards}
                onClick={() => revealNextCards(deckNames)}
            >
                Flip Cards
            </button>
            <EndTurnButton
                className={classNames({
                    "MonsterDecks--Header--Button": true,
                    "MonsterDecks--Header--ButtonReady": hasActiveCards,
                })}
                endTurnReady={hasActiveCards}
                endTurn={() => endTurn()}
            />
        </div>
        <h6 className="MonsterDecks--Timeline--Toggle" onClick={() => toggleTimeline()}>Initiative Timeline <span>{showTimeline ? "▾" : "▸"}</span></h6>
        {showTimeline && <div className="MonsterDecks--Timeline">
            {new Array(99).fill().map((_, i) => {
                let content = i + 1;
                if (initiativeOrderMap[i + 1] && playerInitiative[i + 1]) {
                    content = "*";
                } else if (initiativeOrderMap[i + 1]) {
                    content = "M";
                } else if (playerInitiative[i + 1]) {
                    content = "P";
                }
                return (<div key={i + 1} className={classNames({
                    "MonsterDecks--Timeline--BaseCell": true,
                    "MonsterDecks--Timeline--MonsterCell": initiativeOrderMap[i + 1],
                    "MonsterDecks--Timeline--PlayerCell": playerInitiative[i + 1],
                })} onClick={() => setPlayerInitiative(i + 1)}>{content}</div>);
            })}
        </div>}
        <div className="MonsterDecks">
            {deckOrder.map((name) => {
                const deck = decks[name];
                if (!showStats) {
                    return (<Deck key={name} name={name} card={deck.currentCard} active={deck.active} />);
                }
                let monsterStats;
                if (name === "Boss") {
                    monsterStats = BOSS_STATS[boss.name][scenarioLevel](numPlayers);
                } else {
                    monsterStats = MONSTERS[name].stats[scenarioLevel];
                }
                return (
                    <Deck key={name} name={name} card={deck.currentCard} active={deck.active} stats={monsterStats} />
                );
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
            boss: state.boss,
            playerInitiative: state.players.initiative,
        };
    },
    (dispatch) => {
        return {
            endTurn: () => endTurnAction(dispatch),
            revealNextCards: () => {revealNextCardsAction(dispatch)},
            setPlayerInitiative: (initiative) => {setIntiativeAction(dispatch, initiative)},
        };
    },
)(MonsterDecksComponent);

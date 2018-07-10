import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {Deck} from "./Deck";
import {InitiativeSelector} from "./InitiativeTimeline/InitiativeSelector";
import {EndTurnButton} from "../Header/EndTurnButton";
import {MONSTERS, BOSS_STATS} from "../../lib/monsters";
import {endTurnAction} from "../../store/actions/turn";
import {
    revealNextCardsAction,
    selectors as monstersSelectors,
} from "../../store/monsterDecks";
import { selectors as playersSelectors} from "../../store/players";

import "./MonsterDecks.css";

class MonsterDecksComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            initiativeSelectorIndex: -1,
        };
    }

    showInitiativeSelector(index) {
        this.setState({initiativeSelectorIndex: index});
    }

    hideInitiativeSelector = () => {
        this.setState({initiativeSelectorIndex: -1});
    }

    render() {
        const {decks, hasActiveCards, revealNextCards, endTurn, showStats, numPlayers, scenarioLevel,
            boss, showTimeline, toggleTimeline, playerInitiatives} = this.props;
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
                let initiativeContent = acc[decks[m].currentCard.initiative];
                acc[decks[m].currentCard.initiative] = (initiativeContent || []).concat(m);
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
            <div className="MonsterDecks--Timeline--ToggleContainer">
                <h6 className="MonsterDecks--Timeline--Toggle" onClick={() => toggleTimeline()}>Initiative Timeline <span>{showTimeline ? "▾" : "▸"}</span></h6>
            </div>
            {showTimeline && <div className="MonsterDecks--Timeline">
                {new Array(99).fill().map((_, i) => {
                    const initiative = i + 1;
                    const monsterInitiativeNames = initiativeOrderMap[initiative];
                    const playerInitiativeNames = playerInitiatives[initiative];
                    const hasMonsterInitiative = monsterInitiativeNames && monsterInitiativeNames.length > 0;
                    const hasPlayerInitiative = playerInitiativeNames && playerInitiativeNames.length > 0;
                    let content = [];
                    if (hasMonsterInitiative) {
                        content = content.concat(monsterInitiativeNames);
                    }
                    if (hasPlayerInitiative) {
                        content = content.concat(playerInitiativeNames);
                    }
                    return (<div key={initiative} className={classNames({
                        "MonsterDecks--Timeline--BaseCell": true,
                        "MonsterDecks--Timeline--SelectedCell": this.state.initiativeSelectorIndex === i,
                        "MonsterDecks--Timeline--MonsterCell": hasMonsterInitiative,
                        "MonsterDecks--Timeline--PlayerCell": hasPlayerInitiative,
                    })}
                        onClick={(e) => {
                            if (numPlayers > 0) {
                                //e.stopPropagation();
                                this.showInitiativeSelector(i);
                            }
                        }}
                    >
                        {this.state.initiativeSelectorIndex === i &&
                            <InitiativeSelector initiative={initiative} onHide={() => this.hideInitiativeSelector()}/>
                        }
                        {content.length > 0 ? content.join(", ") : initiative}
                    </div>);
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
}

export const MonsterDecks = connect(
    (state, ownProps) => {
        return {
            decks: state.monsterDecks,
            hasActiveCards: monstersSelectors.hasActiveCards(state),
            numPlayers: playersSelectors.numPlayers(state),
            scenarioLevel: playersSelectors.scenarioLevel(state),
            boss: state.boss,
            playerInitiatives: playersSelectors.initiatives(state),
        };
    },
    (dispatch) => {
        return {
            endTurn: () => endTurnAction(dispatch),
            revealNextCards: () => {revealNextCardsAction(dispatch)},
        };
    },
)(MonsterDecksComponent);

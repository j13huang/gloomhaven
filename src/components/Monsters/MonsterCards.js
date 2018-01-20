import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {List} from "./List";
import {Deck} from "./Deck";
import {endTurnAction} from "../../store/turn";
import {
    resetMonstersAction,
    revealNextCardsAction,
    selectors as monstersSelectors,
} from "../../store/monsters";
import {selectors as attackModifierCardsSelectors} from "../../store/attackModifierCards";

import "./Monsters.css";
import "./MonsterCards.css";

function MonsterCardsComponent({selectedLevel, monsters, hasActiveCards, onSelectLevel, resetMonsters, revealNextCards, endTurn}) {
    const levelSelectID = "Monsters-LevelSelect";
    const monsterNames = Object.keys(monsters);
    const activeMonsters = monsterNames.filter((m) => monsters[m].active);
    const inactiveMonsters = monsterNames.filter((m) => !monsters[m].active);
    const monsterOrder = activeMonsters.sort((a, b) => {
        const monsterA = monsters[a];
        const monsterB = monsters[b];
        if (!monsterA.currentCard && !monsterB.currentCard) {
            return 0;
        }
        return monsterA.currentCard.initiative - monsterB.currentCard.initiative;
    }).concat(inactiveMonsters);
    return (<div>
        <div className="MonsterCards--Header">
            <h3>Monsters</h3>
            <button
                className="MonsterCards--Header--Button"
                disabled={!monsterNames.some((m) => monsters[m].active) || hasActiveCards}
                onClick={() => revealNextCards(monsterNames)}
            >
                Flip Cards
            </button>
            <button
                className={classNames({
                    "MonsterCards--Header--Button": true,
                    "MonsterCards--Header--ButtonReady": hasActiveCards,
                })}
                disabled={!hasActiveCards}
                onClick={() => endTurn()}
            >
                End Turn
            </button>
        </div>
        <div className="Monsters">
            <div className="Monsters--List--Container">
                <div>
                    <label className="Monsters--List--ScenarioLevelLabel" htmlFor={levelSelectID}>Scenario Level: </label>
                    <select id={levelSelectID} disabled={monsterNames.length > 0} value={selectedLevel} onChange={(event) => onSelectLevel(event.target.value)}>
                        {new Array(8).fill().map((_, i) => {
                            const level = i;
                            return (<option key={level} value={level}>{level}</option>);
                        })}
                    </select>
                </div>
                <List monstersInPlay={monsterNames} />
                <button className="Monsters--List--ResetButton" onClick={() => resetMonsters()}>Reset</button>
            </div>
            {monsterOrder.map((name, i) => {
                const monster = monsters[name];
                return (<div key={name} className="Monsters--Monster">
                    <div className="MonsterCards--Deck">
                        <Deck name={name} card={monster.currentCard} />
                        {!monster.active && <div className={"MonsterCards--Deck--InactiveCover"}>
                            Inactive
                        </div>}
                    </div>
                </div>);
            })}
        </div>
    </div>);
}

export const MonsterCards = connect(
    (state, ownProps) => {
        return {
            monsters: state.monsters,
            hasActiveCards: monstersSelectors.hasActiveCards(state),
            numPlayers: attackModifierCardsSelectors.numPlayers(state),
        };
    },
    (dispatch) => {
        return {
            endTurn: () => dispatch(endTurnAction()),
            resetMonsters: () => {dispatch(resetMonstersAction())},
            revealNextCards: () => {dispatch(revealNextCardsAction())},
        };
    },
)(MonsterCardsComponent);

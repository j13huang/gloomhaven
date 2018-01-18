import React from 'react';
import {connect} from "react-redux";

import {List} from "./List";
import {Deck} from "./Deck";
import {
    resetMonstersAction,
    removeMonsterAction,
    revealNextCardsAction,
    selectors as monstersSelectors,
} from "../../store/monsters";
import {selectors as attackModifierCardsSelectors} from "../../store/attackModifierCards";

import "./Monsters.css";

function MonsterCardsComponent({selectedLevel, monsters, hasActiveCards, onSelectLevel, resetMonsters, removeMonster, revealNextCards}) {
    const levelSelectID = "Monsters-LevelSelect";
    const monsterNames = Object.keys(monsters);
    const monsterOrder = hasActiveCards ?
        monsterNames.sort((a, b) => monsters[a].currentCard.initiative - monsters[b].currentCard.initiative) :
        monsterNames;
    return (
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
                <button onClick={() => revealNextCards(monsterNames)}>Flip</button>
                <List monstersInPlay={monsterNames} />
                <button onClick={() => resetMonsters()}>Reset</button>
            </div>
            {monsterOrder.map((name, i) => {
                return (<div key={i} className="Monsters--Monster">
                    <h5 className="Monsters--Monster--Name">{name}<button onClick={() => removeMonster(name)}>X</button></h5>
                    <Deck card={monsters[name].currentCard} />
                </div>);
            })}
        </div>
    );
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
            resetMonsters: () => {dispatch(resetMonstersAction())},
            revealNextCards: () => {dispatch(revealNextCardsAction())},
            removeMonster: (name) => {dispatch(removeMonsterAction(name))},
        };
    },
)(MonsterCardsComponent);

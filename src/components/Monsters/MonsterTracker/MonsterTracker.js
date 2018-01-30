import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {MONSTERS} from "../../../lib/monsters";
import {Monster} from "./Monster";
import {MonsterStats} from "./MonsterStats";
import {StatusEffectTracker} from "../../UnitTracking/StatusEffectTracker";
import {
    toggleAliveAction,
    toggleEliteAction,
    toggleAllStatusEffectsAction,
    selectors as monstersSelectors,
} from "../../../store/monsters";
import {selectors as playersSelectors, } from "../../../store/players";
import {removeMonsterAction} from "../../../store/actions/monsters";
import {toggleActiveAction} from "../../../store/monsterDecks";

import "./MonsterTracker.css";

class MonsterTrackerComponent extends React.Component {
    onToggleAlive(index) {
        const activeChange = this.props.monsters.filter((_, i) => i !== index).every((m) => !m.alive);
        if (activeChange) {
            this.props.toggleActive(this.props.name);
        }
        this.props.toggleAlive(index, this.props.scenarioLevel);
    }

    render() {
        const {name, monsters, scenarioLevel, removeMonster, allStatusEffects, toggleElite, toggleAllStatusEffects} = this.props;
        const monsterStats = MONSTERS[name].stats[scenarioLevel];
        return (<div className="MonsterTracker--Container">
            <h5 className="MonsterTracker--Name">{name}<button onClick={() => removeMonster()}>X</button></h5>
            <div className="MonsterTracker">
                <div className="MonsterTracker--StatsContainer">
                    <MonsterStats stats={monsterStats.normal} />
                    <MonsterStats stats={monsterStats.elite} elite />
                </div>
                <div className="MonsterTracker--Controls">
                    <div className="MonsterTracker--StatusEffects--ToggleAll">
                        Toggle All:
                        <StatusEffectTracker statusEffects={allStatusEffects} onToggle={(s) => toggleAllStatusEffects(s)} />
                    </div>
                    <div className="MonsterTracker--MonsterSelectors">
                        {monsters.map(({alive, elite}, i) =>
                            <button key={i}
                                disabled={alive}
                                className={classNames({
                                    "MonsterTracker--MonsterSelector": true,
                                    "MonsterTracker--MonsterSelector--Alive": !alive,
                                })}
                                onClick={() => this.onToggleAlive(i)}
                            >
                                {i + 1}
                            </button>
                        )}
                    </div>
                </div>
                {monsters.map(({alive, elite}, i) => {
                    return alive && (<div key={i} className={classNames({"MonsterTracker--Monster": true, "MonsterTracker--Monster--Elite": elite})}>
                        <div className="MonsterTracker--Monster--Controls">
                            <div className="MonsterTracker--Monster--Number">{`${i + 1}`}</div>
                            <button onClick={() => this.onToggleAlive(i)}>Kill</button>
                            <button onClick={() => toggleElite(i, this.props.scenarioLevel)}>Normal/Elite</button>
                        </div>
                        {alive && <Monster name={name} index={i} />}
                    </div>);
                })}
            </div>
        </div>);
    }
}

export const MonsterTracker = connect(
    (state, ownProps) => {
        return {
            monsters: state.monsters[ownProps.name].monsters,
            // global status effects across all monsters
            allStatusEffects: monstersSelectors.allStatusEffects(state, ownProps.name),
            scenarioLevel: playersSelectors.scenarioLevel(state),
        };
    },
    (dispatch, ownProps) => {
        return {
            removeMonster: () => {removeMonsterAction(dispatch, ownProps.name)},
            toggleAlive: (i, scenarioLevel) => toggleAliveAction(dispatch, ownProps.name, i, scenarioLevel),
            toggleElite: (i, scenarioLevel) => toggleEliteAction(dispatch, ownProps.name, i, scenarioLevel),
            toggleActive: (active) => {toggleActiveAction(dispatch, ownProps.name, active)},
            toggleAllStatusEffects: (statusEffect) =>
                toggleAllStatusEffectsAction(dispatch, ownProps.name, statusEffect),
        };
    },
)(MonsterTrackerComponent);

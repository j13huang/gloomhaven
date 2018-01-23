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
        return (<div>
            <h5 className="MonsterTracker--Name">{name}<button onClick={() => removeMonster()}>X</button></h5>
            <div className="MonsterTracker">
                <div className="MonsterTracker--StatsContainer">
                    <MonsterStats stats={monsterStats.normal} />
                    <MonsterStats stats={monsterStats.elite} elite />
                </div>
                <div>
                    Toggle All:
                    <StatusEffectTracker className="MonsterTracker--StatusEffects--ToggleAll" statusEffects={allStatusEffects} onToggle={(s) => toggleAllStatusEffects(s)} />
                </div>
                <div className="MonsterTracker--MonsterSelector">
                    {monsters.map(({alive, elite}, i) =>
                        <button key={i}
                            disabled={alive}
                            className={classNames({"MonsterTracker--MonsterSelector--Alive": !alive})}
                            onClick={() => this.onToggleAlive(i)}
                        >
                            {i + 1}
                        </button>
                    )}
                </div>
                {monsters.map(({alive, elite}, i) => {
                    return alive && (<div key={i}>
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
            removeMonster: () => {dispatch(removeMonsterAction(ownProps.name))},
            toggleAlive: (i, scenarioLevel) => dispatch(toggleAliveAction(ownProps.name, i, scenarioLevel)),
            toggleElite: (i, scenarioLevel) => dispatch(toggleEliteAction(ownProps.name, i, scenarioLevel)),
            toggleActive: (active) => {dispatch(toggleActiveAction(ownProps.name, active))},
            toggleAllStatusEffects: (statusEffect) =>
                dispatch(toggleAllStatusEffectsAction(ownProps.name, statusEffect)),
        };
    },
)(MonsterTrackerComponent);

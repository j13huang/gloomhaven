import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {ATTACK, MOVEMENT, RANGE, iconForStat} from "../../lib/stats";
import {newStatusEffectTracker} from "../../lib/statusEffects";
import {StatusEffectTracker} from "../UnitTracking/StatusEffectTracker";
import {HPTracker} from "../UnitTracking/HPTracker";
//import {toggleStatusEffectAction, setHPAction} from "../../store/summons";
import {removeSummonAction} from "../../store/summons";

import "./SummonTracker.css";

class SummonTrackerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hp: props.maxHP,
            statusEffects: newStatusEffectTracker(),
        };
    }

    setHP(hp) {
        this.setState({hp});
    }

    toggleStatusEffect(statusEffect) {
        this.setState({
            statusEffects: {
                ...this.state.statusEffects,
                [statusEffect]: !this.state.statusEffects[statusEffect],
            },
        });
    }

    render() {
        return (<div className="SummonTracker--Container">
            <div className="SummonTracker--Color"></div>
            <div className="SummonTracker--Name">
                {this.props.name}
                <button className="SummonTracker--XButton" onClick={() => this.props.removeSummon()}>X</button>
            </div>
            <div className="SummonTracker--Section">
                <div className="SummonTracker--StatsContainer">
                    <div className="SummonTracker--Stat">
                        <div>
                            <img className="SummonTracker--Stat--Icon" src={iconForStat(ATTACK)} alt="attack" />
                        </div>
                        <div className="SummonTracker--Stat--Value">{this.props.attack === 0 ? "-" : this.props.attack}</div>
                    </div>
                    <div className="SummonTracker--Stat">
                        <div>
                            <img className="SummonTracker--Stat--Icon" src={iconForStat(MOVEMENT)} alt="movement" />
                        </div>
                        <div className="SummonTracker--Stat--Value">{this.props.movement === 0 ? "-" : this.props.movement}</div>
                    </div>
                    <div className="SummonTracker--Stat">
                        <div>
                            <img className="SummonTracker--Stat--Icon" src={iconForStat(RANGE)} alt="range" />
                        </div>
                        <div className="SummonTracker--Stat--Value">{this.props.range === 0 ? "-" : this.props.range}</div>
                    </div>
                </div>
                <div className="SummonTracker--Extra">{this.props.extra}</div>
            </div>
            <div className={classNames("SummonTracker--Section", "SummonTracker")}>
                <StatusEffectTracker
                    statusEffects={this.state.statusEffects}
                    onToggle={(s) => this.toggleStatusEffect(s)} />
                <HPTracker
                    currentHP={this.state.hp}
                    maxHP={this.props.maxHP}
                    onHPChange={(hp) => (this.state.hp !== hp) && this.setHP(hp)}
                    white
                />
            </div>
        </div>);
    }
}

export const SummonTracker = connect(
    (state, ownProps) => {
        return {
            ...state.summons[ownProps.playerName][ownProps.name],
        };
    },
    (dispatch, ownProps) => {
        return {
            removeSummon: () => removeSummonAction(dispatch, ownProps.playerName, ownProps.name),
            //toggleStatusEffect: (statusEffect) => toggleStatusEffectAction(dispatch, ownProps.name, statusEffect),
            //setHP: (hp) => setHPAction(dispatch, ownProps.name, hp),
        };
    },
)(SummonTrackerComponent);


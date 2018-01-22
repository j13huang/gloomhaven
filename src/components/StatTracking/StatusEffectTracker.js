import React from "react";
import * as classNames from "classnames";

import {STATUS_EFFECTS, iconForStatusEffect} from "../../lib/statusEffects";

import "./StatusEffectTracker.css";

export class StatusEffectTracker extends React.Component {
    constructor(props) {
        super(props);

        const statusEffects = STATUS_EFFECTS.reduce((acc, s) => {acc[s] = false; return acc;}, {});
        this.state = {
            statusEffects,
        };
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
        return (<div className="StatusEffects">
            {Object.keys(this.state.statusEffects).map((s) => {
                const active = this.state.statusEffects[s];
                const immune = this.props.immunities && this.props.immunities.includes(s);
                return (<div key={s} className={classNames({"StatusEffects--Container": true, "StatusEffects--Immune": immune})}>
                    <img
                        src={iconForStatusEffect(s)}
                        className={classNames({"StatusEffect": true, "StatusEffect--Inactive": !active})}
                        alt={`${s} - ${active ? "active" : "inactive"}`}
                        onClick={() => !immune && this.toggleStatusEffect(s)}
                    />
                </div>);
            })}
        </div>);
    }
}

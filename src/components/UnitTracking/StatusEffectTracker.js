import React from "react";
import * as classNames from "classnames";

import {iconForStatusEffect} from "../../lib/statusEffects";

import "./StatusEffectTracker.css";

export function StatusEffectTracker({className, statusEffects, immunities = [], onToggle}) {
    return (<div className={classNames("StatusEffects", className)}>
        {Object.keys(statusEffects).map((s) => {
            const active = statusEffects[s];
            const immune = immunities.includes(s);
            return (<div key={s} className={classNames({"StatusEffect--Container": true, "StatusEffect--Immune": immune})}>
                <img
                    src={iconForStatusEffect(s)}
                    className={classNames({"StatusEffect": true, "StatusEffect--Inactive": !active})}
                    alt={`${s} - ${active ? "active" : "inactive"}`}
                    onClick={() => {!immune && onToggle(s)}}
                />
            </div>);
        })}
    </div>);
}

import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {HPTracker} from "../../UnitTracking/HPTracker";
import { StatusEffectTracker } from "../../UnitTracking/StatusEffectTracker";
import { toggleStatusEffectAction, setHPAction } from "../../../store/monsters";

import "./Monster.css";

function MonsterComponent({currentHP, maxHP, elite, immunities = [], statusEffects, toggleStatusEffect, setHP}) {
    return (<div className={classNames({"Monster": true, "Monster--Elite": elite})}>
        <StatusEffectTracker statusEffects={statusEffects} onToggle={(s) => toggleStatusEffect(s)} />
        <HPTracker currentHP={currentHP} maxHP={maxHP} onHPClick={(hp) => setHP(hp)} />
    </div>);
}

export const Monster = connect(
    (state, ownProps) => {
        if (ownProps.name === "Boss") {
            return {};
        }
        const monster = state.monsters[ownProps.name].monsters[ownProps.index];
        return {
            ...monster,
        };
    },
    (dispatch, ownProps) => {
      return {
        toggleStatusEffect: (s) => toggleStatusEffectAction(dispatch, ownProps.name, ownProps.index, s),
        setHP: (hp) => setHPAction(dispatch, ownProps.name, ownProps.index, hp),
      };
    },
)(MonsterComponent);

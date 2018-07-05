import React from "react";
import {connect} from "react-redux";

import {HPTracker} from "../../UnitTracking/HPTracker";
import { StatusEffectTracker } from "../../UnitTracking/StatusEffectTracker";
import { toggleStatusEffectAction, setHPAction } from "../../../store/monsters";

import "./Monster.css";

function MonsterComponent({maxHP, elite, immunities = [], statusEffects, toggleStatusEffect, setHP}) {
    //return (<div className={classNames({"Monster--Container": true, "Monster--Container--Elite": elite})}>
    return (<div>
        <StatusEffectTracker statusEffects={statusEffects} onToggle={(s) => toggleStatusEffect(s)} />
        {/* set unique key so it rerenders on maxHP change */}
        <HPTracker key={maxHP} maxHP={maxHP} onHPChange={(hp) => setHP(hp)} />
    </div>);
}

export const Monster = connect(
    (state, ownProps) => {
        if (ownProps.name === "Boss") {
            return {};
        }
        const monster = state.monsters.monsters[ownProps.name].monsters[ownProps.index];
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

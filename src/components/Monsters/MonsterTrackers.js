import React from 'react';
import {connect} from "react-redux";

import {BossMonsterTracker, MonsterTracker} from "./MonsterTracker";
import {removeMonsterAction} from "../../store/monsters";

import "./Monsters.css";

export function MonsterTrackersComponent({level, monsters, removeMonster}) {
    return (
        <div className="Monsters">
            {Object.keys(monsters).map((name) => {
                const isBoss = name === "Boss";
                return (<div key={name} className="Monsters--Monster">
                    <h5 className="Monsters--Monster--Name">{name}<button onClick={() => removeMonster(name)}>X</button></h5>
                    {isBoss ?
                        <BossMonsterTracker level={level} /> :
                        <MonsterTracker key={name} name={name} level={level} />
                    }
                </div>);
            })}
        </div>
    );
}

export const MonsterTrackers = connect(
    (state, ownProps) => {
        return {
            monsters: state.monsters,
        };
    },
    (dispatch) => {
        return {
            removeMonster: (name) => {dispatch(removeMonsterAction(name))},
        };
    },
)(MonsterTrackersComponent);

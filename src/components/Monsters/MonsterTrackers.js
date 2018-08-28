import React from 'react';
import {connect} from "react-redux";

import {BossMonsterTracker, MonsterTracker} from "./MonsterTracker";

import "./MonsterTrackers.css";

export function MonsterTrackersComponent({boss, monsterNames}) {
    return (
        <div className="Monsters">
            {boss && boss[0] && <BossMonsterTracker boss={boss[0]} />}
            {boss && boss[1] && <BossMonsterTracker boss={boss[1]} />}
            {monsterNames.map((name) => <MonsterTracker key={name} name={name} />)}
        </div>
    );
}

export const MonsterTrackers = connect(
    (state, ownProps) => {
        return {
            boss: state.boss,
            monsterNames: Object.keys(state.monsters.monsters),
        };
    }
)(MonsterTrackersComponent);

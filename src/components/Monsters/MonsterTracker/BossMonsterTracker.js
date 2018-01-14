import React from "react";

import {BOSS_LIST, BOSS_STATS} from "../../../lib/gameData";
import {Monster} from "./Monster";
import {MonsterStats} from "./MonsterStats";
import {iconForCondition} from "../../../lib/conditions";

import "./MonsterTracker.css";

export class BossMonsterTracker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedBoss: BOSS_LIST[0],
        };
    }

    selectBoss(boss) {
        this.setState({selectedBoss: boss});
    }

    render() {
        const stats = BOSS_STATS[this.state.selectedBoss][this.props.level](this.props.numPlayers);

        return (<div className="MonsterTracker">
            <select value = {this.state.selectedBoss} onChange={(event) => this.selectBoss(event.target.value)}>
                {BOSS_LIST.map((b) => <option value={b} key={b}>{b}</option>)}
            </select>
            <div className="MonsterTracker--Boss--StatsContainer"> 
                <div>
                    <MonsterStats stats={stats} />
                </div>
                <div className="MonsterTracker--Boss--Immunities">
                    <div>Immunities:</div>
                    {stats.immunities && stats.immunities.map((c, i) =>
                        <img key={i} className="MonsterTracker--Boss--Immunity" src={iconForCondition(c)} alt={`immune - ${c}`} />)}
                </div>
            </div>
            <Monster maxHP={stats.maxHP} immunities={stats.immunities} />
        </div>);
    }
}

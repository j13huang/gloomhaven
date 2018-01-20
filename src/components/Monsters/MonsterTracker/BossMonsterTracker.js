import React from "react";
import {connect} from "react-redux";

import {BOSS_LIST, BOSS_STATS} from "../../../lib/monsters";
import {Monster} from "./Monster";
import {MonsterStats} from "./MonsterStats";
import {iconForStatusEffect} from "../../../lib/statusEffects";
import {selectors as attackModifierCardsSelectors} from "../../../store/attackModifierCards";

import "./MonsterTracker.css";

export class BossMonsterTrackerComponent extends React.Component {
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
                <div className="MonsterTracker--Boss--ImmunitiesContainer">
                    <div>Immunities:</div>
                    <div className="MonsterTracker--Boss--Immunities">
                        {stats.immunities && stats.immunities.map((s) =>
                            <div key={s} className="MonsterTracker--Boss--ImmunityContainer">
                                <img className="MonsterTracker--Boss--Immunity" src={iconForStatusEffect(s)} alt={`immune - ${s}`} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/*set unique key so that we remount on player count and boss name change*/}
            <div className="MonsterTracker--Monster">
                <Monster key={`${this.state.selectedBoss}-${this.props.numPlayers}`}
                    maxHP={stats.maxHP}
                    immunities={stats.immunities}
                />
                {(stats.maxHP === 0) && <div className="MonsterTracker--Boss--Cover">Add players</div>}
            </div>
        </div>);
    }
}

export const BossMonsterTracker = connect(
    (state) => {
        return {
            numPlayers: attackModifierCardsSelectors.numPlayers(state),
        };
    },
)(BossMonsterTrackerComponent);

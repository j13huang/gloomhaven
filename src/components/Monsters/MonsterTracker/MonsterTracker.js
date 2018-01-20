import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {MONSTERS} from "../../../lib/monsters";
import {Monster} from "./Monster";
import {MonsterStats} from "./MonsterStats";
import {setActiveAction} from "../../../store/monsters";

import "./MonsterTracker.css";

class MonsterTrackerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            monsters: new Array(12).fill({alive: false, elite: false}),
        };
    }

    selectBoss(boss) {
        this.setState({selectedBoss: boss});
    }

    updateMonster(i, newMonster) {
        const newMonsters = [
            ...this.state.monsters.slice(0, i),
            {...this.state.monsters[i], ...newMonster},
            ...this.state.monsters.slice(i + 1),
        ];
        this.setState({
            monsters: newMonsters,
        });
        const wasActive = this.state.monsters.some((m) => m.alive);
        const isActive = newMonsters.some((m) => m.alive);
        if (wasActive !== isActive) {
            this.props.setActive(isActive);
        }
    }

    render() {
        const monsterStats = MONSTERS[this.props.name].stats[this.props.level];

        return (<div className="MonsterTracker">
            <div className="MonsterTracker--StatsContainer"> 
                <MonsterStats stats={monsterStats.normal} />
                <MonsterStats stats={monsterStats.elite} elite />
            </div>
            <div className="MonsterTracker--MonsterSelector">
                {this.state.monsters.map(({alive, elite}, i) =>
                    <button key={i}
                        disabled={alive}
                        className={classNames({"MonsterTracker--MonsterSelector--Alive": !alive})}
                        onClick={() => this.updateMonster(i, {alive: true})}
                    >
                        {i + 1}
                    </button>
                )}
            </div>
            {this.state.monsters.map(({alive, elite}, i) => {
                const stats = elite ? monsterStats.elite : monsterStats.normal;
                return alive && (<div key={i}>
                    <div className="MonsterTracker--Monster--Controls">
                        <div className="MonsterTracker--Monster--Number">{`${i + 1}`}</div>
                        <button onClick={() => this.updateMonster(i, {alive: false})}>Kill</button>
                        <button onClick={() => this.updateMonster(i, {elite: !elite})}>Normal/Elite</button>
                    </div>
                    {/*set unique key so that we remount on alive/elite change*/}
                    {alive && <Monster key={`${i}-${alive}-${elite}`} maxHP={stats.maxHP} elite={elite} />}
                </div>);
            })}
        </div>);
    }
}

export const MonsterTracker = connect(
    () => ({}),
    (dispatch, ownProps) => {
        return {
            setActive: (active) => {dispatch(setActiveAction(ownProps.name, active))},
        };
    },
)(MonsterTrackerComponent);

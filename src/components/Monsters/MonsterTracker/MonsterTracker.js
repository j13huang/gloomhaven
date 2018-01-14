import React from "react";

import {MONSTERS} from "../../../lib/gameData";
import {Monster} from "./Monster";
import {MonsterStats} from "./MonsterStats";

import "./MonsterTracker.css";

export class MonsterTracker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            monsters: new Array(12).fill({alive: false, elite: false}),
        };
    }

    selectBoss(boss) {
        this.setState({selectedBoss: boss});
    }

    updateMonster(index, monster) {
        /*
        const newMonster = {...monster};
        if (!newMonster.alive) {
            newMonster.elite = false;
        }
        */
        this.setState({
            monsters: [
                ...this.state.monsters.slice(0, index),
                monster,
                ...this.state.monsters.slice(index + 1),
            ],
        });
    }

    render() {
        const monsterStats = MONSTERS[this.props.name].stats[this.props.level];

        return (<div className="MonsterTracker">
            <div className="MonsterTracker--StatsContainer"> 
                <MonsterStats stats={monsterStats.normal} />
                <MonsterStats stats={monsterStats.elite} elite />
            </div>
            {this.state.monsters.map(({alive, elite}, i) => {
                const stats = elite ? monsterStats.elite : monsterStats.normal;
                return (<div key={i}>
                    <div>
                        {`${i + 1} - Current status: `}
                        <button onClick={() => this.updateMonster(i, {alive: !alive, elite})}>{alive ? "Alive" : "Dead"}</button>
                        <button onClick={() => this.updateMonster(i, {alive, elite: !elite})}>{elite ? "Elite" : "Normal"}</button>
                    </div>
                    {/*set unique key so that we remount on alive/elite change*/}
                    {alive && <Monster key={`${i}-${alive}-${elite}`} maxHP={stats.maxHP} elite={elite} />}
                </div>);
            })}
        </div>);
    }
}
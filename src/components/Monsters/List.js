import React from 'react';
import {connect} from "react-redux";

import {BOSS_LIST, MONSTER_LIST} from "../../lib/monsters";
import {addMonstersAction, resetMonstersAction} from "../../store/actions/monsters";
import {setBossAction} from "../../store/actions/boss";
import {selectors as playersSelectors} from "../../store/players";

import "./List.css";

class ListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            selectedMonsters: [],
            selectedBoss: BOSS_LIST[0],
        };
    }

    selectBoss(boss) {
        this.setState({selectedBoss: boss});
    }

    handleMonsterSelection(options) {
        const selectedMonsters = [];
        for (const o of options) {
            if (o.selected) {
                selectedMonsters.push(o.value)
            }
        }
        this.setState({selectedMonsters})
    }

    render() {
        const searchResults = MONSTER_LIST.filter((name) => name.toLowerCase().includes(this.state.search));
        return (<div className="Monsters--List">
            <div >Scenario Level: {this.props.scenarioLevel}</div>
            <div>
                <select disabled={this.props.boss} value={this.state.selectedBoss} onChange={(event) => this.selectBoss(event.target.value)}>
                    {BOSS_LIST.map((b) => <option value={b} key={b}>{b}</option>)}
                </select>
                <button disabled={this.props.boss} onClick={() => this.props.addBoss(this.state.selectedBoss, this.props.scenarioLevel, this.props.numPlayers)}>Add Boss</button>
            </div>
            <input
                value={this.state.search}
                onChange={(e) => this.setState({search: e.target.value})}
                placeholder="search..."
            />
            <select size="20" onChange={(e) => this.handleMonsterSelection(e.target.options)} multiple value={this.state.selectedMonsters}>
                {searchResults.map((name) => <option
                    value={name}
                    key={name}
                    disabled={this.props.monstersInPlay.includes(name)}
                >{name}</option>)}
            </select>
            <button onClick={() => this.props.addMonsters(this.state.selectedMonsters, this.props.scenarioLevel)}>Add Monster(s)</button>
            <button className="Monsters--List--ResetButton" onClick={() => this.props.resetMonsters()}>Reset</button>
            {(this.props.numPlayers === 0) && <div className="Monsters--List--Cover">Add Players</div>}
        </div>);
    }
}

export const List = connect(
    (state) => {
        return {
            monstersInPlay: Object.keys(state.monsters),
            boss: state.boss,
            scenarioLevel: playersSelectors.scenarioLevel(state),
            numPlayers: playersSelectors.numPlayers(state),
        };
    },
    (dispatch, ownProps) => {
        return {
            addBoss: (name, scenarioLevel, numPlayers) => {dispatch(setBossAction(name, scenarioLevel, numPlayers))},
            addMonsters: (monsterNames, scenarioLevel) => {dispatch(addMonstersAction(monsterNames, scenarioLevel))},
            resetMonsters: (monsterNames) => {dispatch(resetMonstersAction(monsterNames))},
        };
    },
)(ListComponent);

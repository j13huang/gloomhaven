import React from 'react';

import * as constants from "./constants";

import "./List.css";

export class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
        };
    }

    handleMonsterSelection(options) {
        const selectedMonsters = [];
        for (const o of options) {
            if (o.selected) {
                selectedMonsters.push(o.value)
            }
        }
        this.setState({selectedMonsters,})
    }

    render() {
        const searchResults = constants.MONSTER_LIST.filter((name) => name.toLowerCase().includes(this.state.search));
        return (
            <div className="MonsterList">
                <input
                    value={this.state.search}
                    onChange={(e) => this.setState({search: e.target.value})}
                />
                <select size="10" onChange={(e) => this.handleMonsterSelection(e.target.options)} multiple >
                    {searchResults.map((name) => <option value={name} key={name} disabled={this.props.selectedMonsters.includes(name)}>{name}</option>)}
                </select>
                <button onClick={() => this.props.onAddMonsters(this.state.selectedMonsters)}>Add Monster</button>
            </div>
        );
    }
}
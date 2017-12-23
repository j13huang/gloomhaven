import React from 'react';

import "./List.css";

export class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: "",
            selectedMonsters: [],
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

    addMonsters() {
        this.props.onAddMonsters(this.state.selectedMonsters);
        this.setState({selectedMonsters: []})
    }

    render() {
        const searchResults = this.props.monsterList.filter((name) => name.toLowerCase().includes(this.state.search));
        return (
            <div className="Monsters--List">
                <input
                    value={this.state.search}
                    onChange={(e) => this.setState({search: e.target.value})}
                    placeholder="search..."
                />
                <select size="10" onChange={(e) => this.handleMonsterSelection(e.target.options)} multiple value={this.state.selectedMonsters}>
                    {searchResults.map((name) => <option
                        value={name}
                        key={name}
                        disabled={this.props.monstersInPlay.includes(name)}
                    >{name}</option>)}
                </select>
                <button onClick={() => this.addMonsters()}>Add Monster(s)</button>
                <button onClick={() => this.props.onReset()}>Reset</button>
            </div>
        );
    }
}
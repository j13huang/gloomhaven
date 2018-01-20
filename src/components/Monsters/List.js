import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {MONSTER_LIST} from "../../lib/monsters";
import { addMonstersAction } from "../../store/monsters";

import "./List.css";

class ListComponent extends React.Component {
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
        this.setState({selectedMonsters})
    }

    render() {
        const searchResults = MONSTER_LIST.filter((name) => name.toLowerCase().includes(this.state.search));
        return (<div className="Monsters--List">
            <input
                value={this.state.search}
                onChange={(e) => this.setState({search: e.target.value})}
                placeholder="search..."
            />
            <select size="20" onChange={(e) => this.handleMonsterSelection(e.target.options)} multiple value={this.state.selectedMonsters}>
                {searchResults.map((name) => <option
                    className={classNames({"Monsters--List--Boss": name === "Boss"})}
                    value={name}
                    key={name}
                    disabled={this.props.monstersInPlay.includes(name)}
                >{name}</option>)}
            </select>
            <button onClick={() => this.props.addMonsters(this.state.selectedMonsters)}>Add Monster(s)</button>
        </div>);
    }
}

export const List = connect(
    () => ({}),
    (dispatch) => {
        return {
            addMonsters: (monsterNames) => {dispatch(addMonstersAction(monsterNames))},
        };
    },
)(ListComponent);

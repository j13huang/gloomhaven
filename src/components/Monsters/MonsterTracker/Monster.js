import React from "react";
import * as classNames from "classnames";

import {CONDITIONS, iconForCondition} from "../../../lib/conditions";

import "./Monster.css";

export class Monster extends React.Component {
    constructor(props) {
        super(props);

        const conditions = CONDITIONS.reduce((acc, c) => {acc[c] = false; return acc;}, {});
        this.state = {
            hp: props.maxHP,
            conditions,
        };
    }

    setHP(hp) {
        this.setState({hp: hp <= this.state.hp ? hp - 1 : hp});
    }

    toggleCondition(condition) {
        this.setState({
            conditions: {
                ...this.state.conditions,
                [condition]: !this.state.conditions[condition],
            },
        });
    }

    render() {
        return (
            <div className={classNames({"Monster": true, "Monster--Elite": this.props.elite})}>
                <div className="Monster--HP--Container">
                    <div>HP:</div>
                    <div className="Monster--HP--Bars">
                        {new Array(this.props.maxHP).fill().map((_, i) => {
                            const hp = i + 1;
                            return (<div key={hp}
                                className={classNames({"Monster--HP": true, "Monster--HP--Active": hp <= this.state.hp})}
                                onClick={() => this.setHP(hp)}
                            >
                            </div>);
                        })}
                    </div>
                </div>
                <div className="Monster--Conditions">
                    {Object.keys(this.state.conditions).map((c, i) => {
                        const active = this.state.conditions[c];
                        const immune = this.props.immunities && this.props.immunities.includes(c);
                        return (<div key={i} className={classNames({"Monster--Condition--Container": true, "Monster--Condition--Immune": immune})}>
                            <img
                                src={iconForCondition(c)}
                                className={classNames({"Monster--Condition": true, "Monster--Condition--Inactive": !active})}
                                alt={`${c} - ${active ? "active" : "inactive"}`}
                                onClick={() => !immune && this.toggleCondition(c)}
                            />
                        </div>);
                    })}
                </div>
            </div>
        );
    }
}
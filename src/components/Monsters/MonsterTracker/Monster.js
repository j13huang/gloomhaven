import React from "react";
import * as classNames from "classnames";

import {STATUS_EFFECTS, iconForStatusEffect} from "../../../lib/statusEffects";

import "./Monster.css";

export class Monster extends React.Component {
    constructor(props) {
        super(props);

        const statusEffects = STATUS_EFFECTS.reduce((acc, s) => {acc[s] = false; return acc;}, {});
        this.state = {
            hp: props.maxHP,
            statusEffects,
        };
    }

    setHP(hp) {
        //this.setState({hp: hp <= this.state.hp ? hp - 1 : hp});
        this.setState({hp});
    }

    toggleStatusEffect(statusEffect) {
        this.setState({
            statusEffects: {
                ...this.state.statusEffects,
                [statusEffect]: !this.state.statusEffects[statusEffect],
            },
        });
    }

    render() {
        return (<div className={classNames({"Monster": true, "Monster--Elite": this.props.elite})}>
            <div className="Monster--StatusEffects">
                {Object.keys(this.state.statusEffects).map((s, i) => {
                    const active = this.state.statusEffects[s];
                    const immune = this.props.immunities && this.props.immunities.includes(s);
                    return (<div key={i} className={classNames({"Monster--StatusEffect--Container": true, "Monster--StatusEffect--Immune": immune})}>
                        <img
                            src={iconForStatusEffect(s)}
                            className={classNames({"Monster--StatusEffect": true, "Monster--StatusEffect--Inactive": !active})}
                            alt={`${s} - ${active ? "active" : "inactive"}`}
                            onClick={() => !immune && this.toggleStatusEffect(s)}
                        />
                    </div>);
                })}
            </div>
            <div className="Monster--HP--Container">
                <div>HP:</div>
                {(this.props.maxHP > 0) &&
                    <div className="Monster--HP--Bars">
                        {new Array(this.props.maxHP).fill().map((_, i) => {
                            const hp = i + 1;
                            return (<div key={hp}
                                className={classNames({"Monster--HP": true, "Monster--HP--Active": hp <= this.state.hp})}
                                onClick={() => this.setHP(hp)}
                            >
                                {hp}
                            </div>);
                        })}
                    </div>}
            </div>
        </div>);
    }
}
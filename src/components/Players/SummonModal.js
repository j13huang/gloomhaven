import React from "react";
import {connect} from "react-redux";
import Modal from "react-modal"

import {HEALTH, MOVEMENT, ATTACK, RANGE, iconForStat} from "../../lib/stats";
import { baseStats, addSummonAction } from "../../store/summons";

import "./SummonModal.css";

class SummonModalComponent extends React.Component {
    constructor(props) {
        super(props);

        // taken from https://github.com/reactjs/react-modal/tree/v3.1.11#examples
        this.customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
              }
        };
        this.state = {
            ...baseStats,
        };
    }

    updateSummon(input) {
        this.setState(input);
    }

    render() {
        return (<Modal isOpen onRequestClose={() => this.props.onClose()} contentLabel="Summon" style={this.customStyles}>
            <h3 className="SummonModal--Title">Summon</h3>
            <div className="SummonModal--Title--PlayerName">{this.props.name}</div>
            <div className="SummonContainer">
                <input
                    placeholder="Name"
                    value={this.state.name}
                    onChange={(e) => this.updateSummon({name: e.target.value})}
                />
                <div className="SummonModal--Summon--StatsContainer">
                    <div className="SummonModal--Summon--StatsColumn">
                        <label className="SummonModal--Summon--Stat">
                            <img className="SummonModal--Stat--Icon" src={iconForStat(HEALTH)} alt="hp"/>
                            <select
                                value={this.state.hp}
                                onChange={(e) => {
                                    const hp = parseInt(e.target.value, 10);
                                    this.updateSummon({hp});
                                }}
                            >
                                {new Array(30).fill().map((_, i) => {
                                    const num = i + 1;
                                    return (<option key={num} value={num}>{num}</option>);
                                })}
                            </select>
                        </label>
                        <label className="SummonModal--Summon--Stat">
                            <img className="SummonModal--Stat--Icon" src={iconForStat(ATTACK)} alt="attack"/>
                            <select
                                value={this.state.attack}
                                onChange={(e) => this.updateSummon({attack: parseInt(e.target.value, 10)})}
                            >
                                {new Array(11).fill().map((_, i) => {
                                    const num = i;
                                    return (<option key={num} value={num}>{num}</option>);
                                })}
                            </select>
                        </label>
                    </div>
                    <div className="SummonModal--Summon--StatsColumn">
                        <label className="SummonModal--Summon--Stat">
                            <img className="SummonModal--Stat--Icon" src={iconForStat(MOVEMENT)} alt="movement"/>
                            <select
                                value={this.state.movement}
                                onChange={(e) => this.updateSummon({movement: parseInt(e.target.value, 10)})}
                            >
                                {new Array(11).fill().map((_, i) => {
                                    const num = i;
                                    return (<option key={num} value={num}>{num}</option>);
                                })}
                            </select>
                        </label>
                        <label className="SummonModal--Summon--Stat">
                            <img className="SummonModal--Stat--Icon" src={iconForStat(RANGE)} alt="range"/>
                            <select
                                value={this.state.range}
                                onChange={(e) => this.updateSummon({range: parseInt(e.target.value, 10)})}
                            >
                                {new Array(11).fill().map((_, i) => {
                                    const num = i;
                                    return (<option key={num} value={num}>{num}</option>);
                                })}
                            </select>
                        </label>
                    </div>
                </div>
                <div>
                    <input
                        placeholder="Notes"
                        value={this.state.extra}
                        onChange={(e) => this.updateSummon({extra: e.target.value})}
                    />
                </div>
            </div>
            <div className="SummonModal--Summon--Buttons">
                <button onClick={() => this.props.onClose()}>Close</button>
                <button onClick={() => {
                    this.props.summon(this.state);
                    this.props.onClose();
                }}>Summon</button>
            </div>
        </Modal>);
    }
}

export const SummonModal = connect(
    (state, ownProps) => {
        return {
        };
    },
    (dispatch, ownProps) => {
        return {
            summon: (summon) => addSummonAction(dispatch, ownProps.name, summon),
        };
    },
)(SummonModalComponent);
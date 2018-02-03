import React from "react";
import {connect} from "react-redux";
import Modal from "react-modal"

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
                <label>Name:
                    <input
                        value={this.state.name}
                        onChange={(e) => this.updateSummon({name: e.target.value})}
                    />
                </label>
                <div className="SummonModal--Summon">
                    <div className="SummonModal--SummonSection">
                        <div>
                            <label>HP:
                                <select
                                    value={this.state.hp}
                                    onChange={(e) => {
                                        const hp = parseInt(e.target.value, 10);
                                        this.updateSummon({hp});
                                    }}
                                >
                                    {new Array(100).fill().map((_, i) => {
                                        const num = i + 1;
                                        return (<option key={num} value={num}>{num}</option>);
                                    })}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>Movement:
                                <select
                                    value={this.state.movement}
                                    onChange={(e) => this.updateSummon({movement: parseInt(e.target.value, 10)})}
                                >
                                    {new Array(9).fill().map((_, i) => {
                                        const num = i;
                                        return (<option key={num} value={num}>{num}</option>);
                                    })}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="SummonModal--SummonSection">
                        <div>
                            <label>Attack:
                                <select
                                    value={this.state.attack}
                                    onChange={(e) => this.updateSummon({attack: parseInt(e.target.value, 10)})}
                                >
                                    {new Array(9).fill().map((_, i) => {
                                        const num = i;
                                        return (<option key={num} value={num}>{num}</option>);
                                    })}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>Range:
                                <select
                                    value={this.state.range}
                                    onChange={(e) => this.updateSummon({range: parseInt(e.target.value, 10)})}
                                >
                                    {new Array(9).fill().map((_, i) => {
                                        const num = i;
                                        return (<option key={num} value={num}>{num}</option>);
                                    })}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>Notes:
                            <input
                                value={this.state.extra}
                                onChange={(e) => this.updateSummon({extra: e.target.value})}
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div>
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
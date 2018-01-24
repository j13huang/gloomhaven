import React from "react";
import {connect} from "react-redux";
import debounce from "lodash/debounce";

import "./SummonCreator.css";
import { updateSummonInputAction } from "../../store/players";

function SummonCreatorComponent({summonInput, updateSummonInput}) {
    const hpSelectID = `aaaa`;
    const movementSelectID = `bbb`;
    const attackSelectID = `ccc`;
    const rangeSelectID = `ddd`;
    return (<div className="SummonContainer">
        Summon:
        <input
            value={summonInput.name}
            onChange={(e) => {
                console.log(e.target.value);
                debounce(() => updateSummonInput({name: e.target.value}), 200);
            }}
        />
        <div className="SummonCreator--Summon">
            <div className="SummonCreator--SummonSection">
                <div>
                    <label htmlFor={hpSelectID}>HP: </label>
                    <select
                        id={hpSelectID}
                        value={summonInput.hp}
                        onChange={(event) => updateSummonInput({summonInput, hp: parseInt(event.target.value, 10)})}
                    >
                        {new Array(9).fill().map((_, i) => {
                            const num = i + 1;
                            return (<option key={num} value={num}>{num}</option>);
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor={movementSelectID}>Movement: </label>
                    <select
                        id={movementSelectID}
                        value={summonInput.movement}
                        onChange={(event) => updateSummonInput({summonInput, movement: parseInt(event.target.value, 10)})}
                    >
                        {new Array(9).fill().map((_, i) => {
                            const num = i + 1;
                            return (<option key={num} value={num}>{num}</option>);
                        })}
                    </select>
                </div>
            </div>
            <div className="SummonCreator--SummonSection">
                <div>
                    <label htmlFor={attackSelectID}>Attack: </label>
                    <select
                        id={attackSelectID}
                        value={summonInput.attack}
                        onChange={(event) => updateSummonInput({summonInput, attack: parseInt(event.target.value, 10)})}
                    >
                        {new Array(9).fill().map((_, i) => {
                            const num = i + 1;
                            return (<option key={num} value={num}>{num}</option>);
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor={rangeSelectID}>Range: </label>
                    <select
                        id={rangeSelectID}
                        value={summonInput.range}
                        onChange={(event) => updateSummonInput({summonInput, range: parseInt(event.target.value, 10)})}
                    >
                        {new Array(9).fill().map((_, i) => {
                            const num = i + 1;
                            return (<option key={num} value={num}>{num}</option>);
                        })}
                    </select>
                </div>
            </div>
            <div>
                Notes:
                <input
                    value={summonInput.extra}
                    onChange={(e) => updateSummonInput({extra: e.target.value})}
                />
            </div>
        </div>
    </div>);
}

export const SummonCreator = connect(
    (state) => {
        return {
            summonInput: state.players.summonInput,
        };
    },
    (dispatch) => {
        return {
            updateSummonInput: (summonInput) => dispatch(updateSummonInputAction(summonInput)),
        };
    },
)(SummonCreatorComponent);
import React from "react";
import {connect} from "react-redux";

import {BonusSelectors} from "../Bonuses";
import {StatusEffectTracker} from "../StatusEffectTracker";
import {HPTracker} from "../HPTracker";
import {setLevelAction, toggleStatusEffectAction, setHPAction} from "../../../store/players";
import {removePlayerAction} from "../../../store/actions/players";
import {selectors as monstersSelectors} from "../../../store/monsters";

import "./PlayerTracker.css";

class PlayerTrackerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xp: 0,
        };
    }

    setXP(xp) {
        if (xp < 0) {
            return;
        }
        this.setState({
            xp,
        })
    }

    render() {
        const levelSelectID = `Player-${this.props.name}-LevelSelect`;
        return (<div>
            <h5 className="PlayerTracker--Name">
                {this.props.name}
                {!this.props.hasMonstersInPlay &&
                    <button onClick={() => this.props.removePlayer()}>
                        X
                    </button>
                }
            </h5>
            {/*
                <div>
                    <select>
                    </select>
                    <button>Summon</button>
                </div>
            */}
            <div className="PlayerTracker">
                <div>
                    <label className="" htmlFor={levelSelectID}>Level: </label>
                    <select
                        id={levelSelectID}
                        disabled={this.props.hasMonstersInPlay}
                        value={this.props.level}
                        onChange={(event) => this.props.selectLevel(parseInt(event.target.value, 10))}
                    >
                        {new Array(9).fill().map((_, i) => {
                            const level = i + 1;
                            return (<option key={level} value={level}>{level}</option>);
                        })}
                    </select>
                </div>
                <div className="PlayerTracker--XP">
                    XP:
                    <button disabled={this.state.xp === 0} onClick={() => this.setXP(this.state.xp - 1)}>-</button>
                    {this.state.xp}
                    <button onClick={() => this.setXP(this.state.xp + 1)}>+</button>
                </div>
                <BonusSelectors />
                <StatusEffectTracker
                    statusEffects={this.props.player.statusEffects}
                    onToggle={(s) => this.props.toggleStatusEffect(s)} />
                {/* unique key on level so that when the level changes the hp gets rerendered */}
                <HPTracker
                    currentHP={this.props.player.hp}
                    maxHP={this.props.player.maxHP}
                    onHPClick={(hp) => (this.props.player.hp !== hp) && this.props.setHP(hp)}
                />
            </div>
        </div>);
    }
}

export const PlayerTracker = connect(
    (state, ownProps) => {
        return {
            player: state.players[ownProps.name],
            hasMonstersInPlay: monstersSelectors.hasMonstersInPlay(state),
        };
    },
    (dispatch, ownProps) => {
        return {
            selectLevel: (level) => dispatch(setLevelAction(ownProps.name, level)),
            removePlayer: () => dispatch(removePlayerAction(ownProps.name)),
            toggleStatusEffect: (statusEffect) => dispatch(toggleStatusEffectAction(ownProps.name, statusEffect)),
            setHP: (hp) => dispatch(setHPAction(ownProps.name, hp)),
        };
    },
)(PlayerTrackerComponent);

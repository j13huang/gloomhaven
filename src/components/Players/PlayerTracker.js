import React from "react";
import {connect} from "react-redux";

import xpIcon from "./xp.svg";
//import xpIcon from "./xp_white.svg";
import {PerksModal} from "./PerksModal";
import {SummonModal} from "./SummonModal";
import {SummonTrackers} from "../Summons/SummonTrackers";
import {BonusSelectors} from "../UnitTracking/BonusSelectors";
import {StatusEffectTracker} from "../UnitTracking/StatusEffectTracker";
import {HPTracker} from "../UnitTracking/HPTracker";
import {setLevelAction, toggleStatusEffectAction, setHPAction} from "../../store/players";
import {removePlayerAction} from "../../store/actions/players";
import {selectors as monstersSelectors} from "../../store/monsters";

import "./PlayerTracker.css";

class PlayerTrackerComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            xp: 0,
            showPerksModal: false,
            showSummonModal: false,
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

    togglePerksModal(showPerksModal) {
        this.setState({
            showPerksModal,
        })
    }


    toggleSummonModal(showSummonModal) {
        this.setState({
            showSummonModal,
        })
    }

    render() {
        return (<div className="PlayerTracker--Container">
            <h5 className="PlayerTracker--Name">
                {this.props.name}
                {!this.props.hasMonstersInPlay &&
                    <button onClick={() => this.props.removePlayer()}>X</button>
                }
            </h5>
            <div className="PlayerTracker--Class">{this.props.player.class}</div>
            <div className="PlayerTracker--Description">
                <button className="PlayerTracker--Summon--Button" onClick={() => this.toggleSummonModal(!this.state.showSummonModal)}>Summon</button>
                {this.state.showSummonModal && <SummonModal name={this.props.name} onClose={() => this.toggleSummonModal(false)} />}
                <button className="PlayerTracker--Perks--Button" onClick={() => this.togglePerksModal(!this.state.showPerksModal)}>Edit Deck</button>
                {this.state.showPerksModal && <PerksModal name={this.props.name} onClose={() => this.togglePerksModal(false)} />}
                <div className="PlayerTracker--LevelSelector">
                    <label>Level:
                        <select
                            disabled={this.props.hasMonstersInPlay}
                            value={this.props.player.level}
                            onChange={(event) => this.props.selectLevel(parseInt(event.target.value, 10))}
                        >
                            {new Array(9).fill().map((_, i) => {
                                const level = i + 1;
                                return (<option key={level} value={level}>{level}</option>);
                            })}
                        </select>
                    </label>
                </div>
            </div>
            <div className="PlayerTracker">
                <div className="PlayerTracker--Stats">
                    <div className="PlayerTracker--XP">
                        <img className="PlayerTracker--XP--Icon" src={xpIcon} alt="xp" />
                        <div className="PlayerTracker--XP--Buttons">
                            <button disabled={this.state.xp === 0} onClick={() => this.setXP(this.state.xp - 1)}>-</button>
                            {this.state.xp}
                            <button onClick={() => this.setXP(this.state.xp + 1)}>+</button>
                        </div>
                    </div>
                    <BonusSelectors />
                </div>
                <StatusEffectTracker
                    statusEffects={this.props.player.statusEffects}
                    onToggle={(s) => this.props.toggleStatusEffect(s)} />
                {/* unique key on maxHP so that when the level changes the hp gets rerendered */}
                <HPTracker key={this.props.player.maxHP}
                    currentHP={this.props.player.hp}
                    maxHP={this.props.player.maxHP}
                    onHPChange={(hp) => (this.props.player.hp !== hp) && this.props.setHP(hp)}
                />
            </div>
            <div className="PlayerTracker--Summons">
                <SummonTrackers name={this.props.name} />
            </div>
        </div>);
    }
}

export const PlayerTracker = connect(
    (state, ownProps) => {
        return {
            player: state.players.players[ownProps.name],
            hasMonstersInPlay: monstersSelectors.hasMonstersInPlay(state),
        };
    },
    (dispatch, ownProps) => {
        return {
            selectLevel: (level) => setLevelAction(dispatch, ownProps.name, level),
            removePlayer: () => removePlayerAction(dispatch, ownProps.name),
            toggleStatusEffect: (statusEffect) => toggleStatusEffectAction(dispatch, ownProps.name, statusEffect),
            setHP: (hp) => setHPAction(dispatch, ownProps.name, hp),
        };
    },
)(PlayerTrackerComponent);

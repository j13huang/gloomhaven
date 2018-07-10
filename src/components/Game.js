import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {Header} from "./Header/Header"
import {PartyManager} from "./PartyManager"
import {List as MonsterList} from "./Monsters/List"
import {PlayerTrackers} from "./Players/PlayerTrackers"
import {Deck as AttackModifierDeck} from "./AttackModifierDecks/Deck"
import curseCard from "./AttackModifierDecks/curse.jpg";
import blessCard from "./AttackModifierDecks/bless.jpg";
import {MonsterDecks} from "./Monsters/MonsterDecks"
import {MonsterTrackers} from "./Monsters/MonsterTrackers"
import {selectors as attackModifierDecksSelectors} from "../store/attackModifierDecks";
import {selectors as playersSelectors} from "../store/players";
import {selectors as monstersSelectors} from "../store/monsters";
import {addPlayerAction} from "../store/actions/players";

import "./Game.css";

class GameComponent extends React.Component {
    static getDerivedStateFromProps(props, state) {
        if (props.playerNames && !props.playerNames.includes(state.selectedAttackModifierDeck)) {
            return {
                selectedAttackModifierDeck: "Monsters",
            }
        }

        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            selectedClass: "",
            duplicateNameWarning: false,
            showSections: {
                players: true,
                attackModifierDecks: true,
                monsterList: true,
                monsterDecks: true,
                monsters: true,
            },
            showStats: true,
            showInitiativeTimeline: false,
            selectedAttackModifierDeck: "Monsters",
        };
    }

    toggleSection(section) {
        this.setState({
            showSections: {
                ...this.state.showSections,
                [section]: !this.state.showSections[section],
            },
        });
    }

    toggleInitiativeTimeline() {
        this.setState({
            showInitiativeTimeline: !this.state.showInitiativeTimeline,
        });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="Game--container">
                    <div className="Game--leftSection">
                        <h3 className="Game--Section--Toggle" onClick={() => this.toggleSection("monsterList")}>Add Monsters <span className="Game--Section--ToggleSymbol">{this.state.showSections.monsterList ? "▾" : "▸"}</span></h3>
                        <div className={classNames({"Game--Section--monsterList": true, "Game--Section--hideSection": !this.state.showSections.monsterList})}>
                            <MonsterList />
                        </div>
                        <h3 className="Game--Section--Toggle" onClick={() => this.toggleSection("attackModifierDecks")}>Attack Modifier Decks <span className="Game--Section--ToggleSymbol">{this.state.showSections.attackModifierDecks ? "▾" : "▸"}</span></h3>
                        <div className={classNames({"Game--Section--hideSection": !this.state.showSections.attackModifierDecks})}>
                            <div>
                                <div className="Game--SpecialCardCount--Container">
                                    Blessing card count:
                                    <div className="Game--SpecialCardCount">
                                        <img className="Game--SpecialCardCount--Icon" src={blessCard} alt="blessing cards"/>
                                        <div>{`(${this.props.totalBlessings})`}</div>
                                    </div>
                                </div>
                                <div className="Game--SpecialCardCount--Container">
                                    Player curse count:
                                    <div className="Game--SpecialCardCount">
                                        <img className="Game--SpecialCardCount--Icon" src={curseCard} alt="curse cards"/>
                                        <div>{`(${this.props.totalCurses})`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="Game--AttackModifierDecks">
                                {["Monsters"].concat(this.props.playerNames).map((name) => {
                                    const selected = this.state.selectedAttackModifierDeck === name;
                                    return (<label key={name} className={classNames({
                                        "Game--Monsters--attackModifierDeckSelect": true,
                                        "Game--select": true,
                                        "Game--select--active": selected,
                                    })}>
                                        <input type="radio" checked={selected} onChange={() => this.setState({selectedAttackModifierDeck: name})} />
                                        {name}
                                    </label>);
                                })}
                            </div>
                            {/* add key to redraw every time deck changes */}
                            <AttackModifierDeck key={this.state.selectedAttackModifierDeck} name={this.state.selectedAttackModifierDeck} />
                        </div>
                    </div>
                    <div>
                        <div className="Game--Section">
                            <h3 className="Game--Section--Toggle" onClick={() => this.toggleSection("players")}>Players <span className="Game--Section--ToggleSymbol">{this.state.showSections.players ? "▾" : "▸"}</span></h3>
                            <PartyManager />
                            <div className={classNames({"Game--Section--hideSection": !this.state.showSections.players})}>
                                <PlayerTrackers />
                            </div>
                        </div>
                        <div className="Game--Section">
                            <h3 className="Game--Section--Toggle" onClick={() => this.toggleSection("monsters")}>Monsters <span className="Game--Section--ToggleSymbol">{this.state.showSections.monsters ? "▾" : "▸"}</span></h3>
                            <div className={classNames({"Game--Section--hideSection": !this.state.showSections.monsters})}>
                                <MonsterTrackers />
                            </div>
                        </div>
                        <div className="Game--Section">
                            <h3 className="Game--Section--Toggle" onClick={() => this.toggleSection("monsterDecks")}>Monster Cards <span className="Game--Section--ToggleSymbol">{this.state.showSections.monsterDecks ? "▾" : "▸"}</span></h3>
                            {/*
                            <ul className={classNames({"Game--original": true, "Game--test": this.state.showStats})}>
                                {this.state.showStats && new Array(9).fill().map((_, i) => {
                                    return (<li key={i}>item {i}</li>);
                                })}
                            </ul>
                            */}
                            <div className="Game--Monsters--StatsToggleContainer">
                                <label className={classNames({
                                    "Game--Monsters--StatsToggle": true,
                                    "Game--select": true,
                                    "Game--select--active": !this.state.showStats,
                                })}>
                                    <input type="radio" checked={!this.state.showStats} onChange={() => this.setState({showStats: false})} />
                                    Hide stats
                                </label>
                                <label className={classNames({
                                    "Game--Monsters--StatsToggle": true,
                                    "Game--select": true,
                                    "Game--select--active": this.state.showStats,
                                })}>
                                    <input type="radio" checked={this.state.showStats} onChange={() => this.setState({showStats: true})} />
                                    Show stats
                                </label>
                            </div>
                            <div className={classNames({"Game--Section--hideSection": !this.state.showSections.monsterDecks})}>
                                <MonsterDecks showStats={this.state.showStats} showTimeline={this.state.showInitiativeTimeline} toggleTimeline={() => this.toggleInitiativeTimeline()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const Game = connect(
    (state, ownProps) => {
        return {
            selectableClasses: playersSelectors.selectableClasses(state),
            playerNames: Object.keys(state.players.players),
            hasMonstersInPlay: monstersSelectors.hasMonstersInPlay(state),
            totalCurses: attackModifierDecksSelectors.totalCurses(state),
            totalBlessings: attackModifierDecksSelectors.totalBlessings(state),
        };
    },
    (dispatch, ownProps) => ({
        addPlayer: (name, characterClass) => addPlayerAction(dispatch, name, characterClass, 0),
    }),
)(GameComponent);

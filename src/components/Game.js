import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import {Header} from "./Header/Header"
import {Party} from "./Party"
import {PlayerTrackers} from "./Players/PlayerTrackers"
import {Deck as AttackModifierDeck} from "./AttackModifierDecks/Deck"
import curseCard from "./AttackModifierDecks/curse.jpg";
import blessCard from "./AttackModifierDecks/bless.jpg";
import {MonsterDecks} from "./Monsters/MonsterDecks"
import {MonsterTrackers} from "./Monsters/MonsterTrackers"
import { selectors as attackModifierDecksSelectors } from "../store/attackModifierDecks";
import {selectors as playersSelectors} from "../store/players";
import {selectors as monstersSelectors} from "../store/monsters";
import {addPlayerAction} from "../store/actions/players";

import "./Game.css";

class GameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            selectedClass: "",
            duplicateNameWarning: false,
            showSections: {
                players: true,
                attackModifierDecks: true,
                monsterDecks: true,
                monsters: true,
            },
            showStats: true,
            showInitiativeTimeline: false,
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

    playerNameInputChange(input) {
        this.setState({
            playerNameInput: input,
            duplicateNameWarning: this.props.playerNames.includes(input),
        });
    }

    selectClass(selectedClass) {
        this.setState({
            selectedClass,
        });
    }

    canAddPlayer() {
        return !this.props.hasMonstersInPlay &&
            this.state.selectedClass &&
            //this.props.playerNames.length < 4 &&
            this.state.playerNameInput !== "" &&
            !this.state.duplicateNameWarning;
    }

    addPlayer(name, selectedClass) {
        if (!this.canAddPlayer()) {
            return;
        }
        this.setState({
            playerNameInput: "",
            selectedClass: "",
        });
        this.props.addPlayer(name, selectedClass);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="Game--Section">
                    <h3 className="Game--Section--Toggle" onClick={() => this.toggleSection("players")}>Players <span className="Game--Section--ToggleSymbol">{this.state.showSections.players ? "▾" : "▸"}</span></h3>
                    <div className="Game--Players">
                        <div>
                            <input
                                placeholder="Name"
                                disabled={this.props.hasMonstersInPlay}
                                // || this.props.playerNames.length === 4}
                                value={this.state.playerNameInput}
                                onChange={(e) => this.playerNameInputChange(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        this.addPlayer(this.state.playerNameInput, this.state.selectedClass);
                                    }
                                }}
                            />
                            <select
                                disabled={this.props.hasMonstersInPlay}
                                // || this.props.playerNames.length === 4}
                                value={this.state.selectedClass}
                                onChange={(event) => this.selectClass(event.target.value)}
                            >
                                <option value="">Select a class...</option>
                                {this.props.selectableClasses.map((c) => <option value={c} key={c}>{c}</option>)}
                            </select>
                            <button
                                disabled={!this.canAddPlayer()}
                                onClick={() => this.addPlayer(this.state.playerNameInput, this.state.selectedClass)}
                            >Add Player</button>
                            {/*<button onClick={() => this.props.resetPlayers()}>Reset</button>*/}
                        </div>
                        <div>
                            <Party />
                        </div>
                    </div>
                    {this.state.duplicateNameWarning &&
                        <div className="Game--DuplicatePlayerWarning">A player with that name already exists</div>}
                    <div className={classNames({"Game--Section--HidePlayers": !this.state.showSections.players})}>
                        <PlayerTrackers />
                    </div>
                </div>
                <div className="Game--Section">
                    <h3 className="Game--Section--Toggle" onClick={() => this.toggleSection("attackModifierDecks")}>Attack Modifier Decks <span className="Game--Section--ToggleSymbol">{this.state.showSections.attackModifierDecks ? "▾" : "▸"}</span></h3>
                    <div className={classNames({"Game--Section--HidePlayers": !this.state.showSections.attackModifierDecks})}>
                        <div className="Game--SpecialCardCount--Container">
                            Blessing card count:
                            <div className="Game--SpecialCardCount">
                                <img className="Game--SpecialCardCount--Icon" src={blessCard} alt="blessing cards"/>
                                <div>{`(${this.props.totalBlessings})`}</div>
                            </div>
                            Player curse count:
                            <div className="Game--SpecialCardCount">
                                <img className="Game--SpecialCardCount--Icon" src={curseCard} alt="curse cards"/>
                                <div>{`(${this.props.totalCurses})`}</div>
                            </div>
                        </div>
                        <div className="Game--AttackModifierDecks">
                            {["Monsters"].concat(this.props.playerNames).map((name) => {
                                return <AttackModifierDeck key={name} name={name} />
                            })}
                        </div>
                    </div>
                </div>
                <div className="Game--Section">
                    <h3 className="Game--Section--Toggle" onClick={() => this.toggleSection("monsters")}>Monsters <span className="Game--Section--ToggleSymbol">{this.state.showSections.monsters ? "▾" : "▸"}</span></h3>
                    <div className={classNames({"Game--Section--HidePlayers": !this.state.showSections.monsters})}>
                        <MonsterTrackers />
                    </div>
                </div>
                <div className="Game--Section">
                    <div className="Game--MonsterCards--TitleContainer">
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
                                "Game--Monsters--StatsToggleActive": !this.state.showStats,
                            })}>
                                <input type="radio" checked={!this.state.showStats} onChange={() => this.setState({showStats: false})} />
                                Hide stats
                            </label>
                            <label className={classNames({
                                "Game--Monsters--StatsToggle": true,
                                "Game--Monsters--StatsToggleActive": this.state.showStats,
                            })}>
                                <input type="radio" checked={this.state.showStats} onChange={() => this.setState({showStats: true})} />
                                Show stats
                            </label>
                        </div>
                    </div>
                    <div className={classNames({"Game--Section--HidePlayers": !this.state.showSections.monsterDecks})}>
                        <MonsterDecks showStats={this.state.showStats} showTimeline={this.state.showInitiativeTimeline} toggleTimeline={() => this.toggleInitiativeTimeline()} />
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
        addPlayer: (name, characterClass) => addPlayerAction(dispatch, name, characterClass),
    }),
)(GameComponent);

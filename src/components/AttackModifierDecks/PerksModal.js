import React from 'react';
import {connect} from "react-redux";
import Modal from 'react-modal';

import { applyPerksAction } from "../../store/attackModifierDecks";
import minusOneCard from "./-1.jpg";
import minusOneItemIcon from "./minusOneItemIcon.svg";

import "./PerksModal.css";

class PerksModalComponent extends React.Component {
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
            perks: props.initialPerks,
            minusOneCards: props.initialMinusOneCards,
        };
    }

    togglePerk(i, j) {
        this.setState({
            perks: [
                ...this.state.perks.slice(0, i),
                {
                    ...this.state.perks[i],
                    used: [
                        ...this.state.perks[i].used.slice(0, j),
                        !this.state.perks[i].used[j],
                        ...this.state.perks[i].used.slice(j + 1),
                    ],
                },
                ...this.state.perks.slice(i + 1),
            ],
        });
    }

    setMinusOneCards(minusOneCards) {
        this.setState({
            minusOneCards,
        });
    }

    applyPerks() {
        this.props.applyPerks(this.state.perks, this.state.minusOneCards);
        this.props.onClose();
    }

    render() {
        return (<Modal isOpen contentLabel="Perks" style={this.customStyles}>
            <h2 className="PerksModal--Title">{this.props.class}</h2>
            <div className="PerksModal--Perks">
                <h3 className="PerksModal--Title">Perks</h3>
                {this.state.perks.map((p, i) => (
                    <div key={i} className="PerksModal--Perk">
                        {p.used.map((u, j) => <input key={j} type="checkbox" checked={u} onChange={() => this.togglePerk(i, j)} />)}
                        <label className="PerksModal--Perk--Name">{p.description}</label>
                    </div>)
                )}
            </div>
            <div>
                <h3 className="PerksModal--Title">Add <img className="PerksModal--CardIcon" src={minusOneCard} alt="-1 card"/></h3>
                <div className="PerksModal--MinusOne--Container">
                    <img className="PerksModal--ItemIcon" src={minusOneItemIcon} alt="-1"/>
                    x
                    <select className="PerksModal--MinusOne--Select" value={this.state.minusOneCards} onChange={(event) => this.setMinusOneCards(parseInt(event.target.value, 10))}>
                        {new Array(6).fill().map((_, i) => {
                            return <option key={i} value={i}>{i}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="PerksModal--Buttons--Description">Applying these cards will reset and reshuffle your deck</div>
            <div className="PerksModal--Buttons--Container">
                <button onClick={() => this.props.onClose()}>Cancel</button>
                <button onClick={() => this.applyPerks()}>Apply</button>
            </div>
        </Modal>);
    }
}

export const PerksModal = connect(
    (state, ownProps) => {
        return {
            initialPerks: state.attackModifierDecks[ownProps.name].perks,
            initialMinusOneCards: state.attackModifierDecks[ownProps.name].minusOneCards,
            class: state.players.players[ownProps.name].class,
        };
    },
    (dispatch, ownProps) => {
        return {
            applyPerks: (perks, minusOneCards) => applyPerksAction(dispatch, ownProps.name, perks, minusOneCards),
        };
    }
)(PerksModalComponent);
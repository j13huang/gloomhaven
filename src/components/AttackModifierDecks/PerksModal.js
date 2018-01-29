import React from 'react';
import {connect} from "react-redux";
import Modal from 'react-modal';

import { applyPerksAction } from "../../store/attackModifierDecks";

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

    applyPerks() {
        this.props.applyPerks(this.state.perks);
        this.props.onClose();
    }

    render() {
        return (<Modal isOpen contentLabel="Perks" style={this.customStyles} >
            <h3 className="PerksModal--Title">{this.props.class} Perks</h3>
            <div className="PerksModal--Perks">
                {this.state.perks.map((p, i) => (
                    <div key={i} className="PerksModal--Perk">
                        {p.used.map((u, j) => <input key={j} type="checkbox" checked={u} onChange={() => this.togglePerk(i, j)} />)}
                        <label className="PerksModal--Perk--Name">{p.description}</label>
                    </div>)
                )}
            </div>
            <div className="PerksModal--Buttons--Description">Applying new perks will reset your deck with the new cards</div>
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
            class: state.players.players[ownProps.name].class,
        };
    },
    (dispatch, ownProps) => {
        return {
            applyPerks: (perks) => applyPerksAction(dispatch, ownProps.name, perks),
        };
    }
)(PerksModalComponent);
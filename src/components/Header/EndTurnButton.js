import React from "react";
import * as classNames from "classnames";
import Modal from "react-modal";

import {ElementTracker} from "../ElementTracker/ElementTracker"

import "./EndTurnButton.css";

export class EndTurnButton extends React.Component {
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
            showWarning: false,
        }
    }

    render() {
        const {className, turn, endTurnReady, endTurn} = this.props;
        return (<React.Fragment>
            <button
                className={className}
                onClick={() => {
                    if (!endTurnReady) {
                        this.setState({showWarning: true})
                        return;
                    }
                    endTurn();
                }}
            >
                {turn ?
                <div>
                    <div>End Turn</div>
                    <div>(Turn {turn})</div>
                </div> :
                "End Turn"
                }
            </button>
            <Modal isOpen={this.state.showWarning} contentLabel="End Turn" style={this.customStyles}>
                <div>Are you sure you want to end your turn?</div>
                <div>No monster cards have been flipped this turn.</div>
                <div className="EndTurnButton--Modal--Buttons">
                    <button onClick={() => this.setState({showWarning: false})}>No</button>
                    <button onClick={() => {
                        this.setState({showWarning: false});
                        endTurn();
                    }}>Yes</button>
                </div>
            </Modal>
        </React.Fragment>);
    }
}

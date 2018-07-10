import React from 'react';
import {connect} from "react-redux";
import * as classNames from "classnames";

import { setIntiativeAction, unsetIntiativeAction } from "../../../store/players";

import "./InitiativeSelector.css";

class InitiativeSelectorComponent extends React.Component {
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    handleClickOutside = (e) => {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.props.onHide();
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    render() {
        const {players, initiative, setInitiative, unsetInitiative} = this.props;
        return (<div className="InitiativeSelector--container" ref={(node) => this.setWrapperRef(node)}>
            <div className="InitiativeSelector--players">
                {Object.entries(players).map(([name, p]) =>
                    <div key={name}
                        className={classNames(
                            "InitiativeSelector--player",
                            (p.initiative === initiative) && "InitiativeSelector--player--selected",
                        )}
                        onClick={(e) => {
                            //e.stopPropagation();
                            if (p.initiative === initiative) {
                                unsetInitiative(name);
                            } else {
                                setInitiative(name, initiative);
                            }
                        }}
                    >
                        <div>{name}</div>
                        {/* '\u00A0' is unicode nbsp */}
                        <div className="InitiativeSelector--player--initiative">{p.initiative ? `(${p.initiative})` : "\u00A0"}</div>
                    </div>
                )}
            </div>
            <div className="InitiativeSelector--arrows">
                <div className="InitiativeSelector--arrowBorder"></div>
                <div className="InitiativeSelector--arrow"></div>
            </div>
        </div>);
    }
}

export const InitiativeSelector = connect(
    (state, ownProps) => {
        return {
            players: state.players.players,
        };
    },
    (dispatch, ownProps) => {
        return {
            setInitiative: (playerName) => {setIntiativeAction(dispatch, playerName, ownProps.initiative)},
            unsetInitiative: (playerName) => {unsetIntiativeAction(dispatch, playerName)},
        };
    },
)(InitiativeSelectorComponent);


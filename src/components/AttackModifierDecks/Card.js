import React from 'react';
import {connect} from "react-redux";
import * as classNames from 'classnames';

import {iconForElement} from '../../lib/elements';
import {END_ACTIONS, iconForEndAction} from "../../lib/cards";
import {undoCardAction} from '../../store/attackModifierDecks';

import "./Card.css";

function Value({value}) {
    if (!value) {
        return null;
    } else if (iconForElement(value)) {
        return (<div>
            <img className={classNames("Card--Element", "Card--Element--Icon")} src={iconForElement(value)} alt="generate element"/>
        </div>);
    }
    return <div>{value}</div>;
}

function CardComponent({className, card, isMostRecentCard, undoCard}) {
    return (
        <div className={classNames({
                "Deck--Card--Container": true,
                "Deck--Card--Shuffle": card.endAction === END_ACTIONS.SHUFFLE,
                "Deck--Card--Discard": card.endAction === END_ACTIONS.DISCARD,
                "Deck--Card--MostRecent": isMostRecentCard,
                [className]: true,
            })}>
            <Value value={card.modifier} />
            <Value value={card.extra} />
            <div className="Deck--Card--EndActionContainer">
                {(card.endAction && iconForEndAction(card.endAction)) ?
                    <img
                        className={classNames({
                            "Deck--Card--EndAction": true,
                            "Deck--Card--EndActionShuffle": card.endAction === END_ACTIONS.SHUFFLE,
                        })}
                        src={iconForEndAction(card.endAction)}
                        alt={card.endAction}
                    /> :
                    <div><strong>{card.endAction}</strong></div>
                }
            </div>
            {isMostRecentCard && <div className="Deck--Card--UndoCover" onClick={() => undoCard()}>Undo</div>}
        </div>
    );
}

export const Card = connect(
    () => ({}),
    (dispatch, ownProps) => {
        return {
            undoCard: () => dispatch(undoCardAction(ownProps.name)),
        };
    },
)(CardComponent);

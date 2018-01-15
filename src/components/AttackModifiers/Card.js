import React from 'react';
import * as classNames from 'classnames';

import {iconForElement} from '../../lib/elements';
import {END_ACTIONS, iconForEndAction} from "../../lib/cards";

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

export function Card({className, card}) {
    return (
        <div className={className}>
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
        </div>
    );
}
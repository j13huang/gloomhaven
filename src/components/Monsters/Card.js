import React from 'react';
import * as classNames from 'classnames';

import {Actions} from "./Actions/Actions";
import {END_ACTIONS, iconForEndAction} from "../../lib/cards";

import "./Card.css";

export function Card({className, card}) {
    return (
        <div className={className}>
            <div>^{card.initiative}</div>
            <Actions actions={card.actions} />
            <div className="Deck--Card--EndActionContainer">
                {card.endAction &&
                    <img
                        className={classNames({
                            "Deck--Card--EndAction": true,
                            "Deck--Card--EndActionShuffle": card.endAction === END_ACTIONS.SHUFFLE,
                        })}
                        src={iconForEndAction(card.endAction)}
                        alt={card.endAction}
                    />
                }
            </div>
        </div>
    );
}
import React from 'react';
import * as classNames from "classnames";

import {END_ACTIONS} from "./constants";

import "./Card.css";

export function Card({card, mostRecent}) {
    return (
        <div className={classNames({
            "Monsters--Card": true,
            "Monsters--Card--Shuffle": !mostRecent && card.endAction === END_ACTIONS.RESHUFFLE,
            "Monsters--Card--MostRecent": mostRecent,
        })}>
            <div>^{card.initiative}</div>
            {card.actions.map((a) => <div>{a}</div>)}
            {card.endAction && <div>{card.endAction}</div>}
        </div>
    );
}
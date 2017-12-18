import React from 'react';
import * as classNames from "classnames";

import {ACTIONS} from "./constants";

import "./Card.css";

export function Card({card, mostRecent}) {
    return (
        <div className={classNames({
            "Card": true,
            "Card--Shuffle": !mostRecent && card.action === ACTIONS.RESHUFFLE,
            "Card--MostRecent": mostRecent,
        })}>
            <div>{card.modifier}</div>
            {card.action && <div>{card.action}</div>}
        </div>
    );
}
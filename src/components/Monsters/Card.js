import React from 'react';

import {Actions} from "./Actions/Actions";
import {iconForEndAction} from "../../lib/cards";

import "./Card.css";

export function Card({className, name, card, stats}) {
    return (<div className="Monster--Card">
        <div className="Monster--Card--Name">{name}</div>
        <div className="Monster--Card--Initiative">{card.initiative}</div>
        <Actions className="Monster--Card--Actions" actions={card.actions} isBoss={name === "Boss"} stats={stats} />
        {card.endAction &&
            <img
                className="Monster--Card--EndAction"
                src={iconForEndAction(card.endAction)}
                alt={card.endAction}
            />
        }
    </div>);
}
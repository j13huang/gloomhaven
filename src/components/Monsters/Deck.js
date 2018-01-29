import React from 'react';

import {Card} from "./Card";
import cardBack from "./monster_card_back.jpg";

import "./Deck.css";

export function Deck({name, card, active}) {
    return (<div className="Monsters--Deck--Container">
        {!card && <div className="Monsters--Deck--CardBack">
            <img src={cardBack} className="Monsters--Deck--CardBackImage" alt="card back" />
            <div className="Monsters--Deck--CardBackName">{name}</div>
            {!active && <div className={"Monsters--Deck--InactiveCover"}>
                Inactive
            </div>}
        </div>}
        {card && <Card name={name} card={card} />}
    </div>);
}

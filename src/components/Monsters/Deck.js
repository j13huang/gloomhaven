import React from 'react';

import {Card} from "./Card";
import cardBack from "./monster_card_back.jpg";

import "./Deck.css";

export function Deck({name, card}) {
    return (
        <div>
            <div className="Monsters--Deck--CardBack">
                <img src={cardBack} className="Monsters--Deck--CardBackImage" alt="card back" />
                <div className="Monsters--Deck--CardBackName">{name}</div>
            </div>
            {card && <Card name={name} card={card} />}
        </div>
    );
}

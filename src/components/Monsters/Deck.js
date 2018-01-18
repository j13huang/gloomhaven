import React from 'react';

import {Card} from "./Card";
import cardBack from "./monster_card_back.jpg";

//import "./Deck.css";

export function Deck({card}) {
    return (
        <div>
            <div>
                <img src={cardBack} className="Deck--CardBack" alt="card back" />
            </div>
            <div className="Deck--PlayedCards">
                {card && <Card className="Deck--Card" card={card} />}
            </div>
        </div>
    );
}

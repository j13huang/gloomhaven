import React from 'react';

import "./Card.css";

export {default as cardBack} from "./attack_modifier_card_back.jpg";
export function AttackModifierCard({className, card}) {
    return (
        <div className={className}>
            <div>{card.modifier}</div>
            {card.endAction && <div>{card.endAction}</div>}
        </div>
    );
}
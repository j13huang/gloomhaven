import React from 'react';

import "./Card.css";

export {default as cardBack} from "./monster_card_back.jpg";

export function MonsterAbilityCard({className, card}) {
    return (
        <div className={className}>
            <div>^{card.initiative}</div>
            {card.actions.map((a, i) => <div key={i}>{a}</div>)}
            {card.endAction && <div>{card.endAction}</div>}
        </div>
    );
}
import React from 'react';

import "./Card.css";

export function Card({className, card}) {
    return (
        <div className={className}>
            <div>{card.modifier}</div>
            {card.endAction && <div>{card.endAction}</div>}
        </div>
    );
}
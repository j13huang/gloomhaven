import React from 'react';

//import "./Card.css";

export function Card({className, card}) {
    return (
        <div className={className}>
            <div>^{card.initiative}</div>
            {card.actions.map((a, i) => <div key={i}>{a}</div>)}
            {card.endAction && <div>{card.endAction}</div>}
        </div>
    );
}
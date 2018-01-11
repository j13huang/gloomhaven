import React from 'react';
import * as classNames from 'classnames';

import * as elements from "../../lib/elements";

import "./Card.css";

function Value({value}) {
    if (!value) {
        return null;
    } else if (elements.iconForElement(value)) {
        return (<div>
            <img className={classNames("Card--Element", "Card--Element--Icon")} src={elements.iconForElement(value)} alt="generate element"/>
        </div>);
    }
    return <div>{value}</div>;
}

export function Card({className, card}) {
    return (
        <div className={className}>
            <Value value={card.modifier} />
            <Value value={card.extra} />
            <div>{card.rolling && <strong>ROLLING</strong>}</div>
            {card.endAction && <div><strong>{card.endAction}</strong></div>}
        </div>
    );
}
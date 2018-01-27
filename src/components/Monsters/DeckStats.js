import React from 'react';

import {MonsterStats} from "./MonsterTracker/MonsterStats";
import {Card} from "./Card";

import "./Deck.css";

export function Deck({name, level, card, active, stats}) {
    let statsSection;
    if (name === "Boss") {
        statsSection = (<div className="Monsters--Deck--Stats">
            <MonsterStats className="MonsterTracker--Boss--Stats" stats={stats} />
        </div>);
    } else {
        statsSection = (<div className="Monsters--Deck--Stats">
            <MonsterStats stats={stats.normal} />
            <MonsterStats stats={stats.elite} elite />
        </div>);
    }
    return (<div>
        <h5 className="Monsters--Deck--Name">{name}</h5>
        <div className="Monsters--Deck--Container">
            <div className="Monsters--Deck--CardBack">
                {statsSection}
                <div className="Monsters--Deck--CardBackName">{name}</div>
                {!active && <div className={"Monsters--Deck--InactiveCover"}>
                    Inactive
                </div>}
            </div>
            {card && <Card name={name} card={card} />}
        </div>
    </div>);
}

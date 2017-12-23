import React from 'react';
import * as classNames from "classnames";

import {Card} from "./Card";
import cardBack from "./monster_card_back.jpg";
import * as cardData from "../../lib/cardData";

//import "./Deck.css";

export class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Deck">
                <div>{this.props.name}</div>
                <div>
                    <img src={cardBack} className="Deck--CardBack" onClick={() => {this.props.revealNextCard(this.props.name)}} alt="card back" />
                </div>
                <button
                    className="Deck--Button"
                    onClick={() => {this.props.cleanupPlayedCards(this.props.name)}}
                >
                    Clear
                </button>
                <div className="Deck--PlayedCards">
                    {this.props.playedCards.map((card, i) => {
                        return <Card
                            className={classNames({
                                "Deck--Card": true,
                                "Deck--Card--MostRecent": i === 0,
                                "Deck--Card--Discard": card.endAction === cardData.END_ACTIONS.DISCARD,
                            })}
                            key={i}
                            card={card}
                        />
                    })
                    }
                </div>
            </div>
        );
    }
}

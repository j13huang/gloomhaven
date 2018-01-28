import React from 'react';
import {connect} from "react-redux";
import * as classNames from 'classnames';
import * as _ from "lodash";

import {iconForElement} from '../../lib/elements';
import {NUMBER_MODIFIERS, END_ACTIONS, iconForEndAction} from "../../lib/cards";
import {undoCardAction} from '../../store/attackModifierDecks';
import minusOneCardImage from "./-1.jpg";
import minusTwoCardImage from "./-2.jpg";
import plusZeroCardImage from "./+0.jpg";
import plusOneCardImage from "./+1.jpg";
import plusTwoCardImage from "./+2.jpg";
import timesTwoCardImage from "./2x.jpg";
import nullCardImage from "./null.jpg";

import "./Card.css";

function Value({value}) {
    if (!value) {
        return null;
    } else if (iconForElement(value)) {
        return (<div>
            <img className={classNames("Card--Element", "Card--Element--Icon")} src={iconForElement(value)} alt="generate element"/>
        </div>);
    }
    return <div>{value}</div>;
}

function getBasicCardImage(card) {
    if (_.isEqual(card, {modifier: NUMBER_MODIFIERS.MINUS_ONE})) {
        return (className) => <img className={className} src={minusOneCardImage} alt="minus 1" />;
    } else if (_.isEqual(card, {modifier: NUMBER_MODIFIERS.MINUS_TWO})) {
        return (className) => <img className={className} src={minusTwoCardImage} alt="minus 2" />;
    } else if (_.isEqual(card, {modifier: NUMBER_MODIFIERS.PLUS_ZERO})) {
        return (className) => <img className={className} src={plusZeroCardImage} alt="plus 0" />;
    } else if (_.isEqual(card, {modifier: NUMBER_MODIFIERS.PLUS_ONE})) {
        return (className) => <img className={className} src={plusOneCardImage} alt="plus 1" />;
    } else if (_.isEqual(card, {modifier: NUMBER_MODIFIERS.PLUS_TWO})) {
        return (className) => <img className={className} src={plusTwoCardImage} alt="plus 2" />;
    } else if (_.isEqual(card, {modifier: NUMBER_MODIFIERS.TIMES_TWO, endAction: END_ACTIONS.SHUFFLE})) {
        return (className) => <img className={className} src={timesTwoCardImage} alt="times 2" />;
    } else if (_.isEqual(card, {modifier: NUMBER_MODIFIERS.NULL, endAction: END_ACTIONS.SHUFFLE})) {
        return (className) => <img className={className} src={nullCardImage} alt="nullify attack" />;
    }
    return null;
}

function CardComponent({className, card, isMostRecentCard, undoCard}) {
    const propsClassName = className ? {[className]: true} : {};
    const basicImage = getBasicCardImage(card);
    if (basicImage) {
        //return basicImage("Deck--Card--Image");
    }
    return (
        <div className={classNames({
                "Deck--Card--Container": true,
                "Deck--Card--Shuffle": card.endAction === END_ACTIONS.SHUFFLE,
                "Deck--Card--Discard": card.endAction === END_ACTIONS.DISCARD,
                "Deck--Card--MostRecent": isMostRecentCard,
                ...propsClassName
            })}>
            <Value value={card.modifier} />
            <Value value={card.extra} />
            <div className="Deck--Card--EndActionContainer">
                {(card.endAction && iconForEndAction(card.endAction)) ?
                    <img
                        className={classNames({
                            "Deck--Card--EndAction": true,
                            "Deck--Card--EndActionShuffle": card.endAction === END_ACTIONS.SHUFFLE,
                        })}
                        src={iconForEndAction(card.endAction)}
                        alt={card.endAction}
                    /> :
                    <div><strong>{card.endAction}</strong></div>
                }
            </div>
            {isMostRecentCard && <div className="Deck--Card--UndoCover" onClick={() => undoCard()}>Undo</div>}
        </div>
    );
}

export const Card = connect(
    () => ({}),
    (dispatch, ownProps) => {
        return {
            undoCard: () => dispatch(undoCardAction(ownProps.name)),
        };
    },
)(CardComponent);

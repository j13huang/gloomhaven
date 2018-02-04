import React from 'react';
import {connect} from "react-redux";
import * as classNames from 'classnames';
import * as _ from "lodash";

import {ELEMENTS, AIR, DARK, EARTH, FIRE, ICE, LIGHT, iconForElement} from '../../lib/elements';
import {ALL_STATUS_EFFECTS, DISARM, IMMOBILIZE, INVISIBLE, MUDDLE, POISON, STRENGTHEN, STUN, WOUND, PUSH, PULL} from '../../lib/statusEffects';
import {BASE_CARDS, CURSE, BLESS, END_ACTIONS, iconForEndAction, NUMBER_MODIFIERS} from "../../lib/cards";
import {BONUSES, HEAL, SHIELD, PIERCE, ADD_TARGET} from "../../lib/bonuses";
import {getIcon} from "../../lib/icons";
import {undoCardAction} from '../../store/attackModifierDecks';
import minusOneCardImage from "./-1.jpg";
import minusTwoCardImage from "./-2.jpg";
import plusZeroCardImage from "./+0.jpg";
import plusOneCardImage from "./+1.jpg";
import plusTwoCardImage from "./+2.jpg";
import timesTwoCardImage from "./2x.jpg";
import nullCardImage from "./null.jpg";
import curseCardImage from "./curse.jpg";
import blessCardImage from "./bless.jpg";
import blankCardImage from "./blank.png";

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

function ColorCover({iconName}) {
    let colorClassName;
    switch (iconName) {
        // elements
        case AIR: colorClassName = "AttackModifierCard--AirColor"; break;
        case DARK: colorClassName = "AttackModifierCard--DarkColor"; break;
        case FIRE: colorClassName = "AttackModifierCard--FireColor"; break;
        case EARTH: colorClassName = "AttackModifierCard--EarthColor"; break;
        case ICE: colorClassName = "AttackModifierCard--IceColor"; break;
        case LIGHT: colorClassName = "AttackModifierCard--LightColor"; break;

        // status effects
        case DISARM: colorClassName = "AttackModifierCard--DisarmColor"; break;
        case IMMOBILIZE: colorClassName = "AttackModifierCard--ImmobilizeColor"; break;
        case INVISIBLE: colorClassName = "AttackModifierCard--InvisibleColor"; break;
        case MUDDLE: colorClassName = "AttackModifierCard--MuddleColor"; break;
        case POISON: colorClassName = "AttackModifierCard--PoistonColor"; break;
        case STRENGTHEN: colorClassName = "AttackModifierCard--StrengthenColor"; break;
        case STUN: colorClassName = "AttackModifierCard--StunColor"; break;
        case WOUND: colorClassName = "AttackModifierCard--WoundColor"; break;

        case PUSH: colorClassName = "AttackModifierCard--PushColor"; break;
        case PULL: colorClassName = "AttackModifierCard--PullColor"; break;

        //bonuses
        case PIERCE: colorClassName = "AttackModifierCard--PierceColor"; break;
        case ADD_TARGET: colorClassName = "AttackModifierCard--AddTargetColor"; break;

        default: break;
    }
    return <div className={classNames("AttackModifierCard--ColorCover", colorClassName)}></div>
}

function MainIcon({iconName}) {
    let colorClassName;
    switch (iconName) {
        // elements
        /*
        case AIR: colorClassName = "AttackModifierCard--AirColor"; break;
        case DARK: colorClassName = "AttackModifierCard--DarkColor"; break;
        case FIRE: colorClassName = "AttackModifierCard--FireColor"; break;
        case EARTH: colorClassName = "AttackModifierCard--EarthColor"; break;
        case ICE: colorClassName = "AttackModifierCard--IceColor"; break;
        case LIGHT: colorClassName = "AttackModifierCard--LightColor"; break;
        */

        // status effects
        case DISARM: colorClassName = "AttackModifierCard--MainIcon--DisarmColor"; break;
        case IMMOBILIZE: colorClassName = "AttackModifierCard--MainIcon--ImmobilizeColor"; break;
        case INVISIBLE: colorClassName = "AttackModifierCard--MainIcon--InvisibleColor"; break;
        case MUDDLE: colorClassName = "AttackModifierCard--MainIcon--MuddleColor"; break;
        case POISON: colorClassName = "AttackModifierCard--MainIcon--PoistonColor"; break;
        case STRENGTHEN: colorClassName = "AttackModifierCard--MainIcon--StrengthenColor"; break;
        case STUN: colorClassName = "AttackModifierCard--MainIcon--StunColor"; break;
        case WOUND: colorClassName = "AttackModifierCard--MainIcon--WoundColor"; break;

        case PUSH: colorClassName = "AttackModifierCard--MainIcon--PushColor"; break;
        case PULL: colorClassName = "AttackModifierCard--MainIcon--PullColor"; break;

        // bonuses
        case PIERCE: colorClassName = "AttackModifierCard--MainIcon--PierceColor"; break;
        case ADD_TARGET: colorClassName = "AttackModifierCard--MainIcon--AddTargetColor"; break;

        default: break;
    }
    return <img
        className={classNames("AttackModifierCard--MainIcon", colorClassName)}
        src={getIcon(iconName)}
        alt={iconName}
    />
}

function CustomCard({className, card}) {
    const iconName = card.modifier.type ? card.modifier.type : card.modifier;
    return (<div className="AttackModifierCard--CustomCard">
        <img className={className} src={blankCardImage} alt={`${card.modifier} ${card.extra} ${card.endAction}`} />
        <ColorCover iconName={iconName} />
        <MainIcon iconName={iconName} />
        {card.modifier.type &&
            <div className={classNames(card.modifier.type === PIERCE ?
                "AttackModifierCard--MainIcon--PierceValue" : "AttackModifierCard--MainIcon--Value")}>
                {card.modifier.value}
            </div>}
    </div>);
}

function PlusThree({className, card}) {
    return (<div className="AttackModifierCard--CustomCard">
        <img className={className} src={blankCardImage} alt={`${card.modifier} ${card.extra} ${card.endAction}`} />
        <div className={classNames("AttackModifierCard--MainIcon", "AttackModifierCard--PlusThree")}>
            <span className="AttackModifierCard--PlusThree--Plus">+</span>
            <span className="AttackModifierCard--PlusThree--Three">3</span>
        </div>
        <div className={classNames("AttackModifierCard--ColorCover", "AttackModifierCard--GreenColor")}></div>
    </div>);
}

function getCardImage(card, className) {
    if (card.modifier === NUMBER_MODIFIERS.MINUS_ONE) {
        return <img className={className} src={minusOneCardImage} alt="minus 1" />;
    } else if (card.modifier === NUMBER_MODIFIERS.MINUS_TWO) {
        return <img className={className} src={minusTwoCardImage} alt="minus 2" />;
    } else if (card.modifier === NUMBER_MODIFIERS.PLUS_ZERO) {
        return <img className={className} src={plusZeroCardImage} alt="plus 0" />;
    } else if (card.modifier === NUMBER_MODIFIERS.PLUS_ONE) {
        return <img className={className} src={plusOneCardImage} alt="plus 1" />;
    } else if (card.modifier === NUMBER_MODIFIERS.PLUS_TWO) {
        return <img className={className} src={plusTwoCardImage} alt="plus 2" />;
    } else if (_.isEqual(card, BASE_CARDS.TIMES_TWO)) {
        return <img className={className} src={timesTwoCardImage} alt="times 2" />;
    } else if (_.isEqual(card, BASE_CARDS.NULL)) {
        return <img className={className} src={nullCardImage} alt="nullify attack" />;
    } else if (_.isEqual(card, CURSE)) {
        return <img className={className} src={curseCardImage} alt="curse" />;
    } else if (_.isEqual(card, BLESS)) {
        return <img className={className} src={blessCardImage} alt="bless" />;
    } else if (card.modifier === NUMBER_MODIFIERS.PLUS_THREE) {
        return <PlusThree className={className} card={card} />
    } else if ([...ELEMENTS, ...ALL_STATUS_EFFECTS, ...BONUSES].includes(card.modifier.type ? card.modifier.type : card.modifier)) {
        return <CustomCard className={className} card={card} />;
    }
    return null;
}

function getExtraImage(card) {
    const iconName = card.extra.type ? card.extra.type : card.extra;
    if (card.extra.type) {
        let colorClassName;
        switch (iconName) {
            case HEAL: colorClassName = "AttackModifierCard--HealColor"; break;
            case SHIELD: colorClassName = "AttackModifierCard--ShieldColor"; break;
            default: break;
        }
        return (<div className={classNames("AttackModifierCard--CustomExtra--Container", colorClassName)}>
            <div className="AttackModifierCard--CustomExtra">
                <img
                    className="AttackModifierCard--CustomExtra--Icon"
                    src={getIcon(iconName)}
                    alt={`${card.extra.type} ${card.extra.value} ${card.extra.self ? "self" : ""}`}
                />
                <div className="AttackModifierCard--CustomExtra--Value">{card.extra.value}</div>
            </div>
            {card.extra.self && <div className="AttackModifierCard--CustomExtra--SelfText">Self</div>}
        </div>)
    }

    return (<img
        src={getIcon(iconName)}
        className="AttackModifierCard--ExtraIcon"
        alt={card.extra}
    />);
}

function CardComponent({className, card, name, isMostRecentCard, undoCard, children}) {
    const propsClassName = className ? {[className]: true} : {};
    const cardImage = getCardImage(card, "AttackModifierCard--Image");
    if (cardImage) {
        return (<div className="AttackModifierCard--Container">
            <div className="AttackModifierCard--ImageContainer">
                {cardImage}
                {card.extra && <ColorCover iconName={card.extra} />}
                {name !== "Monsters" && !_.isEqual(card, BLESS) && <div className="AttackModifierCard--MonsterCover"></div>}
                {card.extra && getExtraImage(card)}
                {card.endAction === END_ACTIONS.ROLLING && <img
                    src={iconForEndAction(card.endAction)}
                    className="AttackModifierCard--RollingIcon"
                    alt="rolling"
                />}
                {isMostRecentCard && <div className="AttackModifierCard--UndoCover" onClick={() => undoCard()}>Undo</div>}
                {children}
            </div>
        </div>);
    }
    // deprecated
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
            {isMostRecentCard && <div className="AttackModifierCard--UndoCover" onClick={() => undoCard()}>Undo</div>}
        </div>
    );
}

export const Card = connect(
    () => ({}),
    (dispatch, ownProps) => {
        return {
            undoCard: () => undoCardAction(dispatch, ownProps.name),
        };
    },
)(CardComponent);

import aoeCircle from "./aoe-circle.svg";
import aoeCircleWithMiddleBlack from "./aoe-circle-with-middle-black.svg";
import aoeCircleWithSideBlack from "./aoe-circle-with-side-black.svg";
import aoeTriangle2 from "./aoe-triangle-2.svg";
import aoeTriangle2WithBlack from "./aoe-triangle-2-with-black.svg";
import aoeTriangle3WithCornerBlack from "./aoe-triangle-3-with-corner-black.svg";
import aoeLine3WithBlack from "./aoe-line-3-with-black.svg";
import aoeLine4WithBlack from "./aoe-line-4-with-black.svg";
import aoeLine6WithBlack from "./aoe-line-6-with-black.svg";
import aoe4WithBlack from "./aoe-4-with-black.svg";
import elderDrakeSpecial1Area from "./elderDrakeSpecial1Area.svg";
import inoxBodyguardSpecial1Area from "./inoxBodyguardSpecial1Area.svg";
import sightlessEyeSpecial1Area from "./sightlessEyeSpecial1Area.svg";
import sightlessEyeSpecial2Area from "./sightlessEyeSpecial2Area.svg";

import { END_ACTIONS } from "../cards";
import * as elements from "../elements";
import * as statusEffects from "../statusEffects"

const ARCHER_CARDS = [
    {
        initiative: 29,
        actions: ["move +0", "attack -1, range +1", "immobilize"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 16,
        actions: ["move +1", "attack -1"],
    },
    {
        initiative: 56,
        actions: ["attack -1, target 2"],
    },
    {
        initiative: 68,
        actions: ["attack +1, range +1"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 32,
        actions: ["move +0", "attack +1, range -1"],
    },
    {
        initiative: 44,
        actions: ["move -1", "attack +1"],
    },
    {
        initiative: 14,
        actions: ["move -1", "attack -1", "Create a 3 damage trap in an adjacent empty hex closest to an enemy."],
    },
    {
        initiative: 31,
        actions: ["move +0", "attack +0"],
    },
];
const GUARD_CARDS = [
    {
        initiative: 70,
        actions: ["move -1", "attack +1"],
    },
    {
        initiative: 30,
        actions: ["move +1", "attack -1"],
    },
    {
        initiative: 50,
        actions: ["move +0", "attack +0"],
    },
    {
        initiative: 15,
        actions: ["shield 1", "retaliate 2"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 15,
        actions: ["shield 1", "attack +0, poison"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 55,
        actions: ["move -1", "attack +0", "strengthen, self"],
    },
    {
        initiative: 50,
        actions: ["move +0", "attack +0"],
    },
];
const IMP_CARDS = [
    {
        initiative: 24,
        actions: ["strengthen, affect all allies within range 2", "muddle, target all enemies within range 2"],
    },
    {
        initiative: 43,
        actions: ["move +0", "attack -1, target 2, curse"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 76,
        actions: ["move -1", "attack +1"],
    },
    {
        initiative: 43,
        actions: ["move +0", "attack -1, target 2, poison"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 42,
        actions: ["move +1", "heal 2, range 3"],
    },
    {
        initiative: 5,
        actions: ["shield 5", "heal 1, self"],
    },
    {
        initiative: 37,
        actions: ["move +0", "attack +0"],
    },
    {
        initiative: 37,
        actions: ["move +0", "attack +0"],
    },
];
const SHAMAN_CARDS = [
    {
        initiative: 8,
        actions: ["move +0", "attack -1, disarm"],
    },
    {
        initiative: 9,
        actions: ["move +1", "attack -1, curse, target 2"],
    },
    {
        initiative: 23,
        actions: ["move +0", "heal 3, range 3"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 89,
        actions: ["move -1", "heal 1, affect all adjacent allies", "bless self"],
    },
    {
        initiative: 62,
        actions: ["move +0", "attack +0"],
    },
    {
        initiative: 23,
        actions: ["move +0", "heal 3, range 3"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 8,
        actions: ["move -1", "attack +0", "immobilize"],
    },
    {
        initiative: 74,
        actions: ["move -1", "attack +1"],
    },
];
const SCOUT_CARDS = [
    {
        initiative: 29,
        actions: ["move -1", "attack -1, range 3"],
    },
    {
        initiative: 35,
        actions: ["move +1, jump", "loot 1"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 40,
        actions: ["move +1", "attack -1"],
    },
    {
        initiative: 53,
        actions: ["move +0", "attack +0"],
    },
    {
        initiative: 54,
        actions: ["move -2", "attack +0, range 3, poison"],
    },
    {
        initiative: 69,
        actions: ["move -1", "attack +1"],
    },
    {
        initiative: 79,
        actions: ["attack -1, range 4, target 2"],
    },
    {
        initiative: 92,
        actions: ["attack +2, poison"],
        endAction: END_ACTIONS.SHUFFLE,
    },
];

export const MONSTERS = {
    "Ancient Artillery": {
        stats: [
            {
                normal: {
                    maxHP: 4,
                    attack: 2,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 7,
                    attack: 3,
                    range: 5,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    attack: 2,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 9,
                    attack: 3,
                    range: 5,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    attack: 2,
                    range: 5,
                    extra: [],
                },
                elite: {
                    maxHP: 11,
                    attack: 3,
                    range: 6,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    attack: 3,
                    range: 5,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    attack: 4,
                    range: 6,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    attack: 4,
                    range: 5,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    attack: 4,
                    range: 6,
                    extra: ["target 2"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    attack: 4,
                    range: 6,
                    extra: [],
                },
                elite: {
                    maxHP: 15,
                    attack: 4,
                    range: 7,
                    extra: ["target 2"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    attack: 4,
                    range: 6,
                    extra: [],
                },
                elite: {
                    maxHP: 16,
                    attack: 5,
                    range: 7,
                    extra: ["target 2"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    attack: 4,
                    range: 7,
                    extra: [],
                },
                elite: {
                    maxHP: 20,
                    attack: 5,
                    range: 7,
                    extra: ["target 2"],
                },
            },
        ],
        cards: [
            {
                initiative: 17,
                actions: ["push 2, target all adjacent enemies", "shield 2", "attack -2"],
            },
            {
                initiative: 37,
                actions: ["push 1, target all adjacent enemies", { action: "attack -1, range -1", image: aoeCircle }],
            },
            {
                initiative: 37,
                actions: ["push 1, target all adjacent enemies", { action: "attack -1, range -1", image: aoeTriangle2 }],
            },
            {
                initiative: 46,
                actions: [{ action: "attack -1, immobilize", image: aoeTriangle2 }],
            },
            {
                initiative: 46,
                actions: ["attack -1, range +2"],
            },
            {
                initiative: 71,
                actions: ["attack +0, all adjacent enemies suffer 2 damage"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 71,
                actions: ["attack +0, all adjacent enemies suffer 2 damage"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 95,
                actions: ["attack +1"],
            },
        ],
    },
    "Bandit Archer": {
        stats: [
            {
                normal: {
                    maxHP: 4,
                    move: 2,
                    attack: 2,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 6,
                    move: 2,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 7,
                    move: 2,
                    attack: 3,
                    range: 5,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 2,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 9,
                    move: 3,
                    attack: 3,
                    range: 5,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 3,
                    attack: 4,
                    range: 5,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 3,
                    attack: 4,
                    range: 6,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 3,
                    range: 5,
                    extra: [],
                },
                elite: {
                    maxHP: 12,
                    move: 4,
                    attack: 4,
                    range: 6,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 4,
                    range: 5,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    move: 4,
                    attack: 5,
                    range: 6,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 3,
                    attack: 4,
                    range: 5,
                    extra: [],
                },
                elite: {
                    maxHP: 17,
                    move: 4,
                    attack: 5,
                    range: 6,
                    extra: ["poison"],
                },
            },
        ],
        cards: ARCHER_CARDS,
    },
    "Bandit Guard": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 2,
                    attack: 4,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 3,
                    attack: 4,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 4,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 11,
                    move: 3,
                    attack: 4,
                    extra: ["muddle", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 4,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 12,
                    move: 3,
                    attack: 5,
                    extra: ["muddle", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 4,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 14,
                    move: 4,
                    attack: 5,
                    extra: ["muddle", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 5,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 14,
                    move: 3,
                    attack: 5,
                    extra: ["muddle", "shield 3"],
                },
            },
        ],
        cards: GUARD_CARDS,
    },
    "Black Imp": {
        stats: [
            {
                normal: {
                    maxHP: 3,
                    move: 1,
                    attack: 1,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 4,
                    move: 1,
                    attack: 2,
                    range: 3,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 1,
                    attack: 1,
                    range: 3,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 6,
                    move: 1,
                    attack: 2,
                    range: 3,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 1,
                    attack: 1,
                    range: 4,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 8,
                    move: 1,
                    attack: 2,
                    range: 4,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 1,
                    attack: 2,
                    range: 4,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 8,
                    move: 1,
                    attack: 3,
                    range: 4,
                    extra: ["attackers gain disadvantage", "poison"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 1,
                    attack: 2,
                    range: 4,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 11,
                    move: 1,
                    attack: 3,
                    range: 4,
                    extra: ["attackers gain disadvantage", "poison"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 1,
                    attack: 2,
                    range: 4,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 12,
                    move: 1,
                    attack: 3,
                    range: 5,
                    extra: ["attackers gain disadvantage", "poison"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 1,
                    attack: 3,
                    range: 4,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 14,
                    move: 1,
                    attack: 4,
                    range: 5,
                    extra: ["attackers gain disadvantage", "poison"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 1,
                    attack: 3,
                    range: 4,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 17,
                    move: 1,
                    attack: 4,
                    range: 5,
                    extra: ["attackers gain disadvantage", "poison"],
                },
            },
        ],
        cards: IMP_CARDS,
    },
    "Cave Bear": {
        stats: [
            {
                normal: {
                    maxHP: 7,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 11,
                    move: 3,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 14,
                    move: 3,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 4,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 17,
                    move: 4,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 4,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 20,
                    move: 4,
                    attack: 5,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 4,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 21,
                    move: 5,
                    attack: 5,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 17,
                    move: 5,
                    attack: 4,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 24,
                    move: 5,
                    attack: 6,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 19,
                    move: 5,
                    attack: 5,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 28,
                    move: 5,
                    attack: 7,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 22,
                    move: 5,
                    attack: 5,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 33,
                    move: 5,
                    attack: 7,
                    extra: ["wound"],
                },
            },
        ],
        cards: [
            {
                initiative: 3,
                actions: ["shield 1", "retaliate 2", "heal 2, self"],
            },
            {
                initiative: 13,
                actions: ["move +1", "attack -1"],
            },
            {
                initiative: 14,
                actions: ["move -1", "attack -1, immobilize"],
            },
            {
                initiative: 34,
                actions: ["attack +1, wound"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 41,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 60,
                actions: ["move -1", "attack +1"],
            },
            {
                initiative: 61,
                actions: ["move +0", "attack -1, target 2"],
            },
            {
                initiative: 80,
                actions: ["attack -1", "move -2", "attack -1, wound"],
                endAction: END_ACTIONS.SHUFFLE,
            },
        ],
    },
    "City Archer": {
        stats: [
            {
                normal: {
                    maxHP: 4,
                    move: 1,
                    attack: 2,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 6,
                    move: 1,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 1,
                    attack: 2,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 6,
                    move: 1,
                    attack: 3,
                    range: 5,
                    extra: ["pierce 1", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 1,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 7,
                    move: 1,
                    attack: 4,
                    range: 5,
                    extra: ["pierce 2", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 2,
                    attack: 3,
                    range: 4,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 8,
                    move: 2,
                    attack: 4,
                    range: 5,
                    extra: ["pierce 2", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 2,
                    attack: 3,
                    range: 5,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 10,
                    move: 2,
                    attack: 4,
                    range: 6,
                    extra: ["pierce 2", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 2,
                    attack: 4,
                    range: 5,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 11,
                    move: 2,
                    attack: 5,
                    range: 6,
                    extra: ["pierce 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 3,
                    attack: 4,
                    range: 5,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 12,
                    move: 3,
                    attack: 6,
                    range: 6,
                    extra: ["pierce 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 4,
                    range: 6,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 13,
                    move: 3,
                    attack: 6,
                    range: 7,
                    extra: ["pierce 3", "shield 3"],
                },
            },
        ],
        cards: ARCHER_CARDS,
    },
    "City Guard": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 6,
                    move: 2,
                    attack: 3,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 6,
                    move: 2,
                    attack: 3,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 2,
                    attack: 2,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 2,
                    attack: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 9,
                    move: 2,
                    attack: 4,
                    extra: ["retaliate 1", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 3,
                    attack: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 10,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 2", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 3,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 12,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 2", "shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 3,
                    attack: 4,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 13,
                    move: 3,
                    attack: 5,
                    extra: ["retaliate 3", "shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 3,
                    attack: 4,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 14,
                    move: 3,
                    attack: 6,
                    extra: ["retaliate 3", "shield 3"],
                },
            },
        ],
        cards: GUARD_CARDS,
    },
    "Cultist": {
        stats: [
            {
                normal: {
                    maxHP: 4,
                    move: 2,
                    attack: 1,
                    extra: [],
                },
                elite: {
                    maxHP: 7,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 1,
                    extra: [],
                },
                elite: {
                    maxHP: 9,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 2,
                    attack: 1,
                    extra: [],
                },
                elite: {
                    maxHP: 12,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 3,
                    attack: 1,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    move: 3,
                    attack: 2,
                    extra: ["curse"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 15,
                    move: 3,
                    attack: 3,
                    extra: ["curse"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 3,
                    attack: 2,
                    extra: ["curse"],
                },
                elite: {
                    maxHP: 18,
                    move: 3,
                    attack: 3,
                    extra: ["curse"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 3,
                    attack: 2,
                    extra: ["curse"],
                },
                elite: {
                    maxHP: 22,
                    move: 3,
                    attack: 3,
                    extra: ["curse"],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 3,
                    attack: 3,
                    extra: ["curse"],
                },
                elite: {
                    maxHP: 25,
                    move: 3,
                    attack: 4,
                    extra: ["curse"],
                },
            },
        ],
        cards: [
            {
                initiative: 39,
                actions: ["move -1", "attack +0", "heal 1, self"],
            },
            {
                initiative: 10,
                actions: ["move -1", "attack +0", { action: "on death: attack +2", image: aoeCircleWithMiddleBlack }],
            },
            {
                initiative: 10,
                actions: ["move -1", "attack -1", { action: "on death: attack +2", image: aoeCircleWithMiddleBlack }],
            },
            {
                initiative: 31,
                actions: ["move -1", "heal 3, range 3"],
            },
            {
                initiative: 63,
                actions: ["Summon normal Living Bones", "Cultist suffers 2 damage."],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 63,
                actions: ["Summon normal Living Bones", "Cultist suffers 2 damage."],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 27,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 27,
                actions: ["move +0", "attack +0"],
            },
        ],
    },
    "Deep Terror": {
        stats: [
            {
                normal: {
                    maxHP: 3,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 5,
                    attack: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    attack: 2,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 6,
                    attack: 3,
                    extra: ["retaliate 1"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    attack: 3,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 7,
                    attack: 4,
                    extra: ["retaliate 1"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 8,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 9,
                    attack: 5,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
                elite: {
                    maxHP: 11,
                    attack: 5,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    attack: 5,
                    extra: ["retaliate 3"],
                },
                elite: {
                    maxHP: 13,
                    attack: 6,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    attack: 5,
                    extra: ["retaliate 4"],
                },
                elite: {
                    maxHP: 15,
                    attack: 6,
                    extra: ["retaliate 4"],
                },
            },
        ],
        cards: [
            {
                initiative: 65,
                actions: ["attack +0, range 3, target 3, curse"],
            },
            {
                initiative: 60,
                actions: [{ action: "attack +0, pierce 3", image: aoeLine6WithBlack }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 60,
                actions: [{ action: "attack +0, pierce 3", image: aoeLine6WithBlack }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 84,
                actions: ["attack -1, target all adjacent enemies", "attack +0, range 4, wound"],
            },
            {
                initiative: 75,
                actions: ["attack +0, poison", "attack -1, range 5, immobilize"],
            },
            {
                initiative: 75,
                actions: ["attack -2, target all adjacent enemies, disarm", "attack +0, range 3, target 2"],
            },
            {
                initiative: 96,
                actions: ["attack -2, range 6, summon normal Deep Terror in a hex adjacent to the target"],
            },
            {
                initiative: 54,
                actions: ["wound and poison, target all adjacent enemies", "attack +0, range 4"],
            },
        ],
    },
    "Earth Demon": {
        stats: [
            {
                normal: {
                    maxHP: 7,
                    move: 1,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 2,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 1,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    move: 2,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 1,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 18,
                    move: 2,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 2,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 20,
                    move: 2,
                    attack: 4,
                    extra: ["immobilize"],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 2,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 21,
                    move: 3,
                    attack: 5,
                    extra: ["immobilize"],
                },
            },
            {
                normal: {
                    maxHP: 17,
                    move: 2,
                    attack: 4,
                    extra: ["immobilize"],
                },
                elite: {
                    maxHP: 25,
                    move: 3,
                    attack: 5,
                    extra: ["immobilize"],
                },
            },
            {
                normal: {
                    maxHP: 20,
                    move: 2,
                    attack: 4,
                    extra: ["immobilize"],
                },
                elite: {
                    maxHP: 27,
                    move: 3,
                    attack: 6,
                    extra: ["immobilize"],
                },
            },
            {
                normal: {
                    maxHP: 22,
                    move: 3,
                    attack: 4,
                    extra: ["immobilize"],
                },
                elite: {
                    maxHP: 32,
                    move: 3,
                    attack: 6,
                    extra: ["immobilize"],
                },
            },
        ],
        cards: [
            {
                initiative: 93,
                actions: ["move -1", "attack -1, target all adjacent enemies", { type: "element", use: elements.EARTH, action: "push 1" }],
            },
            {
                initiative: 79,
                actions: ["move +1", "attack +0", { type: "element", use: elements.AIR, action: "-2 attack" }],
            },
            {
                initiative: 40,
                actions: ["heal 3, self", { type: "element", use: elements.EARTH, action: "immobilize, target all enemies within range 3" }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 42,
                actions: ["move +1", "attack -1"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 62,
                actions: ["move +0", "attack +0", { type: "element", create: elements.EARTH }],
            },
            {
                initiative: 71,
                actions: ["attack +0, range 4", { type: "element", use: elements.EARTH, action: "target 2" }],
            },
            {
                initiative: 83,
                actions: ["move -1", "attack +1", { type: "element", create: elements.EARTH }],
            },
            {
                initiative: 87,
                actions: ["move +0", { action: "attack -1", image: aoe4WithBlack }, { type: "element", use: elements.ANY, create: elements.EARTH }],
            },
        ],
    },
    "Flame Demon": {
        stats: [
            {
                normal: {
                    maxHP: 2,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["flying", "shield 2"],
                },
                elite: {
                    maxHP: 3,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["flying", "shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 2,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["flying", "shield 3"],
                },
                elite: {
                    maxHP: 3,
                    move: 3,
                    attack: 2,
                    range: 4,
                    extra: ["flying", "retaliate 2, range 2", "shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: ["flying", "shield 3"],
                },
                elite: {
                    maxHP: 4,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: ["flying", "retaliate 3, range 2", "shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: ["flying", "retaliate 2, range 2", "shield 3"],
                },
                elite: {
                    maxHP: 5,
                    move: 3,
                    attack: 3,
                    range: 5,
                    extra: ["flying", "retaliate 3, range 3", "shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["flying", "retaliate 3, range 2", "shield 3"],
                },
                elite: {
                    maxHP: 5,
                    move: 4,
                    attack: 4,
                    range: 5,
                    extra: ["flying", "retaliate 4, range 3", "shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["flying", "retaliate 3, range 2", "shield 4"],
                },
                elite: {
                    maxHP: 6,
                    move: 4,
                    attack: 4,
                    range: 5,
                    extra: ["flying", "retaliate 4, range 3", "shield 5"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["flying", "retaliate 4, range 2", "shield 4"],
                },
                elite: {
                    maxHP: 7,
                    move: 4,
                    attack: 5,
                    range: 5,
                    extra: ["flying", "retaliate 5, range 3", "shield 5"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 4,
                    attack: 4,
                    range: 5,
                    extra: ["flying", "retaliate 4, range 3", "shield 4"],
                },
                elite: {
                    maxHP: 8,
                    move: 4,
                    attack: 5,
                    range: 6,
                    extra: ["flying", "retaliate 5, range 4", "shield 5"],
                },
            },
        ],
        cards: [
            {
                initiative: 8,
                actions: ["move -1", "create a 4 damage trap in an adjacent empty hex closest to an enemy.", { type: "element", use: elements.ANY, create: elements.FIRE }],
            },
            {
                initiative: 67,
                actions: ["move -1", "attack +1, range -1", { type: "element", create: elements.FIRE }],
            },
            {
                initiative: 3,
                actions: ["move +1", "attack -1", { type: "element", create: elements.FIRE }],
            },
            {
                initiative: 77,
                actions: ["attack +0, target all adjacent enemies", { type: "element", use: elements.ICE, action: "Flame Demon suffers 1 damage" }],
            },
            {
                initiative: 24,
                actions: ["move +0", "attack +0", { type: "element", create: elements.FIRE }],
            },
            {
                initiative: 30,
                actions: [{ type: "element", use: elements.FIRE, action: "all adjacent enemies suffer 2 damage." }, "move +0", "attack -2, wound, target 2"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 46,
                actions: ["attack +0", { type: "element", use: elements.FIRE, image: aoeCircle }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 49,
                actions: [{ action: "attack +0", image: aoeLine3WithBlack }, { type: "element", use: elements.FIRE, action: "attack +1, wound" }],
            },
        ],
    },
    "Frost Demon": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 2,
                    attack: 3,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 10,
                    move: 3,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 3,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 12,
                    move: 4,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 14,
                    move: 4,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 18,
                    move: 4,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
                elite: {
                    maxHP: 20,
                    move: 4,
                    attack: 5,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 5,
                    extra: ["retaliate 3"],
                },
                elite: {
                    maxHP: 22,
                    move: 4,
                    attack: 5,
                    extra: ["retaliate 4"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 3,
                    attack: 5,
                    extra: ["retaliate 3"],
                },
                elite: {
                    maxHP: 25,
                    move: 4,
                    attack: 5,
                    extra: ["retaliate 4"],
                },
            },
        ],
        cards: [
            {
                initiative: 18,
                actions: ["immobilize, target all enemies within range 2", { type: "element", use: elements.ICE, action: "heal 3, self" }],
            },
            {
                initiative: 18,
                actions: ["shield 2", "move +1", { type: "element", use: elements.FIRE, action: "Frost Demon suffers 1 damage" }],
            },
            {
                initiative: 38,
                actions: ["move +1", "attack -1"],
            },
            {
                initiative: 58,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 58,
                actions: ["move -1", "attack +0, range 2", { type: "element", use: elements.ICE, action: "+2 attack, +1 range" }],
            },
            {
                initiative: 58,
                actions: ["move -1", "attack -1, pierce 3", { type: "element", use: elements.ANY, create: elements.ICE }],
            },
            {
                initiative: 78,
                actions: ["move -1", { action: "attack +0", image: aoeTriangle2WithBlack }, { type: "element", create: elements.ICE }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 78,
                actions: ["move -1", { action: "attack +0", image: aoeTriangle2WithBlack }, { type: "element", create: elements.ICE }],
                endAction: END_ACTIONS.SHUFFLE,
            },
        ],
    },
    "Forest Imp": {
        stats: [
            {
                normal: {
                    maxHP: 1,
                    move: 3,
                    attack: 1,
                    range: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 4,
                    move: 3,
                    attack: 1,
                    range: 3,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 2,
                    move: 3,
                    attack: 1,
                    range: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 5,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 2,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 6,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["curse", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 4,
                    attack: 2,
                    range: 4,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 7,
                    move: 4,
                    attack: 2,
                    range: 4,
                    extra: ["curse", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 4,
                    attack: 2,
                    range: 4,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 7,
                    move: 4,
                    attack: 2,
                    range: 4,
                    extra: ["curse", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 4,
                    attack: 2,
                    range: 4,
                    extra: ["curse", "shield 2"],
                },
                elite: {
                    maxHP: 8,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["curse", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["curse", "shield 2"],
                },
                elite: {
                    maxHP: 9,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["curse", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["curse", "shield 2"],
                },
                elite: {
                    maxHP: 11,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["curse", "shield 2"],
                },
            },
        ],
        cards: IMP_CARDS,
    },
    "Giant Viper": {
        stats: [
            {
                normal: {
                    maxHP: 2,
                    move: 2,
                    attack: 1,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 3,
                    move: 2,
                    attack: 2,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 2,
                    attack: 1,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 3,
                    attack: 1,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 7,
                    move: 3,
                    attack: 2,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 3,
                    attack: 2,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 8,
                    move: 3,
                    attack: 3,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 2,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 11,
                    move: 3,
                    attack: 3,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 3,
                    attack: 3,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 13,
                    move: 4,
                    attack: 3,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 4,
                    attack: 3,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 14,
                    move: 4,
                    attack: 4,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 4,
                    attack: 3,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 17,
                    move: 4,
                    attack: 4,
                    extra: ["poison"],
                },
            },
        ],
        cards: [
            {
                initiative: 23,
                actions: ["move -1", "attack -1, immobilize", "attack -1"],
            },
            {
                initiative: 43,
                actions: ["move -1, jump", "attack +0, target 2"],
            },
            {
                initiative: 43,
                actions: ["move +1, jump", "attack -1, target all adjacent enemies"],
            },
            {
                initiative: 32,
                actions: ["move +0", "attack +0", "Add +2 attack if the target is adjacent to any of the Giant Viper's allies."],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 32,
                actions: ["move +0", "attack +0", "Add +2 attack if the target is adjacent to any of the Giant Viper's allies."],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 11,
                actions: ["shield 1", "attack -1"],
            },
            {
                initiative: 58,
                actions: ["move -1, jump", "attack +1"],
            },
            {
                initiative: 58,
                actions: ["move +1, jump", "attack -1", "All attacks targeting Giant Viper this round gain Disadvantage."],
            },
        ],
    },
    "Harrower Infester": {
        stats: [
            {
                normal: {
                    maxHP: 6,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 12,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 2,
                    attack: 2,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 12,
                    move: 3,
                    attack: 2,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 2,
                    attack: 2,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 14,
                    move: 3,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 2,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 17,
                    move: 3,
                    attack: 3,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 19,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
                elite: {
                    maxHP: 21,
                    move: 3,
                    attack: 5,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
                elite: {
                    maxHP: 22,
                    move: 4,
                    attack: 5,
                    extra: ["retaliate 4"],
                },
            },
            {
                normal: {
                    maxHP: 17,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 4"],
                },
                elite: {
                    maxHP: 26,
                    move: 4,
                    attack: 5,
                    extra: ["retaliate 4"],
                },
            },
        ],
        cards: [
            {
                initiative: 2,
                actions: ["shield 2", "retaliate 2, range 3"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 7,
                actions: ["move +0", "attack -1, poison", { type: "element", create: elements.DARK }],
            },
            {
                initiative: 7,
                actions: ["attack -1, range 3, muddle", "heal 3, self"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 16,
                actions: ["attack +2, immobilize", "retaliate 2"],
            },
            {
                initiative: 16,
                actions: ["move -1", "attack -1", "heal 5, self"],
            },
            {
                initiative: 30,
                actions: ["move -1", { action: "attack +0", image: aoeLine4WithBlack }, { type: "element", use: elements.DARK, action: 'perform "heal 2 self" for each target damaged' }],
            },
            {
                initiative: 38,
                actions: ["move -1", "attack +1, target 2"],
            },
            {
                initiative: 38,
                actions: ["move +0", "attack -1, target 2", { type: "element", use: elements.DARK, action: "+2 attack, disarm" }],
            },
        ],
    },
    "Hound": {
        stats: [
            {
                normal: {
                    maxHP: 4,
                    move: 3,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 6,
                    move: 5,
                    attack: 2,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 4,
                    attack: 2,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 6,
                    move: 5,
                    attack: 2,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 4,
                    attack: 2,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 7,
                    move: 5,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 4,
                    attack: 2,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 8,
                    move: 5,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 4,
                    attack: 3,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 11,
                    move: 5,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 4,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 12,
                    move: 5,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 5,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 15,
                    move: 6,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 5,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 15,
                    move: 6,
                    attack: 5,
                    extra: ["retaliate 4"],
                },
            },
        ],
        cards: [
            {
                initiative: 72,
                actions: ["attack -1, pierce 2", "move -2", "attack -1, pierce 2"],
            },
            {
                initiative: 26,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 83,
                actions: ["move -2", "attack +1"],
            },
            {
                initiative: 26,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 19,
                actions: ["move +0", "attack +0", "add +2 attack if the target is adjacent to any of the Hound's allies."],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 19,
                actions: ["move +0", "attack +0", "add +2 attack if the target is adjacent to any of the Hound's allies."],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 7,
                actions: ["move +0", "muddle, target all adjacent enemies"],
            },
            {
                initiative: 8,
                actions: ["move -1", "attack +0, immobilize"],
            },
        ],
    },
    "Inox Archer": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    range: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 7,
                    move: 2,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 2,
                    attack: 2,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 8,
                    move: 2,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 2,
                    attack: 2,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 11,
                    move: 2,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    move: 2,
                    attack: 4,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 14,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 17,
                    move: 3,
                    attack: 4,
                    range: 5,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 19,
                    move: 3,
                    attack: 5,
                    range: 5,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 23,
                    move: 3,
                    attack: 5,
                    range: 5,
                    extra: ["wound"],
                },
            },
        ],
        cards: ARCHER_CARDS,
    },
    "Inox Guard": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 9,
                    move: 1,
                    attack: 3,
                    extra: ["retaliate 1"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 2,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 2,
                    attack: 3,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 12,
                    move: 2,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 15,
                    move: 2,
                    attack: 4,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 3,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 17,
                    move: 2,
                    attack: 5,
                    extra: ["retaliate 3"],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 19,
                    move: 2,
                    attack: 5,
                    extra: ["retaliate 4"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 1"],
                },
                elite: {
                    maxHP: 21,
                    move: 3,
                    attack: 5,
                    extra: ["retaliate 4"],
                },
            },
            {
                normal: {
                    maxHP: 19,
                    move: 3,
                    attack: 4,
                    extra: ["retaliate 2"],
                },
                elite: {
                    maxHP: 23,
                    move: 3,
                    attack: 6,
                    extra: ["retaliate 4"],
                },
            },
        ],
        cards: GUARD_CARDS,
    },
    "Inox Shaman": {
        stats: [
            {
                normal: {
                    maxHP: 4,
                    move: 1,
                    attack: 2,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 6,
                    move: 2,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 1,
                    attack: 2,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 2,
                    attack: 2,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 11,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 2,
                    attack: 2,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 14,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 2,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 16,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 2,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 20,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 24,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 27,
                    move: 4,
                    attack: 5,
                    range: 4,
                    extra: [],
                },
            },
        ],
        cards: SHAMAN_CARDS,
    },
    "Living Bones": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 1,
                    extra: ["target 2"],
                },
                elite: {
                    maxHP: 6,
                    move: 4,
                    attack: 2,
                    extra: ["target 2"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 3,
                    attack: 1,
                    extra: ["target 2", "shield 1"],
                },
                elite: {
                    maxHP: 6,
                    move: 4,
                    attack: 2,
                    extra: ["target 3", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 3,
                    attack: 2,
                    extra: ["target 2", "shield 1"],
                },
                elite: {
                    maxHP: 7,
                    move: 4,
                    attack: 3,
                    extra: ["target 3", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 3,
                    attack: 2,
                    extra: ["target 2", "shield 1"],
                },
                elite: {
                    maxHP: 10,
                    move: 4,
                    attack: 3,
                    extra: ["target 3", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 3,
                    attack: 3,
                    extra: ["target 2", "shield 1"],
                },
                elite: {
                    maxHP: 11,
                    move: 4,
                    attack: 4,
                    extra: ["target 3", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 3,
                    attack: 3,
                    extra: ["target 2", "shield 1"],
                },
                elite: {
                    maxHP: 11,
                    move: 4,
                    attack: 4,
                    extra: ["target 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 4,
                    attack: 3,
                    extra: ["target 2", "shield 1"],
                },
                elite: {
                    maxHP: 11,
                    move: 6,
                    attack: 4,
                    extra: ["target 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 4,
                    attack: 3,
                    extra: ["target 2", "shield 1"],
                },
                elite: {
                    maxHP: 14,
                    move: 6,
                    attack: 4,
                    extra: ["target 3", "shield 2"],
                },
            },
        ],
        cards: [
            {
                initiative: 81,
                actions: ["attack +2"],
            },
            {
                initiative: 45,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 64,
                actions: ["move -1", "attack +1"],
            },
            {
                initiative: 12,
                actions: ["shield 1", "heal 2, self"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 45,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 74,
                actions: ["move +0", "attack +0, target one enemy with all attacks"],
            },
            {
                initiative: 25,
                actions: ["move +1", "attack -1"],
            },
            {
                initiative: 20,
                actions: ["move -2", "attack +0", "heal 2, self"],
                endAction: END_ACTIONS.SHUFFLE,
            },
        ],
    },
    "Living Corpse": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 1,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 1,
                    attack: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 1,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 1,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 1,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    move: 1,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 1,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    move: 2,
                    attack: 5,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 2,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 15,
                    move: 2,
                    attack: 5,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 2,
                    attack: 4,
                    extra: [],
                },
                elite: {
                    maxHP: 17,
                    move: 2,
                    attack: 6,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 2,
                    attack: 4,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 21,
                    move: 2,
                    attack: 6,
                    extra: ["poison"],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 2,
                    attack: 5,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 25,
                    move: 2,
                    attack: 6,
                    extra: ["poison"],
                },
            },
        ],
        cards: [
            {
                initiative: 66,
                actions: ["move +0", "attack +0"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 66,
                actions: ["move +0", "attack +0"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 47,
                actions: ["move +1", "attack -1"],
            },
            {
                initiative: 21,
                actions: ["move +1", "muddle and immobilize, target one adjacent enemy"],
            },
            {
                initiative: 66,
                actions: ["move +0", "attack +0"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 71,
                actions: ["move +0", "attack +1", "poison, target all adjacent enemies"],
            },
            {
                initiative: 32,
                actions: ["attack +2, push 1", "Living Corpse suffers 1 damage"],
            },
            {
                initiative: 91,
                actions: ["move +1", "Living Corpse suffers 1 damage"],
            },
        ],
    },
    "Living Spirit": {
        stats: [
            {
                normal: {
                    maxHP: 2,
                    move: 2,
                    attack: 2,
                    range: 2,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 3,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 2,
                    move: 2,
                    attack: 2,
                    range: 2,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 3,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 2,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 3,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 4,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 4,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 6,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 7,
                    move: 4,
                    attack: 5,
                    range: 5,
                    extra: ["shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 9,
                    move: 4,
                    attack: 5,
                    range: 5,
                    extra: ["shield 4"],
                },
            },
        ],
        cards: [
            {
                initiative: 22,
                actions: ["move -1", "attack -1, muddle"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 33,
                actions: ["move +0", "attack -1, target all enemies in range"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 48,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 48,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 55,
                actions: ["move +0", "curse, target all enemies in range", { type: "element", create: elements.ICE }],
            },
            {
                initiative: 61,
                actions: ["attack +0, range -1, target 2"],
            },
            {
                initiative: 67,
                actions: ["move -1", "attack +1", { type: "element", use: elements.ICE, action: "stun" }],
            },
            {
                initiative: 75,
                actions: ["move -1", "attack +1, range -1", "heal 1, self"],
            },
        ],
    },
    "Lurker": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    extra: ["target 2"],
                },
                elite: {
                    maxHP: 7,
                    move: 2,
                    attack: 3,
                    extra: ["target 2", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 2,
                    attack: 2,
                    extra: ["target 2", "pierce 1"],
                },
                elite: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    extra: ["target 2", "pierce 1", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 3,
                    attack: 2,
                    extra: ["target 2", "pierce 1"],
                },
                elite: {
                    maxHP: 12,
                    move: 3,
                    attack: 3,
                    extra: ["target 2", "pierce 2", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 3,
                    extra: ["target 2", "pierce 2"],
                },
                elite: {
                    maxHP: 14,
                    move: 3,
                    attack: 4,
                    extra: ["target 2", "pierce 2", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 3,
                    attack: 3,
                    extra: ["target 2", "pierce 2", "shield 1"],
                },
                elite: {
                    maxHP: 14,
                    move: 3,
                    attack: 4,
                    extra: ["target 2", "pierce 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 3,
                    attack: 4,
                    extra: ["target 2", "pierce 2", "shield 1"],
                },
                elite: {
                    maxHP: 15,
                    move: 3,
                    attack: 5,
                    extra: ["target 2", "pierce 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 4,
                    attack: 4,
                    extra: ["target 2", "pierce 3", "shield 1"],
                },
                elite: {
                    maxHP: 16,
                    move: 4,
                    attack: 5,
                    extra: ["target 2", "pierce 4", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 4,
                    attack: 4,
                    extra: ["target 2", "pierce 3", "shield 1"],
                },
                elite: {
                    maxHP: 18,
                    move: 4,
                    attack: 5,
                    extra: ["target 2", "pierce 4", "shield 2"],
                },
            },
        ],
        cards: [
            {
                initiative: 11,
                actions: ["shield 1", { type: "element", use: elements.ICE, action: "shield 2 instead" }, "wound, target all adjacent enemies"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 23,
                actions: ["shield 1", "move +0", "attack -1", { type: "element", create: elements.ICE }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 28,
                actions: ["move +1", "attack -1"],
            },
            {
                initiative: 38,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 38,
                actions: ["move +0", "attack +0, target one enemy with all attacks"],
            },
            {
                initiative: 41,
                actions: [{ type: "element", use: elements.ICE, action: "strengthen, self" }, "move +0", "attack -1, wound"],
            },
            {
                initiative: 61,
                actions: ["move -1", "attack +1"],
            },
            {
                initiative: 64,
                actions: ["attack +1, target all adjacent enemies"],
            },
        ],
    },
    "Night Demon": {
        stats: [
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 3,
                    extra: ["attackers gain disadvantage"],
                },
                elite: {
                    maxHP: 5,
                    move: 4,
                    attack: 4,
                    extra: ["attackers gain disadvantage"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 3,
                    attack: 3,
                    extra: ["attackers gain disadvantage"],
                },
                elite: {
                    maxHP: 8,
                    move: 4,
                    attack: 4,
                    extra: ["attackers gain disadvantage"],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 4,
                    extra: ["attackers gain disadvantage"],
                },
                elite: {
                    maxHP: 11,
                    move: 4,
                    attack: 4,
                    extra: ["attackers gain disadvantage"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 4,
                    attack: 4,
                    extra: ["attackers gain disadvantage"],
                },
                elite: {
                    maxHP: 13,
                    move: 4,
                    attack: 5,
                    extra: ["attackers gain disadvantage"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 4,
                    attack: 5,
                    extra: ["attackers gain disadvantage"],
                },
                elite: {
                    maxHP: 15,
                    move: 5,
                    attack: 5,
                    extra: ["attackers gain disadvantage"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 4,
                    attack: 5,
                    extra: ["attackers gain disadvantage"],
                },
                elite: {
                    maxHP: 17,
                    move: 5,
                    attack: 6,
                    extra: ["attackers gain disadvantage"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 4,
                    attack: 5,
                    extra: ["attackers gain disadvantage"],
                },
                elite: {
                    maxHP: 21,
                    move: 5,
                    attack: 6,
                    extra: ["attackers gain disadvantage"],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 4,
                    attack: 6,
                    extra: ["attackers gain disadvantage"],
                },
                elite: {
                    maxHP: 21,
                    move: 5,
                    attack: 8,
                    extra: ["attackers gain disadvantage"],
                },
            },
        ],
        cards: [
            {
                initiative: 35,
                actions: ["attack -1", "attack -1, pierce 2", { type: "element", use: elements.LIGHT, action: "curse, self" }],
            },
            {
                initiative: 15,
                actions: ["move +0", "attack -1", "All adjacent enemies and allies suffer 1 damage", { type: "element", use: elements.ANY, create: elements.DARK }],
            },
            {
                initiative: 41,
                actions: ["move -1", "attack +1", { type: "element", create: elements.DARK }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 46,
                actions: ["move -1", "attack +1", { type: "element", use: elements.DARK, action: "+2 attack" }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 7,
                actions: ["move +1", "attack -1", { type: "element", use: elements.DARK, action: "invisible, self" }],
            },
            {
                initiative: 26,
                actions: ["attack -2, range 3, target 3", { type: "element", use: elements.DARK, action: "muddle" }],
            },
            {
                initiative: 4,
                actions: ["move +1", "attack -1", { type: "element", create: elements.DARK }],
            },
            {
                initiative: 22,
                actions: ["move +0", "attack +0", { type: "element", create: elements.DARK }],
            },
        ],
    },
    "Ooze": {
        stats: [
            {
                normal: {
                    maxHP: 4,
                    move: 1,
                    attack: 2,
                    range: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 8,
                    move: 1,
                    attack: 2,
                    range: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 1,
                    attack: 2,
                    range: 2,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 9,
                    move: 1,
                    attack: 2,
                    range: 3,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 1,
                    attack: 2,
                    range: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 11,
                    move: 1,
                    attack: 3,
                    range: 3,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 1,
                    attack: 3,
                    range: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 11,
                    move: 2,
                    attack: 3,
                    range: 4,
                    extra: ["poison", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    range: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 13,
                    move: 2,
                    attack: 4,
                    range: 4,
                    extra: ["poison", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 2,
                    attack: 3,
                    range: 3,
                    extra: ["poison", "shield 1"],
                },
                elite: {
                    maxHP: 15,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["poison", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 2,
                    attack: 4,
                    range: 3,
                    extra: ["poison", "shield 1"],
                },
                elite: {
                    maxHP: 16,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["poison", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 2,
                    attack: 4,
                    range: 3,
                    extra: ["poison", "shield 1"],
                },
                elite: {
                    maxHP: 18,
                    move: 3,
                    attack: 5,
                    range: 4,
                    extra: ["poison", "shield 2"],
                },
            },
        ],
        cards: [
            {
                initiative: 36,
                actions: ["move +1", "attack -1"],
            },
            {
                initiative: 57,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 59,
                actions: ["attack +0, target 2, poison"],
            },
            {
                initiative: 66,
                actions: ["move -1", "loot 1", "heal 2, self"],
            },
            {
                initiative: 66,
                actions: ["move -1", "attack +1, range +1"],
            },
            {
                initiative: 85,
                actions: ["push 1 and poison, target all adjacent enemies", "attack +1, range -1"],
            },
            {
                initiative: 94,
                actions: ["Ooze suffers 2 damage", "summon normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 94,
                actions: ["Ooze suffers 2 damage", "summon normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)"],
                endAction: END_ACTIONS.SHUFFLE,
            },
        ],
    },
    "Rending Drake": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 7,
                    move: 4,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 3,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 7,
                    move: 4,
                    attack: 5,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 4,
                    attack: 3,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 9,
                    move: 5,
                    attack: 5,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 4,
                    attack: 4,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 10,
                    move: 5,
                    attack: 6,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 4,
                    attack: 4,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 11,
                    move: 6,
                    attack: 6,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 4,
                    attack: 5,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 14,
                    move: 6,
                    attack: 6,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 5,
                    attack: 5,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 15,
                    move: 6,
                    attack: 7,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 5,
                    attack: 5,
                    extra: ["wound"],
                },
                elite: {
                    maxHP: 18,
                    move: 6,
                    attack: 7,
                    extra: ["wound"],
                },
            },
        ],
        cards: [
            {
                initiative: 6,
                actions: ["shield 2", "heal 2, self", "strengthen, self"],
            },
            {
                initiative: 12,
                actions: ["move +1", "attack -1"],
            },
            {
                initiative: 13,
                actions: ["attack -1", "move -1", "attack -1"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 25,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 39,
                actions: ["move -1", "attack +1"],
            },
            {
                initiative: 54,
                actions: ["move -2", "attack -1, range 3, target 2, poison"],
            },
            {
                initiative: 59,
                actions: ["move -2", "attack +1, target 2"],
            },
            {
                initiative: 72,
                actions: ["attack -1", "attack -1", "attack -2"],
                endAction: END_ACTIONS.SHUFFLE,
            },
        ],
    },
    "Savvas Lavaflow": {
        stats: [
            {
                normal: {
                    maxHP: 7,
                    move: 2,
                    attack: 2,
                    range: 3,
                    extra: ["pierce 3"],
                },
                elite: {
                    maxHP: 12,
                    move: 2,
                    attack: 3,
                    range: 4,
                    extra: ["pierce 3"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 2,
                    attack: 2,
                    range: 4,
                    extra: ["pierce 3"],
                },
                elite: {
                    maxHP: 12,
                    move: 2,
                    attack: 3,
                    range: 5,
                    extra: ["pierce 3", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 2,
                    range: 4,
                    extra: ["pierce 3"],
                },
                elite: {
                    maxHP: 15,
                    move: 3,
                    attack: 3,
                    range: 5,
                    extra: ["pierce 3", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: ["pierce 3", "shield 1"],
                },
                elite: {
                    maxHP: 18,
                    move: 3,
                    attack: 4,
                    range: 6,
                    extra: ["pierce 3", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 3,
                    attack: 3,
                    range: 5,
                    extra: ["pierce 3", "shield 1"],
                },
                elite: {
                    maxHP: 19,
                    move: 4,
                    attack: 4,
                    range: 6,
                    extra: ["pierce 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 3,
                    attack: 4,
                    range: 5,
                    extra: ["pierce 3", "shield 1"],
                },
                elite: {
                    maxHP: 21,
                    move: 4,
                    attack: 5,
                    range: 6,
                    extra: ["pierce 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 3,
                    attack: 4,
                    range: 5,
                    extra: ["pierce 3", "shield 2"],
                },
                elite: {
                    maxHP: 23,
                    move: 4,
                    attack: 6,
                    range: 6,
                    extra: ["pierce 3", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 17,
                    move: 4,
                    attack: 4,
                    range: 6,
                    extra: ["pierce 3", "shield 2"],
                },
                elite: {
                    maxHP: 24,
                    move: 4,
                    attack: 6,
                    range: 6,
                    extra: ["pierce 4", "shield 3"],
                },
            },
        ],
        cards: [
            {
                initiative: 22,
                actions: ["move +1", "attack -1, target all adjacent enemies", { type: "element", use: elements.FIRE, action: "retaliate 3" }],
            },
            {
                initiative: 31,
                actions: ["heal 4, range 3", { type: "element", use: elements.EARTH, action: "target 3" }],
            },
            {
                initiative: 41,
                actions: ["move +0", { action: "attack -1", image: aoeLine4WithBlack }, { type: "element", use: elements.EARTH, action: "+2 attack, immobilize" }],
            },
            {
                initiative: 51,
                actions: ["all enemies suffer 2 damage", { type: "element", use: elements.FIRE, action: "wound all enemies" }, { type: "element", use: elements.EARTH, action: "disarm all enemies" }],
            },
            {
                initiative: 68,
                actions: ["move -1", "attack +1, range 3, all allies and enemies adjacent to the target suffer 2 damage.", { type: "element", create: elements.EARTH }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 68,
                actions: ["move -1", "attack -1, range 3, target 2", { type: "element", create: elements.FIRE }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 97,
                actions: ["summon normal Flame Demon", { type: "element", create: elements.FIRE }],
            },
            {
                initiative: 97,
                actions: ["summon normal Earth Demon", { type: "element", create: elements.EARTH }],
            },
        ],
    },
    "Savvas Icestorm": {
        stats: [
            {
                normal: {
                    maxHP: 8,
                    move: 3,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 13,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 3,
                    attack: 2,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 15,
                    move: 3,
                    attack: 3,
                    extra: ["wound"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 3,
                    attack: 3,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 18,
                    move: 3,
                    attack: 3,
                    extra: ["poison", "wound"],
                },
            },
            {
                normal: {
                    maxHP: 14,
                    move: 3,
                    attack: 3,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 21,
                    move: 3,
                    attack: 4,
                    extra: ["poison", "wound"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 3,
                    attack: 4,
                    extra: ["poison"],
                },
                elite: {
                    maxHP: 24,
                    move: 4,
                    attack: 4,
                    extra: ["poison", "wound"],
                },
            },
            {
                normal: {
                    maxHP: 18,
                    move: 3,
                    attack: 4,
                    extra: ["poison", "wound"],
                },
                elite: {
                    maxHP: 27,
                    move: 4,
                    attack: 5,
                    extra: ["poison", "wound"],
                },
            },
            {
                normal: {
                    maxHP: 20,
                    move: 4,
                    attack: 4,
                    extra: ["poison", "wound"],
                },
                elite: {
                    maxHP: 30,
                    move: 4,
                    attack: 6,
                    extra: ["poison", "wound"],
                },
            },
            {
                normal: {
                    maxHP: 24,
                    move: 4,
                    attack: 4,
                    extra: ["poison", "wound"],
                },
                elite: {
                    maxHP: 35,
                    move: 4,
                    attack: 6,
                    extra: ["poison", "wound"],
                },
            },
        ],
        cards: [
            {
                initiative: 14,
                actions: ["attack +0", { type: "element", use: elements.ICE, action: "+2 attack, immobiilize" }, "retaliate 2", { type: "element", create: elements.AIR }],
            },
            {
                initiative: 14,
                actions: ["shield 4", "heal 2, range 3", { type: "element", use: elements.ICE, action: "+3 heal" }, { type: "element", use: elements.AIR, action: "attack +0" }],
            },
            {
                initiative: 19,
                actions: ["move +0", "attack -1, range -1", "shield 1, affect self and all allies within range 2", { type: "element", create: elements.ICE }],
            },
            {
                initiative: 35,
                actions: ["move -1", { action: "attack -1", image: aoeTriangle3WithCornerBlack }, { type: "element", create: elements.ICE }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 47,
                actions: ["disarm, target all adjacent enemies", "move +0", "attack -1", { type: "element", create: elements.AIR }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 70,
                actions: ["push 2, target all adjacent enemies", { type: "element", use: elements.AIR, action: "push 4 instead" }, "attack +1, range +1"],
            },
            {
                initiative: 98,
                actions: ["summon normal Wind Demon", { type: "element", create: elements.AIR }],
            },
            {
                initiative: 98,
                actions: ["summon normal Frost Demon", { type: "element", create: elements.ICE }],
            },
        ],
    },
    "Spitting Drake": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 8,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 9,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["muddle"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 3,
                    attack: 3,
                    range: 3,
                    extra: ["muddle"],
                },
                elite: {
                    maxHP: 10,
                    move: 3,
                    attack: 5,
                    range: 4,
                    extra: ["muddle"],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["muddle"],
                },
                elite: {
                    maxHP: 12,
                    move: 3,
                    attack: 5,
                    range: 5,
                    extra: ["muddle"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["muddle"],
                },
                elite: {
                    maxHP: 14,
                    move: 4,
                    attack: 5,
                    range: 5,
                    extra: ["muddle"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["muddle"],
                },
                elite: {
                    maxHP: 16,
                    move: 4,
                    attack: 6,
                    range: 5,
                    extra: ["muddle"],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 4,
                    attack: 5,
                    range: 4,
                    extra: ["muddle"],
                },
                elite: {
                    maxHP: 19,
                    move: 4,
                    attack: 6,
                    range: 5,
                    extra: ["muddle"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 4,
                    attack: 5,
                    range: 4,
                    extra: ["muddle"],
                },
                elite: {
                    maxHP: 21,
                    move: 4,
                    attack: 7,
                    range: 5,
                    extra: ["muddle"],
                },
            },
        ],
        cards: [
            {
                initiative: 27,
                actions: ["attack +0, target 2, poison"],
            },
            {
                initiative: 6,
                actions: ["shield 2", "heal 2, self", "strengthen, self"],
            },
            {
                initiative: 32,
                actions: ["move +1", "attack -1"],
            },
            {
                initiative: 52,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 87,
                actions: ["move -1", "attack +1"],
            },
            {
                initiative: 89,
                actions: ["attack -2, stun"],
            },
            {
                initiative: 57,
                actions: ["move +0", { action: "attack -1, range -1", image: aoeTriangle2 }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 89,
                actions: ["move -1", { action: "attack -2, range -2, poison", image: aoeCircle }],
                endAction: END_ACTIONS.SHUFFLE,
            },
        ],
    },
    "Stone Golem": {
        stats: [
            {
                normal: {
                    maxHP: 10,
                    move: 1,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 10,
                    move: 2,
                    attack: 4,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 1,
                    attack: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 11,
                    move: 2,
                    attack: 4,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 1,
                    attack: 4,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 14,
                    move: 2,
                    attack: 5,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 1,
                    attack: 4,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 15,
                    move: 2,
                    attack: 5,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 2,
                    attack: 4,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 17,
                    move: 2,
                    attack: 6,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 13,
                    move: 2,
                    attack: 5,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 19,
                    move: 3,
                    attack: 6,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 2,
                    attack: 5,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 20,
                    move: 3,
                    attack: 7,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 16,
                    move: 2,
                    attack: 5,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 21,
                    move: 3,
                    attack: 7,
                    extra: ["shield 4"],
                },
            },
        ],
        cards: [
            {
                initiative: 51,
                actions: ["move +1", "attack -1"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 65,
                actions: ["move +0", "attack +0"],
            },
            {
                initiative: 90,
                actions: ["move -1", "attack +1"],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 11,
                actions: ["retaliate 3, range 3"],
            },
            {
                initiative: 28,
                actions: ["move +1", "attack +0", "Stone Golem suffers 1 damage"],
            },
            {
                initiative: 72,
                actions: ["attack +1, range 3", "Stone Golem suffers 2 damage"],
            },
            {
                initiative: 83,
                actions: ["move +0", "attack -1, target all adjacent enemies"],
            },
            {
                initiative: 28,
                actions: ["move +1", "attack -2, range 3, pull 2, immobilize"],
            },
        ],
    },
    "Sun Demon": {
        stats: [
            {
                normal: {
                    maxHP: 5,
                    move: 2,
                    attack: 2,
                    extra: ["advantage", "shield 1"],
                },
                elite: {
                    maxHP: 9,
                    move: 2,
                    attack: 3,
                    extra: ["advantage", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 2,
                    attack: 2,
                    extra: ["advantage", "shield 1"],
                },
                elite: {
                    maxHP: 12,
                    move: 2,
                    attack: 3,
                    extra: ["advantage", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 2,
                    attack: 2,
                    extra: ["advantage", "shield 1"],
                },
                elite: {
                    maxHP: 13,
                    move: 2,
                    attack: 4,
                    extra: ["advantage", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 2,
                    attack: 3,
                    extra: ["advantage", "shield 1"],
                },
                elite: {
                    maxHP: 15,
                    move: 3,
                    attack: 4,
                    extra: ["advantage", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 3,
                    attack: 3,
                    extra: ["advantage", "shield 1"],
                },
                elite: {
                    maxHP: 16,
                    move: 3,
                    attack: 5,
                    extra: ["advantage", "shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 3,
                    attack: 3,
                    extra: ["advantage", "shield 2"],
                },
                elite: {
                    maxHP: 16,
                    move: 3,
                    attack: 5,
                    extra: ["advantage", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 12,
                    move: 3,
                    attack: 4,
                    extra: ["advantage", "shield 2"],
                },
                elite: {
                    maxHP: 18,
                    move: 4,
                    attack: 5,
                    extra: ["advantage", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 15,
                    move: 3,
                    attack: 4,
                    extra: ["advantage", "shield 2"],
                },
                elite: {
                    maxHP: 22,
                    move: 4,
                    attack: 5,
                    extra: ["advantage", "shield 2"],
                },
            },
        ],
        cards: [
            {
                initiative: 95,
                actions: ["move -1", "attack +0, range 4", { type: "element", use: elements.LIGHT, action: "target all enemies within range" }],
            },
            {
                initiative: 88,
                actions: ["move -1", "attack -1, target all adjacent enemies", { type: "element", use: elements.DARK, action: "muddle, self" }],
            },
            {
                initiative: 17,
                actions: ["heal 3, range 3", { type: "element", use: elements.LIGHT, action: "target all allies within range" }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 73,
                actions: ["move +0", "attack +1", { type: "element", use: elements.LIGHT, action: "heal 3, self" }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 68,
                actions: ["move +0", "attack +1", { type: "element", create: elements.LIGHT }],
            },
            {
                initiative: 36,
                actions: ["move +0", "attack +0, target all adjacent enemies", { type: "element", create: elements.LIGHT }],
            },
            {
                initiative: 36,
                actions: ["move +0", "attack +0, target all adjacent enemies", { type: "element", create: elements.LIGHT }],
            },
            {
                initiative: 50,
                actions: ["move +0", "attack +0, range 3", { type: "element", use: elements.ANY, create: elements.LIGHT }],
            },
        ],
    },
    "Vermling Scout": {
        stats: [
            {
                normal: {
                    maxHP: 2,
                    move: 3,
                    attack: 1,
                    extra: [],
                },
                elite: {
                    maxHP: 4,
                    move: 3,
                    attack: 2,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 1,
                    extra: [],
                },
                elite: {
                    maxHP: 5,
                    move: 3,
                    attack: 2,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 5,
                    move: 4,
                    attack: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 3,
                    attack: 2,
                    extra: [],
                },
                elite: {
                    maxHP: 7,
                    move: 4,
                    attack: 3,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 6,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 8,
                    move: 4,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 8,
                    move: 3,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 11,
                    move: 4,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 4,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 12,
                    move: 5,
                    attack: 4,
                    extra: [],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 4,
                    attack: 3,
                    extra: [],
                },
                elite: {
                    maxHP: 15,
                    move: 5,
                    attack: 4,
                    extra: [],
                },
            },
        ],
        cards: SCOUT_CARDS,
    },
    "Vermling Shaman": {
        stats: [
            {
                normal: {
                    maxHP: 2,
                    move: 2,
                    attack: 1,
                    range: 3,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 3,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 2,
                    move: 2,
                    attack: 1,
                    range: 3,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 3,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 2,
                    attack: 1,
                    range: 4,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 4,
                    move: 3,
                    attack: 2,
                    range: 4,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 2,
                    attack: 2,
                    range: 4,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 5,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: ["shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 2,
                    range: 4,
                    extra: ["muddle", "shield 3"],
                },
                elite: {
                    maxHP: 5,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: ["muddle", "shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 3,
                    attack: 3,
                    range: 4,
                    extra: ["muddle", "shield 3"],
                },
                elite: {
                    maxHP: 6,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["muddle", "shield 4"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["muddle", "shield 3"],
                },
                elite: {
                    maxHP: 6,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["muddle", "shield 5"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["muddle", "shield 3"],
                },
                elite: {
                    maxHP: 8,
                    move: 3,
                    attack: 4,
                    range: 4,
                    extra: ["muddle", "shield 5"],
                },
            },
        ],
        cards: SHAMAN_CARDS,
    },
    "Wind Demon": {
        stats: [
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["shield 1"],
                },
                elite: {
                    maxHP: 5,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["shield 1"],
                },
            },
            {
                normal: {
                    maxHP: 3,
                    move: 3,
                    attack: 2,
                    range: 3,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 5,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 4,
                    move: 4,
                    attack: 2,
                    range: 3,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 7,
                    move: 5,
                    attack: 3,
                    range: 4,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 5,
                    move: 4,
                    attack: 3,
                    range: 3,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 8,
                    move: 5,
                    attack: 4,
                    range: 4,
                    extra: ["shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 7,
                    move: 4,
                    attack: 3,
                    range: 3,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 8,
                    move: 5,
                    attack: 4,
                    range: 4,
                    extra: ["disarm", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 9,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["shield 2"],
                },
                elite: {
                    maxHP: 11,
                    move: 5,
                    attack: 4,
                    range: 4,
                    extra: ["disarm", "shield 2"],
                },
            },
            {
                normal: {
                    maxHP: 10,
                    move: 4,
                    attack: 3,
                    range: 4,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 12,
                    move: 5,
                    attack: 4,
                    range: 4,
                    extra: ["disarm", "shield 3"],
                },
            },
            {
                normal: {
                    maxHP: 11,
                    move: 4,
                    attack: 4,
                    range: 4,
                    extra: ["shield 3"],
                },
                elite: {
                    maxHP: 13,
                    move: 5,
                    attack: 5,
                    range: 4,
                    extra: ["disarm", "shield 3"],
                },
            },
        ],
        cards: [
            {
                initiative: 37,
                actions: ["move +0", { action: "attack +0", image: aoe4WithBlack }, { type: "element", use: elements.AIR, action: "+1 attack", image: aoeCircleWithSideBlack }],
            },
            {
                initiative: 9,
                actions: ["attack -1", "heal 1, self", { type: "element", use: elements.AIR, action: "invisible, self" }],
            },
            {
                initiative: 21,
                actions: ["move +0", "attack +0, pull 1", { type: "element", create: elements.AIR }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 21,
                actions: ["move +0", "attack +0, pull 1", { type: "element", create: elements.AIR }],
                endAction: END_ACTIONS.SHUFFLE,
            },
            {
                initiative: 29,
                actions: ["move +0", "attack -1, target 2", { type: "element", use: elements.AIR, action: "push 2" }],
            },
            {
                initiative: 43,
                actions: ["move -1", "attack +1", { type: "element", use: elements.AIR, action: "target 2" }],
            },
            {
                initiative: 43,
                actions: ["push 1, target all adjacent enemies", "attack +0", { type: "element", use: elements.EARTH, action: "-2 range" }],
            },
            {
                initiative: 2,
                actions: ["shield 1", "move -1", "attack +1", { type: "element", use: elements.ANY, create: elements.AIR }],
            },
        ],
    },
};
export const MONSTER_LIST = Object.keys(MONSTERS);

export const BOSS_STATS = {
    "Bandit Commander": [
        (numPlayers) => ({
            maxHP: 8 * numPlayers,
            move: 3,
            attack: 3,
            specialOne: ["Move to next door and reveal room"],
            specialTwo: ["Summon Living Bones"],
            immunities: [statusEffects.IMMOBILIZE, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 10 * numPlayers,
            move: 3,
            attack: 3,
            specialOne: ["Move to next door and reveal room"],
            specialTwo: ["Summon Living Bones"],
            immunities: [statusEffects.IMMOBILIZE, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            move: 4,
            attack: 3,
            specialOne: ["Move to next door and reveal room"],
            specialTwo: ["Summon Living Bones"],
            immunities: [statusEffects.IMMOBILIZE, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 13 * numPlayers,
            move: 4,
            attack: 4,
            specialOne: ["Move to next door and reveal room"],
            specialTwo: ["Summon Living Bones"],
            immunities: [statusEffects.IMMOBILIZE, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 15 * numPlayers,
            move: 4,
            attack: 4,
            specialOne: ["Move to next door and reveal room"],
            specialTwo: ["Summon Living Bones"],
            immunities: [statusEffects.IMMOBILIZE, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 16 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["Move to next door and reveal room"],
            specialTwo: ["Summon Living Bones"],
            immunities: [statusEffects.IMMOBILIZE, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 19 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["Move to next door and reveal room"],
            specialTwo: ["Summon Living Bones"],
            immunities: [statusEffects.IMMOBILIZE, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 23 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["Move to next door and reveal room"],
            specialTwo: ["Summon Living Bones"],
            immunities: [statusEffects.IMMOBILIZE, statusEffects.STUN, statusEffects.CURSE],
        }),
    ],
    "The Betrayer": [
        (numPlayers) => ({
            maxHP: 10 * numPlayers,
            move: 3,
            attack: 4,
            range: 3,
            specialOne: ["Summon Giant Viper and Fear"],
            specialTwo: ["Mind Control"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            move: 3,
            attack: 5,
            range: 3,
            specialOne: ["Summon Giant Viper and Fear"],
            specialTwo: ["Mind Control"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 14 * numPlayers,
            move: 3,
            attack: 6,
            range: 4,
            specialOne: ["Summon Giant Viper and Fear"],
            specialTwo: ["Mind Control"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 16 * numPlayers,
            move: 4,
            attack: 7,
            range: 4,
            specialOne: ["Summon Giant Viper and Fear"],
            specialTwo: ["Mind Control"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 18 * numPlayers,
            move: 4,
            attack: 8,
            range: 4,
            specialOne: ["Summon Giant Viper and Fear"],
            specialTwo: ["Mind Control"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 20 * numPlayers,
            move: 5,
            attack: 8,
            range: 5,
            specialOne: ["Summon Giant Viper and Fear"],
            specialTwo: ["Mind Control"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 23 * numPlayers,
            move: 5,
            attack: 9,
            range: 5,
            specialOne: ["Summon Giant Viper and Fear"],
            specialTwo: ["Mind Control"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 27 * numPlayers,
            move: 5,
            attack: 9,
            range: 5,
            specialOne: ["Summon Giant Viper and Fear"],
            specialTwo: ["Mind Control"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
    ],
    "Captain of the Guard": [
        (numPlayers) => ({
            maxHP: 7 * numPlayers,
            move: 2,
            attack: 3,
            specialOne: ["heal 2, affect self and all allies"],
            specialTwo: ["All allies add +1 attack to all attacks this round"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 9 * numPlayers,
            move: 2,
            attack: 3,
            specialOne: ["heal 2, affect self and all allies"],
            specialTwo: ["All allies add +1 attack to all attacks this round"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 11 * numPlayers,
            move: 2,
            attack: 4,
            specialOne: ["heal 2, affect self and all allies"],
            specialTwo: ["All allies add +1 attack to all attacks this round"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 14 * numPlayers,
            move: 3,
            attack: 4,
            specialOne: ["heal 2, affect self and all allies"],
            specialTwo: ["All allies add +1 attack to all attacks this round"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 16 * numPlayers,
            move: 3,
            attack: 5,
            specialOne: ["heal 2, affect self and all allies"],
            specialTwo: ["All allies add +1 attack to all attacks this round"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 20 * numPlayers,
            move: 3,
            attack: 5,
            specialOne: ["heal 2, affect self and all allies"],
            specialTwo: ["All allies add +1 attack to all attacks this round"],
            immunities: [statusEffects.DISARM, statusEffects.WOUND, statusEffects.MUDDLE, statusEffects.STUN],
        }),
        (numPlayers) => ({
            maxHP: 21 * numPlayers,
            move: 4,
            attack: 6,
            specialOne: ["heal 2, affect self and all allies"],
            specialTwo: ["All allies add +1 attack to all attacks this round"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 25 * numPlayers,
            move: 4,
            attack: 6,
            specialOne: ["heal 2, affect self and all allies"],
            specialTwo: ["All allies add +1 attack to all attacks this round"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
    ],
    "The Colorless": [
        (numPlayers) => ({
            maxHP: 9 * numPlayers,
            move: 3,
            attack: 2,
            specialOne: [{ type: "element", use: elements.DARK, action: "Summon Night Demon" }, "invisible, self"],
            specialTwo: [{ type: "element", use: elements.LIGHT, action: "Summon Sun Demon" }, "heal 4, self", "sheld 1"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 10 * numPlayers,
            move: 3,
            attack: 3,
            specialOne: [{ type: "element", use: elements.DARK, action: "Summon Night Demon" }, "invisible, self"],
            specialTwo: [{ type: "element", use: elements.LIGHT, action: "Summon Sun Demon" }, "heal 4, self", "shield 1"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 11 * numPlayers,
            move: 4,
            attack: 3,
            specialOne: [{ type: "element", use: elements.DARK, action: "Summon Night Demon" }, "invisible, self"],
            specialTwo: [{ type: "element", use: elements.LIGHT, action: "Summon Sun Demon" }, "heal 5, self", "shield 1"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            move: 4,
            attack: 4,
            specialOne: [{ type: "element", use: elements.DARK, action: "Summon Night Demon" }, "invisible, self"],
            specialTwo: [{ type: "element", use: elements.LIGHT, action: "Summon Sun Demon" }, "heal 5, self", "shield 1"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 14 * numPlayers,
            move: 4,
            attack: 4,
            specialOne: [{ type: "element", use: elements.DARK, action: "Summon Night Demon" }, "invisible, self"],
            specialTwo: [{ type: "element", use: elements.LIGHT, action: "Summon Sun Demon" }, "heal 6, self", "shield 1"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 15 * numPlayers,
            move: 4,
            attack: 5,
            specialOne: [{ type: "element", use: elements.DARK, action: "Summon Night Demon" }, "invisible, self"],
            specialTwo: [{ type: "element", use: elements.LIGHT, action: "Summon Sun Demon" }, "heal 6, self", "shield 1"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 17 * numPlayers,
            move: 4,
            attack: 6,
            specialOne: [{ type: "element", use: elements.DARK, action: "Summon Night Demon" }, "invisible, self"],
            specialTwo: [{ type: "element", use: elements.LIGHT, action: "Summon Sun Demon" }, "heal 7, self", "shield 1"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 19 * numPlayers,
            move: 5,
            attack: 7,
            specialOne: [{ type: "element", use: elements.DARK, action: "Summon Night Demon" }, "invisible, self"],
            specialTwo: [{ type: "element", use: elements.LIGHT, action: "Summon Sun Demon" }, "heal 7, self", "shield 1"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
    ],
    "Dark Rider": [
        (numPlayers) => ({
            maxHP: 9 * numPlayers,
            move: 2,
            attack: "3+X",
            specialOne: ["move +2, attack +0"],
            specialTwo: ["move +0, Summon Imp, attack -1"],
            extra: ["X = Hexes moved"],
            immunities: [statusEffects.POISON, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN],
        }),
        (numPlayers) => ({
            maxHP: 10 * numPlayers,
            move: 3,
            attack: "3+X",
            specialOne: ["move +2, attack +0"],
            specialTwo: ["move +0, Summon Imp, attack -1"],
            extra: ["X = Hexes moved"],
            immunities: [statusEffects.POISON, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            move: 3,
            attack: "3+X",
            specialOne: ["move +2, attack +0"],
            specialTwo: ["move +0, Summon Imp, attack -1"],
            extra: ["X = Hexes moved"],
            immunities: [statusEffects.POISON, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN],
        }),
        (numPlayers) => ({
            maxHP: 13 * numPlayers,
            move: 3,
            attack: "4+X",
            specialOne: ["move +2, attack +0"],
            specialTwo: ["move +0, Summon Imp, attack -1"],
            extra: ["X = Hexes moved"],
            immunities: [statusEffects.POISON, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN],
        }),
        (numPlayers) => ({
            maxHP: 15 * numPlayers,
            move: 3,
            attack: "4+X",
            specialOne: ["move +2, attack +0"],
            specialTwo: ["move +0, Summon Imp, attack -1"],
            extra: ["X = Hexes moved"],
            immunities: [statusEffects.POISON, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN],
        }),
        (numPlayers) => ({
            maxHP: 16 * numPlayers,
            move: 3,
            attack: "5+X",
            specialOne: ["move +2, attack +0"],
            specialTwo: ["move +0, Summon Imp, attack -1"],
            extra: ["X = Hexes moved"],
            immunities: [statusEffects.POISON, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN],
        }),
        (numPlayers) => ({
            maxHP: 16 * numPlayers,
            move: 4,
            attack: "5+X",
            specialOne: ["move +2, attack +0"],
            specialTwo: ["move +0, Summon Imp, attack -1"],
            extra: ["X = Hexes moved"],
            immunities: [statusEffects.POISON, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN],
        }),
        (numPlayers) => ({
            maxHP: 18 * numPlayers,
            move: 4,
            attack: "6+X",
            specialOne: ["move +2, attack +0"],
            specialTwo: ["move +0, Summon Imp, attack -1"],
            extra: ["X = Hexes moved"],
            immunities: [statusEffects.POISON, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN],
        }),
    ],
    "Elder Drake": [
        (numPlayers) => ({
            maxHP: 11 * numPlayers,
            attack: 3,
            specialOne: [{ action: "attack +0", image: elderDrakeSpecial1Area }],
            specialTwo: ["Move and summon 2 Zephyrs"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            attack: 4,
            specialOne: [{ action: "attack +0", image: elderDrakeSpecial1Area }],
            specialTwo: ["Move and summon 2 Zephyrs"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 15 * numPlayers,
            attack: 4,
            specialOne: [{ action: "attack +0", image: elderDrakeSpecial1Area }],
            specialTwo: ["Move and summon 2 Zephyrs"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 16 * numPlayers,
            attack: 5,
            specialOne: [{ action: "attack +0", image: elderDrakeSpecial1Area }],
            specialTwo: ["Move and summon 2 Zephyrs"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 20 * numPlayers,
            attack: 5,
            specialOne: [{ action: "attack +0", image: elderDrakeSpecial1Area }],
            specialTwo: ["Move and summon 2 Zephyrs"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 22 * numPlayers,
            attack: 6,
            specialOne: [{ action: "attack +0", image: elderDrakeSpecial1Area }],
            specialTwo: ["Move and summon 2 Zephyrs"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 27 * numPlayers,
            attack: 6,
            specialOne: [{ action: "attack +0", image: elderDrakeSpecial1Area }],
            specialTwo: ["Move and summon 2 Zephyrs"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 29 * numPlayers,
            attack: 7,
            specialOne: [{ action: "attack +0", image: elderDrakeSpecial1Area }],
            specialTwo: ["Move and summon 2 Zephyrs"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.PULL, statusEffects.PUSH],
        }),
    ],
    "The Gloom": [
        (numPlayers) => ({
            maxHP: 20 * numPlayers,
            move: 2,
            attack: 5,
            specialOne: ["move +9", "attack +9"],
            specialTwo: ["Teleport", "attack +1", "range 5", "poison", "wound", "stun"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 25 * numPlayers,
            move: 2,
            attack: 5,
            specialOne: ["move +9", "attack +9"],
            specialTwo: ["Teleport", "attack +1", "range 5", "poison", "wound", "stun"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 29 * numPlayers,
            move: 2,
            attack: 6,
            specialOne: ["move +9", "attack +9"],
            specialTwo: ["Teleport", "attack +1", "range 5", "poison", "wound", "stun"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 35 * numPlayers,
            move: 2,
            attack: 6,
            specialOne: ["move +9", "attack +9"],
            specialTwo: ["Teleport", "attack +1", "range 5", "poison", "wound", "stun"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 39 * numPlayers,
            move: 3,
            attack: 7,
            specialOne: ["move +9", "attack +9"],
            specialTwo: ["Teleport", "attack +1", "range 5", "poison", "wound", "stun"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 46 * numPlayers,
            move: 3,
            attack: 7,
            specialOne: ["move +9", "attack +9"],
            specialTwo: ["Teleport", "attack +1", "range 5", "poison", "wound", "stun"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 50 * numPlayers,
            move: 3,
            attack: 8,
            specialOne: ["move +9", "attack +9"],
            specialTwo: ["Teleport", "attack +1", "range 5", "poison", "wound", "stun"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 56 * numPlayers,
            move: 3,
            attack: 9,
            specialOne: ["move +9", "attack +9"],
            specialTwo: ["Teleport", "attack +1", "range 5", "poison", "wound", "stun"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
    ],
    "Inox Bodyguard": [
        (numPlayers) => ({
            maxHP: 6 * numPlayers,
            move: 2,
            attack: numPlayers,
            specialOne: ["move -1", { action: "attack -1", image: inoxBodyguardSpecial1Area }],
            specialTwo: ["move +0", "attack +0", "retaliate 3"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 7 * numPlayers,
            move: 2,
            attack: 1 + numPlayers,
            specialOne: ["move -1", { action: "attack -1", image: inoxBodyguardSpecial1Area }],
            specialTwo: ["move +0", "attack +0", "retaliate 3"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 9 * numPlayers,
            move: 2,
            attack: 1 + numPlayers,
            specialOne: ["move -1", { action: "attack -1", image: inoxBodyguardSpecial1Area }],
            specialTwo: ["move +0", "attack +0", "retaliate 3"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 10 * numPlayers,
            move: 3,
            attack: 2 + numPlayers,
            specialOne: ["move -1", { action: "attack -1", image: inoxBodyguardSpecial1Area }],
            specialTwo: ["move +0", "attack +0", "retaliate 4"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 11 * numPlayers,
            move: 3,
            attack: 2 + numPlayers,
            specialOne: ["move -1", { action: "attack -1", image: inoxBodyguardSpecial1Area }],
            specialTwo: ["move +0", "attack +0", "retaliate 4"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 13 * numPlayers,
            move: 3,
            attack: 3 + numPlayers,
            specialOne: ["move -1", { action: "attack -1", image: inoxBodyguardSpecial1Area }],
            specialTwo: ["move +0", "attack +0", "retaliate 5"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 15 * numPlayers,
            move: 4,
            attack: 3 + numPlayers,
            specialOne: ["move -1", { action: "attack -1", image: inoxBodyguardSpecial1Area }],
            specialTwo: ["move +0", "attack +0", "retaliate 5"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 17 * numPlayers,
            move: 4,
            attack: 4 + numPlayers,
            specialOne: ["move -1", { action: "attack -1", image: inoxBodyguardSpecial1Area }],
            specialTwo: ["move +0", "attack +0", "retaliate 5"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
    ],
    "Jekserah": [
        (numPlayers) => ({
            maxHP: 6 * numPlayers,
            move: 2,
            attack: 2,
            specialOne: ["Summon Living Bones", "attack -1, Target all adjacent enemies"],
            specialTwo: ["Summon Living Corpse", "move -1", "attack +2"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 7 * numPlayers,
            move: 2,
            attack: 3,
            specialOne: ["Summon Living Bones", "attack -1, Target all adjacent enemies"],
            specialTwo: ["Summon Living Corpse", "move -1", "attack +2"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 9 * numPlayers,
            move: 3,
            attack: 3,
            specialOne: ["Summon Living Bones", "attack -1, Target all adjacent enemies"],
            specialTwo: ["Summon Living Corpse", "move -1", "attack +2"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            move: 4,
            attack: 4,
            specialOne: ["Summon Living Bones", "attack -1, Target all adjacent enemies"],
            specialTwo: ["Summon Living Corpse", "move -1", "attack +2"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 13 * numPlayers,
            move: 4,
            attack: 5,
            specialOne: ["Summon Living Bones", "attack -1, Target all adjacent enemies"],
            specialTwo: ["Summon Living Corpse", "move -1", "attack +2"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 15 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["Summon Living Bones", "attack -1, Target all adjacent enemies"],
            specialTwo: ["Summon Living Corpse", "move -1", "attack +2"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 18 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["Summon Living Bones", "attack -1, Target all adjacent enemies"],
            specialTwo: ["Summon Living Corpse", "move -1", "attack +2"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 22 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["Summon Living Bones", "attack -1, Target all adjacent enemies"],
            specialTwo: ["Summon Living Corpse", "move -1", "attack +2"],
            immunities: [statusEffects.WOUND, statusEffects.DISARM, statusEffects.STUN, statusEffects.CURSE],
        }),
    ],
    "Merciless Overseer": [
        (numPlayers) => ({
            maxHP: 6 * numPlayers,
            move: 2,
            attack: "V",
            specialOne: ["All Scouts act again"],
            specialTwo: ["Summon Vermling Scout"],
            immunities: [statusEffects.WOUND, statusEffects.STUN, statusEffects.CURSE],
            extra: ["V = Number of Scouts present"],
        }),
        (numPlayers) => ({
            maxHP: 8 * numPlayers,
            move: 2,
            attack: "V",
            specialOne: ["All Scouts act again"],
            specialTwo: ["Summon Vermling Scout"],
            immunities: [statusEffects.WOUND, statusEffects.STUN, statusEffects.CURSE],
            extra: ["V = Number of Scouts present"],
        }),
        (numPlayers) => ({
            maxHP: 9 * numPlayers,
            move: 3,
            attack: "V",
            specialOne: ["All Scouts act again"],
            specialTwo: ["Summon Vermling Scout"],
            immunities: [statusEffects.WOUND, statusEffects.STUN, statusEffects.CURSE],
            extra: ["V = Number of Scouts present"],
        }),
        (numPlayers) => ({
            maxHP: 11 * numPlayers,
            move: 3,
            attack: "V",
            specialOne: ["All Scouts act again"],
            specialTwo: ["Summon Vermling Scout"],
            immunities: [statusEffects.WOUND, statusEffects.STUN, statusEffects.CURSE],
            extra: ["V = Number of Scouts present"],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            move: 4,
            attack: "V",
            specialOne: ["All Scouts act again"],
            specialTwo: ["Summon Vermling Scout"],
            immunities: [statusEffects.WOUND, statusEffects.STUN, statusEffects.CURSE],
            extra: ["V = Number of Scouts present"],
        }),
        (numPlayers) => ({
            maxHP: 14 * numPlayers,
            move: 4,
            attack: "V",
            specialOne: ["All Scouts act again"],
            specialTwo: ["Summon Vermling Scout"],
            immunities: [statusEffects.WOUND, statusEffects.STUN, statusEffects.CURSE],
            extra: ["V = Number of Scouts present"],
        }),
        (numPlayers) => ({
            maxHP: 16 * numPlayers,
            move: 4,
            attack: "V",
            specialOne: ["All Scouts act again"],
            specialTwo: ["Summon Vermling Scout"],
            immunities: [statusEffects.WOUND, statusEffects.STUN, statusEffects.CURSE],
            extra: ["V = Number of Scouts present"],
        }),
        (numPlayers) => ({
            maxHP: 19 * numPlayers,
            move: 4,
            attack: "V",
            specialOne: ["All Scouts act again"],
            specialTwo: ["Summon Vermling Scout"],
            immunities: [statusEffects.WOUND, statusEffects.STUN, statusEffects.CURSE],
            extra: ["V = Number of Scouts present"],
        }),
    ],
    "Prime Demon": [
        (numPlayers) => ({
            maxHP: 8 * numPlayers,
            move: 3,
            attack: 4,
            specialOne: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            specialTwo: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 9 * numPlayers,
            move: 4,
            attack: 4,
            specialOne: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            specialTwo: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 10 * numPlayers,
            move: 4,
            attack: 5,
            specialOne: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            specialTwo: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            move: 4,
            attack: 6,
            specialOne: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            specialTwo: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 14 * numPlayers,
            move: 5,
            attack: 6,
            specialOne: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            specialTwo: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 16 * numPlayers,
            move: 5,
            attack: 7,
            specialOne: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            specialTwo: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 20 * numPlayers,
            move: 5,
            attack: 7,
            specialOne: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            specialTwo: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
        (numPlayers) => ({
            maxHP: 22 * numPlayers,
            move: 5,
            attack: 8,
            specialOne: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            specialTwo: ["Throne moves", "Summon Demon", "move +2", "attack -1"],
            immunities: [statusEffects.POISON, statusEffects.WOUND, statusEffects.IMMOBILIZE, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE],
        }),
    ],
    "The Sightless Eye": [
        (numPlayers) => ({
            maxHP: 7 * numPlayers,
            attack: 5,
            range: 3,
            specialOne: ["Summon Deep Terror", { action: "attack -3", image: sightlessEyeSpecial1Area }],
            specialTwo: ["Summon Deep Terror", { action: "attack -2", image: sightlessEyeSpecial2Area }],
            immunities: [statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 8 * numPlayers,
            attack: 6,
            range: 3,
            specialOne: ["Summon Deep Terror", { action: "attack -3", image: sightlessEyeSpecial1Area }],
            specialTwo: ["Summon Deep Terror", { action: "attack -2", image: sightlessEyeSpecial2Area }],
            immunities: [statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 10 * numPlayers,
            attack: 6,
            range: 3,
            specialOne: ["Summon Deep Terror", { action: "attack -3", image: sightlessEyeSpecial1Area }],
            specialTwo: ["Summon Deep Terror", { action: "attack -2", image: sightlessEyeSpecial2Area }],
            immunities: [statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 11 * numPlayers,
            attack: 7,
            range: 3,
            specialOne: ["Summon Deep Terror", { action: "attack -3", image: sightlessEyeSpecial1Area }],
            specialTwo: ["Summon Deep Terror", { action: "attack -2", image: sightlessEyeSpecial2Area }],
            immunities: [statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 14 * numPlayers,
            attack: 7,
            range: 3,
            specialOne: ["Summon Deep Terror", { action: "attack -3", image: sightlessEyeSpecial1Area }],
            specialTwo: ["Summon Deep Terror", { action: "attack -2", image: sightlessEyeSpecial2Area }],
            immunities: [statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 15 * numPlayers,
            attack: 8,
            range: 3,
            specialOne: ["Summon Deep Terror", { action: "attack -3", image: sightlessEyeSpecial1Area }],
            specialTwo: ["Summon Deep Terror", { action: "attack -2", image: sightlessEyeSpecial2Area }],
            immunities: [statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 18 * numPlayers,
            attack: 8,
            range: 3,
            specialOne: ["Summon Deep Terror", { action: "attack -3", image: sightlessEyeSpecial1Area }],
            specialTwo: ["Summon Deep Terror", { action: "attack -2", image: sightlessEyeSpecial2Area }],
            immunities: [statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE, statusEffects.PUSH, statusEffects.PULL],
        }),
        (numPlayers) => ({
            maxHP: 20 * numPlayers,
            attack: 9,
            range: 3,
            specialOne: ["Summon Deep Terror", { action: "attack -3", image: sightlessEyeSpecial1Area }],
            specialTwo: ["Summon Deep Terror", { action: "attack -2", image: sightlessEyeSpecial2Area }],
            immunities: [statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE, statusEffects.PUSH, statusEffects.PULL],
        }),
    ],
    "Winged Horror": [
        (numPlayers) => ({
            maxHP: 6 * numPlayers,
            move: 3,
            attack: 3,
            specialOne: ["attack -1, Target all adjacent enemies", "attack +0, range 3", "Hatch eggs"],
            specialTwo: [`Summon ${numPlayers} eggs`, "move -1", "attack +0"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 7 * numPlayers,
            move: 4,
            attack: 3,
            specialOne: ["attack -1, Target all adjacent enemies", "attack +0, range 3", "Hatch eggs"],
            specialTwo: [`Summon ${numPlayers} eggs`, "move -1", "attack +0"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 8 * numPlayers,
            move: 4,
            attack: 4,
            specialOne: ["attack -1, Target all adjacent enemies", "attack +0, range 3", "Hatch eggs"],
            specialTwo: [`Summon ${numPlayers} eggs`, "move -1", "attack +0"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 10 * numPlayers,
            move: 4,
            attack: 4,
            specialOne: ["attack -1, Target all adjacent enemies", "attack +0, range 3", "Hatch eggs"],
            specialTwo: [`Summon ${numPlayers} eggs`, "move -1", "attack +0"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 12 * numPlayers,
            move: 5,
            attack: 4,
            specialOne: ["attack -1, Target all adjacent enemies", "attack +0, range 3", "Hatch eggs"],
            specialTwo: [`Summon ${numPlayers} eggs`, "move -1", "attack +0"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 14 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["attack -1, Target all adjacent enemies", "attack +0, range 3", "Hatch eggs"],
            specialTwo: [`Summon ${numPlayers} eggs`, "move -1", "attack +0"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 17 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["attack -1, Target all adjacent enemies", "attack +0, range 3", "Hatch eggs"],
            specialTwo: [`Summon ${numPlayers} eggs`, "move -1", "attack +0"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
        (numPlayers) => ({
            maxHP: 20 * numPlayers,
            move: 5,
            attack: 5,
            specialOne: ["attack -1, Target all adjacent enemies", "attack +0, range 3", "Hatch eggs"],
            specialTwo: [`Summon ${numPlayers} eggs`, "move -1", "attack +0"],
            immunities: [statusEffects.POISON, statusEffects.DISARM, statusEffects.STUN, statusEffects.MUDDLE, statusEffects.CURSE],
        }),
    ],
}

export const BOSS_CARDS = [
    {
        initiative: 85,
        actions: ["Special 1"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 73,
        actions: ["Special 1"],
    },
    {
        initiative: 52,
        actions: ["move -1", "attack -1, range 3, target 2"],
    },
    {
        initiative: 11,
        actions: ["Special 2"],
    },
    {
        initiative: 17,
        actions: ["Special 2"],
        endAction: END_ACTIONS.SHUFFLE,
    },
    {
        initiative: 36,
        actions: ["move +0", "attack +0"],
    },
    {
        initiative: 79,
        actions: ["Special 1"],
    },
    {
        initiative: 14,
        actions: ["Special 2"],
    },
];

export const BOSS_LIST = Object.keys(BOSS_STATS);

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
import * as elements from "./elements";

const PLUS_ONE = "+1";
const PLUS_TWO = "+2";
const PLUS_THREE = "+3";
const ZERO = "+0";
const MINUS_ONE = "-1";
const MINUS_TWO = "-2";
const NULL = "null";
const TIMES_TWO = "x2";

export const NUMBER_MODIFIERS = {
    PLUS_ONE, PLUS_TWO, PLUS_THREE, ZERO, MINUS_ONE, MINUS_TWO, NULL, TIMES_TWO,
};

const RESHUFFLE = "reshuffle";
const DISCARD = "discard";
const ROLLING = "rolling";
export const END_ACTIONS = {
    RESHUFFLE, DISCARD, ROLLING,
};

export const BASE_ATTACK_MODIFIER_CARDS = [
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: ZERO, },
    { modifier: PLUS_ONE, },
    { modifier: PLUS_ONE, },
    { modifier: PLUS_ONE, },
    { modifier: PLUS_ONE, },
    { modifier: PLUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: MINUS_ONE, },
    { modifier: PLUS_TWO, },
    { modifier: MINUS_TWO, },
    { modifier: TIMES_TWO, endAction: RESHUFFLE, },
    { modifier: NULL, endAction: RESHUFFLE, },
];

export const CURSE = {
    modifier: NULL,
    endAction: DISCARD,
};

export const BLESSING = {
    modifier: TIMES_TWO,
    endAction: DISCARD,
};

export const MONSTER_DECKS = {
    "Ancient Artillery": [
        {
            initiative: 17,
            actions: ["push 2, target all adjacent enemies", "shield 2", "attack -2"],
        },
        {
            initiative: 37,
            actions: ["push 1, target all adjacent enemies", {action: "attack -1, range -1", image: aoeCircle}],
        },
        {
            initiative: 37,
            actions: ["push 1, target all adjacent enemies", {action: "attack -1, range -1", image: aoeTriangle2}],
        },
        {
            initiative: 46,
            actions: [{action: "attack -1, immobilize", image: aoeTriangle2}],
        },
        {
            initiative: 46,
            actions: ["attack -1, range +2"],
        },
        {
            initiative: 71,
            actions: ["attack +0, all adjacent enemies suffer 2 damage"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 71,
            actions: ["attack +0, all adjacent enemies suffer 2 damage"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 95,
            actions: ["attack +1"],
        },
    ],
    "Archer": [
        {
            initiative: 29,
            actions: ["move +0", "attack -1, range +1", "immobilize"],
            endAction: RESHUFFLE,
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
            endAction: RESHUFFLE,
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
    ],
    "Boss": [
        {
            initiative: 85,
            actions: ["Special 1"],
            endAction: RESHUFFLE,
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
            endAction: RESHUFFLE,
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
    ],
    "Cave Bear": [
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
            endAction: RESHUFFLE,
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
            endAction: RESHUFFLE,
        },
    ],
    "Cultist": [
        {
            initiative: 39,
            actions: ["move -1", "attack +0", "heal 1, self"],
        },
        {
            initiative: 10,
            actions: ["move -1", "attack +0", {action: "on death: attack +2", image: aoeCircleWithMiddleBlack}],
        },
        {
            initiative: 10,
            actions: ["move -1", "attack -1", {action: "on death: attack +2", image: aoeCircleWithMiddleBlack}],
        },
        {
            initiative: 31,
            actions: ["move -1", "heal 3, range 3"],
        },
        {
            initiative: 63,
            actions: ["Summon normal Living Bones", "Cultist suffers 2 damage."],
            endAction: RESHUFFLE,
        },
        {
            initiative: 63,
            actions: ["Summon normal Living Bones", "Cultist suffers 2 damage."],
            endAction: RESHUFFLE,
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
    "Deep Terror": [
        {
            initiative: 65,
            actions: ["attack +0, range 3, target 3, curse"],
        },
        {
            initiative: 60,
            actions: [{action: "attack +0, pierce 3", image: aoeLine6WithBlack}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 60,
            actions: [{action: "attack +0, pierce 3", image: aoeLine6WithBlack}],
            endAction: RESHUFFLE,
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
    "Earth Demon": [
        {
            initiative: 93,
            actions: ["move -1", "attack -1, target all adjacent enemies", {type: "element", use: elements.EARTH, action: "push 1"}],
        },
        {
            initiative: 79,
            actions: ["move +1", "attack +0", {type: "element", use: elements.AIR, action: "-2 attack"}],
        },
        {
            initiative: 40,
            actions: ["heal 3, self", {type: "element", use: elements.EARTH, action: "immobilize, target all enemies within range 3"}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 42,
            actions: ["move +1", "attack -1"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 62,
            actions: ["move +0", "attack +0", {type: "element", create: elements.EARTH}],
        },
        {
            initiative: 71,
            actions: ["attack +0, range 4", {type: "element", use: elements.EARTH, action: "target 2"}],
        },
        {
            initiative: 83,
            actions: ["move -1", "attack +1", {type: "element", create: elements.EARTH}],
        },
        {
            initiative: 87,
            actions: ["move +0", {action: "attack -1", image: aoe4WithBlack}, {type: "element", use: elements.ANY, create: elements.EARTH}],
        },
    ],
    "Flame Demon": [
        {
            initiative: 8,
            actions: ["move -1", "create a 4 damage trap in an adjacent empty hex closest to an enemy.", {type: "element", use: elements.ANY, create: elements.FIRE}],
        },
        {
            initiative: 67,
            actions: ["move -1", "attack +1, range -1", {type: "element", create: elements.FIRE}],
        },
        {
            initiative: 3,
            actions: ["move +1", "attack -1", {type: "element", create: elements.FIRE}],
        },
        {
            initiative: 77,
            actions: ["attack +0, target all adjacent enemies", {type: "element", use: elements.ICE, action: "Flame Demon suffers 1 damage"}],
        },
        {
            initiative: 24,
            actions: ["move +0", "attack +0", {type: "element", create: elements.FIRE}],
        },
        {
            initiative: 30,
            actions: [{type: "element", use: elements.FIRE, action: "all adjacent enemies suffer 2 damage."}, "move +0", "attack -2, wound, target 2"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 46,
            actions: ["attack +0", {type: "element", use: elements.FIRE, image: aoeCircle}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 49,
            actions: [{action: "attack +0", image: aoeLine3WithBlack}, {type: "element", use: elements.FIRE, action: "attack +1, wound"}],
        },
    ],
    "Frost Demon": [
        {
            initiative: 18,
            actions: ["immobilize, target all enemies within range 2", {type: "element", use: elements.ICE, action: "heal 3, self"}],
        },
        {
            initiative: 18,
            actions: ["shield 2", "move +1", {type: "element", use: elements.FIRE, action: "Frost Demon suffers 1 damage"}],
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
            actions: ["move -1", "attack +0, range 2", {type: "element", use: elements.ICE, action: "+2 attack, +1 range"}],
        },
        {
            initiative: 58,
            actions: ["move -1", "attack -1, pierce 3", {type: "element", use: elements.ANY, create: elements.ICE}],
        },
        {
            initiative: 78,
            actions: ["move -1", {action: "attack +0", image: aoeTriangle2WithBlack}, {type: "element", create: elements.ICE}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 78,
            actions: ["move -1", {action: "attack +0", image: aoeTriangle2WithBlack}, {type: "element", create: elements.ICE}],
            endAction: RESHUFFLE,
        },
    ],
    "Giant Viper": [
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
            endAction: RESHUFFLE,
        },
        {
            initiative: 32,
            actions: ["move +0", "attack +0", "Add +2 attack if the target is adjacent to any of the Giant Viper's allies."],
            endAction: RESHUFFLE,
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
    "Guard": [
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
            endAction: RESHUFFLE,
        },
        {
            initiative: 15,
            actions: ["shield 1", "attack +0, poison"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 55,
            actions: ["move -1", "attack +0", "strengthen, self"],
        },
        {
            initiative: 50,
            actions: ["move +0", "attack +0"],
        },
    ],
    "Harrower Infester": [
        {
            initiative: 2,
            actions: ["shield 2", "retaliate 2, range 3"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 7,
            actions: ["move +0", "attack -1, poison", {type: "element", create: elements.DARK}],
        },
        {
            initiative: 7,
            actions: ["attack -1, range 3, muddle", "heal 3, self"],
            endAction: RESHUFFLE,
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
            actions: ["move -1", {action: "attack +0", image: aoeLine4WithBlack}, {type: "element", use: elements.DARK, action: 'perform "heal 2 self" for each target damaged'}],
        },
        {
            initiative: 38,
            actions: ["move -1", "attack +1, target 2"],
        },
        {
            initiative: 38,
            actions: ["move +0", "attack -1, target 2", {type: "element", use: elements.DARK, action: "+2 attack, disarm"}],
        },
    ],
    "Hound": [
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
            endAction: RESHUFFLE,
        },
        {
            initiative: 19,
            actions: ["move +0", "attack +0", "add +2 attack if the target is adjacent to any of the Hound's allies."],
            endAction: RESHUFFLE,
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
    "Imp": [
        {
            initiative: 24,
            actions: ["strengthen, affect all allies within range 2", "muddle, target all enemies within range 2"],
        },
        {
            initiative: 43,
            actions: ["move +0", "attack -1, target 2, curse"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 76,
            actions: ["move -1", "attack +1"],
        },
        {
            initiative: 43,
            actions: ["move +0", "attack -1, target 2, poison"],
            endAction: RESHUFFLE,
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
    ],
    "Living Bones": [
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
            endAction: RESHUFFLE,
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
            endAction: RESHUFFLE,
        },
    ],
    "Living Corpse": [
        {
            initiative: 66,
            actions: ["move +0", "attack +0"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 66,
            actions: ["move +0", "attack +0"],
            endAction: RESHUFFLE,
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
            endAction: RESHUFFLE,
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
    "Living Spirit": [
        {
            initiative: 22,
            actions: ["move -1", "attack -1, muddle"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 33,
            actions: ["move +0", "attack -1, target all enemies in range"],
            endAction: RESHUFFLE,
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
            actions: ["move +0", "curse, target all enemies in range", {type: "element", create: elements.ICE}],
        },
        {
            initiative: 61,
            actions: ["attack +0, range -1, target 2"],
        },
        {
            initiative: 67,
            actions: ["move -1", "attack +1", {type: "element", use: elements.ICE, action: "stun"}],
        },
        {
            initiative: 75,
            actions: ["move -1", "attack +1, range -1", "heal 1, self"],
        },
    ],
    "Lurker": [
        {
            initiative: 11,
            actions: ["shield 1", {type: "element", use: elements.ICE, action: "shield 2 instead"}, "wound, target all adjacent enemies"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 23,
            actions: ["shield 1", "move +0", "attack -1", {type: "element", create: elements.ICE}],
            endAction: RESHUFFLE,
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
            actions: [{type: "element", use: elements.ICE, action: "strengthen, self"}, "move +0", "attack -1, wound"],
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
    "Night Demon": [
        {
            initiative: 35,
            actions: ["attack -1", "attack -1, pierce 2", {type: "element", use: elements.LIGHT, action: "curse, self"}],
        },
        {
            initiative: 15,
            actions: ["move +0", "attack -1", "All adjacent enemies and allies suffer 1 damage", {type: "element", use: elements.ANY, create: elements.DARK}],
        },
        {
            initiative: 41,
            actions: ["move -1", "attack +1", {type: "element", create: elements.DARK}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 46,
            actions: ["move -1", "attack +1", {type: "element", use: elements.DARK, action: "+2 attack"}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 7,
            actions: ["move +1", "attack -1", {type: "element", use: elements.DARK, action: "invisible, self"}],
        },
        {
            initiative: 26,
            actions: ["attack -2, range 3, target 3", {type: "element", use: elements.DARK, action: "muddle"}],
        },
        {
            initiative: 4,
            actions: ["move +1", "attack -1", {type: "element", create: elements.DARK}],
        },
        {
            initiative: 22,
            actions: ["move +0", "attack +0", {type: "element", create: elements.DARK}],
        },
    ],
    "Ooze": [
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
            endAction: RESHUFFLE,
        },
        {
            initiative: 94,
            actions: ["Ooze suffers 2 damage", "summon normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)"],
            endAction: RESHUFFLE,
        },
    ],
    "Rending Drake": [
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
            endAction: RESHUFFLE,
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
            endAction: RESHUFFLE,
        },
    ],
    "Savvas Lavaflow": [
        {
            initiative: 22,
            actions: ["move +1", "attack -1, target all adjacent enemies", {type: "element", use: elements.FIRE, action: "retaliate 3"}],
        },
        {
            initiative: 31,
            actions: ["heal 4, range 3", {type: "element", use: elements.EARTH, action: "target 3"}],
        },
        {
            initiative: 41,
            actions: ["move +0", {action: "attack -1", image: aoeLine4WithBlack}, {type: "element", use: elements.EARTH, action: "+2 attack, immobilize"}],
        },
        {
            initiative: 51,
            actions: ["all enemies suffer 2 damage", {type: "element", use: elements.FIRE, action: "wound all enemies"}, {type: "element", use: elements.EARTH, action: "disarm all enemies"}],
        },
        {
            initiative: 68,
            actions: ["move -1", "attack +1, range 3, all allies and enemies adjacent to the target suffer 2 damage.", {type: "element", create: elements.EARTH}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 68,
            actions: ["move -1", "attack -1, range 3, target 2", {type: "element", create: elements.FIRE}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 97,
            actions: ["summon normal Flame Demon", {type: "element", create: elements.FIRE}],
        },
        {
            initiative: 97,
            actions: ["summon normal Earth Demon", {type: "element", create: elements.EARTH}],
        },
    ],
    "Savvas Icestorm": [
        {
            initiative: 14,
            actions: ["attack +0", {type: "element", use: elements.ICE, action: "+2 attack, immobiilize"}, "retaliate 2", {type: "element", create: elements.AIR}],
        },
        {
            initiative: 14,
            actions: ["shield 4", "heal 2, range 3", {type: "element", use: elements.ICE, action: "+3 heal"}, {type: "element", use: elements.AIR, action: "attack +0"}],
        },
        {
            initiative: 19,
            actions: ["move +0", "attack -1, range -1", "shield 1, affect self and all allies within range 2", {type: "element", create: elements.ICE}],
        },
        {
            initiative: 35,
            actions: ["move -1", {action: "attack -1", image: aoeTriangle3WithCornerBlack}, {type: "element", create: elements.ICE}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 47,
            actions: ["disarm, target all adjacent enemies", "move +0", "attack -1", {type: "element", create: elements.AIR}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 70,
            actions: ["push 2, target all adjacent enemies", {type: "element", use: elements.AIR, action: "push 4 instead"}, "attack +1, range +1"],
        },
        {
            initiative: 98,
            actions: ["summon normal Wind Demon", {type: "element", create: elements.AIR}],
        },
        {
            initiative: 98,
            actions: ["summon normal Frost Demon", {type: "element", create: elements.ICE}],
        },
    ],
    "Scout": [
        {
            initiative: 29,
            actions: ["move -1", "attack -1, range 3"],
        },
        {
            initiative: 35,
            actions: ["move +1, jump", "loot 1"],
            endAction: RESHUFFLE,
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
            endAction: RESHUFFLE,
        },
    ],
    "Shaman": [
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
            endAction: RESHUFFLE,
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
            endAction: RESHUFFLE,
        },
        {
            initiative: 8,
            actions: ["move -1", "attack +0", "immobilize"],
        },
        {
            initiative: 74,
            actions: ["move -1", "attack +1"],
        },
    ],
    "Spitting Drake": [
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
            actions: ["move +0", {action: "attack -1, range -1", image: aoeTriangle2}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 89,
            actions: ["move -1", {action: "attack -2, range -2, poison", image: aoeCircle}],
            endAction: RESHUFFLE,
        },
    ],
    "Stone Golem": [
        {
            initiative: 51,
            actions: ["move +1", "attack -1"],
            endAction: RESHUFFLE,
        },
        {
            initiative: 65,
            actions: ["move +0", "attack +0"],
        },
        {
            initiative: 90,
            actions: ["move -1", "attack +1"],
            endAction: RESHUFFLE,
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
    "Sun Demon": [
        {
            initiative: 95,
            actions: ["move -1", "attack +0, range 4", {type: "element", use: elements.LIGHT, action: "target all enemies within range"}],
        },
        {
            initiative: 88,
            actions: ["move -1", "attack -1, target all adjacent enemies", {type: "element", use: elements.DARK, action: "muddle, self"}],
        },
        {
            initiative: 17,
            actions: ["heal 3, range 3", {type: "element", use: elements.LIGHT, action: "target all allies within range"}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 73,
            actions: ["move +0", "attack +1", {type: "element", use: elements.LIGHT, action: "heal 3, self"}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 68,
            actions: ["move +0", "attack +1", {type: "element", create: elements.LIGHT}],
        },
        {
            initiative: 36,
            actions: ["move +0", "attack +0, target all adjacent enemies", {type: "element", create: elements.LIGHT}],
        },
        {
            initiative: 36,
            actions: ["move +0", "attack +0, target all adjacent enemies", {type: "element", create: elements.LIGHT}],
        },
        {
            initiative: 50,
            actions: ["move +0", "attack +0, range 3", {type: "element", use: elements.ANY, create: elements.LIGHT}],
        },
    ],
    "Wind Demon": [
        {
            initiative: 37,
            actions: ["move +0", {action: "attack +0", image: aoe4WithBlack}, {type: "element", use: elements.AIR, action: "+1 attack", image: aoeCircleWithSideBlack}],
        },
        {
            initiative: 9,
            actions: ["attack -1", "heal 1, self", {type: "element", use: elements.AIR, action: "invisible, self"}],
        },
        {
            initiative: 21,
            actions: ["move +0", "attack +0, pull 1", {type: "element", create: elements.AIR}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 21,
            actions: ["move +0", "attack +0, pull 1", {type: "element", create: elements.AIR}],
            endAction: RESHUFFLE,
        },
        {
            initiative: 29,
            actions: ["move +0", "attack -1, target 2", {type: "element", use: elements.AIR, action: "push 2"}],
        },
        {
            initiative: 43,
            actions: ["move -1", "attack +1", {type: "element", use: elements.AIR, action: "target 2"}],
        },
        {
            initiative: 43,
            actions: ["push 1, target all adjacent enemies", "attack +0", {type: "element", use: elements.EARTH, action: "-2 range"}],
        },
        {
            initiative: 2,
            actions: ["shield 1", "move -1", "attack +1", {type: "element", use: elements.ANY, create: elements.AIR}],
        },
    ],
};
export const MONSTER_LIST = Object.keys(MONSTER_DECKS);
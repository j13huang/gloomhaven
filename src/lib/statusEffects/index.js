import curseIcon from "./curse.svg";
import blessIcon from "./bless.svg";
import disarmIcon from "./disarm.svg";
import immobilizeIcon from "./immobilize.svg";
import invisibleIcon from "./invisible.svg";
import muddleIcon from "./muddle.svg";
import poisonIcon from "./poison.svg";
import strengthenIcon from "./strengthen.svg";
import stunIcon from "./stun.svg";
import woundIcon from "./wound.svg";

import pushIcon from "./push.svg";
import pullIcon from "./pull.svg";

export const BLESS = "bless";
export const CURSE = "curse";
export const DISARM = "disarm";
export const IMMOBILIZE = "immobilize";
export const INVISIBLE = "invisible";
export const MUDDLE = "muddle";
export const POISON = "poison";
export const STRENGTHEN = "strengthen";
export const STUN = "stun";
export const WOUND = "wound";

export const PUSH = "push";
export const PULL = "pull";

const statusEffectIcons = {
    [POISON]: poisonIcon,
    [WOUND]: woundIcon,
    [IMMOBILIZE]: immobilizeIcon,
    [DISARM]: disarmIcon,
    [STUN]: stunIcon,
    [MUDDLE]: muddleIcon,
    [INVISIBLE]: invisibleIcon,
    [STRENGTHEN]: strengthenIcon,
};

export const STATUS_EFFECTS = Object.keys(statusEffectIcons);
export function newStatusEffectTracker() {
    return STATUS_EFFECTS.reduce((acc, s) => {
        acc[s] = false;
        return acc;
    }, {});
}

const allStatusEffectIcons = {
    ...statusEffectIcons,
    [PUSH]: pushIcon,
    [PULL]: pullIcon,
    [CURSE]: curseIcon,
    [BLESS]: blessIcon,
};
export const ALL_STATUS_EFFECTS = Object.keys(allStatusEffectIcons);

export function iconForStatusEffect(name) {
    return allStatusEffectIcons[name];
}

export function push(value) {
    return {type: PUSH, value};
}

export function pull(value) {
    return {type: PULL, value};
}

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

export const BLESS = "BLESS";
export const CURSE = "CURSE";
export const DISARM = "DISARM";
export const IMMOBILIZE = "IMMOBILIZE";
export const INVISIBLE = "INVISIBLE";
export const MUDDLE = "MUDDLE";
export const POISON = "POISON";
export const STRENGTHEN = "STRENGTHEN";
export const STUN = "STUN";
export const WOUND = "WOUND";

export const PUSH = "PUSH";
export const PULL = "PULL";

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

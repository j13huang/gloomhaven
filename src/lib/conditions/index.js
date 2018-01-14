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

const conditionIcons = {
    [POISON]: poisonIcon,
    [WOUND]: woundIcon,
    [IMMOBILIZE]: immobilizeIcon,
    [DISARM]: disarmIcon,
    [STUN]: stunIcon,
    [MUDDLE]: muddleIcon,
    [INVISIBLE]: invisibleIcon,
    [STRENGTHEN]: strengthenIcon,
};

export const CONDITIONS = Object.keys(conditionIcons);

export function iconForCondition(name) {
    return {
        ...conditionIcons,
        [CURSE]: curseIcon,
        [BLESS]: blessIcon,
    }[name];
}

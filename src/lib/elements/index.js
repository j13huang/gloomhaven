import anyElementIcon from "./any_element.svg";
import airIcon from "./air.svg";
import darkIcon from "./dark.svg";
import earthIcon from "./earth.svg";
import fireIcon from "./fire.svg";
import iceIcon from "./ice.svg";
import lightIcon from "./light.svg";

export const ANY = "any";
export const AIR = "air";
export const DARK = "dark";
export const EARTH = "earth";
export const FIRE = "fire";
export const ICE = "ice";
export const LIGHT = "light";

export function iconForElement(name) {
    return {
        [ANY]: anyElementIcon,
        [AIR]: airIcon,
        [DARK]: darkIcon,
        [EARTH]: earthIcon,
        [FIRE]: fireIcon,
        [ICE]: iceIcon,
        [LIGHT]: lightIcon,
    }[name];
}
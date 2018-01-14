import anyElementIcon from "./any_element.svg";
import airIcon from "./air.svg";
import darkIcon from "./dark.svg";
import earthIcon from "./earth.svg";
import fireIcon from "./fire.svg";
import iceIcon from "./ice.svg";
import lightIcon from "./light.svg";

export {default as useElementIcon} from "./use_element.svg";

export const ANY = "any";
export const AIR = "air";
export const DARK = "dark";
export const EARTH = "earth";
export const FIRE = "fire";
export const ICE = "ice";
export const LIGHT = "light";

const elementIcons = {
    [FIRE]: fireIcon,
    [ICE]: iceIcon,
    [AIR]: airIcon,
    [EARTH]: earthIcon,
    [LIGHT]: lightIcon,
    [DARK]: darkIcon,
};

export const ELEMENTS_LIST = Object.keys(elementIcons);

export function iconForElement(name) {
    return {
        ...elementIcons,
        [ANY]: anyElementIcon,
    }[name];
}
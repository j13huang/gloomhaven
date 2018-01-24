import React from "react";

import {SHIELD, RETALIATE, iconForBonus} from "../../lib/bonuses";
import "./BonusSelectors.css";

export class BonusSelectors extends React.Component {
    render() {
        return (<div className="BonusSelectors--Container">
            <div className="BonusSelectors--Selector">
                <img className="BonusSelectors--Icon" src={iconForBonus(SHIELD)} alt="shield" />
                <select>
                    {new Array(10).fill().map((_, i) => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>
            <div className="BonusSelectors--Selector">
                <img className="BonusSelectors--Icon" src={iconForBonus(RETALIATE)} alt="retaliate" />
                <select>
                    {new Array(10).fill().map((_, i) => <option key={i} value={i}>{i}</option>)}
                </select>
            </div>
        </div>);
    }
}

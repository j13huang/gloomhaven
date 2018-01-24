import React from "react";
import * as classNames from "classnames";

import "./HPTracker.css";

export function HPTracker({className, currentHP, maxHP, onHPClick}) {
    return (<div className={classNames(className, "HPTracker--Container")}>
        <div>HP:</div>
        {(maxHP > 0) &&
            <div className="HPTracker--Bars">
                {new Array(maxHP).fill().map((_, i) => {
                    const hp = i + 1;
                    return (<div key={hp}
                        className={classNames({"HPTracker--HP": true, "HPTracker--HP--Active": hp <= currentHP})}
                        onClick={() => onHPClick(hp)}
                    >
                        {hp}
                    </div>);
                })}
            </div>}
    </div>);
}

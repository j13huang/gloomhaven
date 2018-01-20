import React from "react";
import * as classNames from "classnames";

import {Actions} from "../Actions/Actions";
import {MOVE, ATTACK, RANGE, iconForStat} from "../../../lib/stats";

import "./MonsterStats.css"

export function MonsterStats({stats, elite}) {
    return (<div className={classNames({"MonsterTracker--Stats": true, "MonsterTracker--Stats--Elite": elite})}>
        <div className="MonsterTracker--Stats--Main">
            <div className="MonsterTracker--Stats--MainLine">
                {stats.move || "–"}
                <img src={iconForStat(MOVE)} className="MonsterTracker--StatIcon" alt="movement" />
            </div>
            <div className="MonsterTracker--Stats--MainLine">
                {stats.attack || "–"}
                <img src={iconForStat(ATTACK)} className="MonsterTracker--StatIcon" alt="attack" />
            </div>
            <div className="MonsterTracker--Stats--MainLine">
                {stats.range || "–"}
                <img src={iconForStat(RANGE)} className="MonsterTracker--StatIcon" alt="range" />
            </div>
        </div>
        <div className="MonsterTracker--Stats--Extra">
            {stats.specialOne && <div><strong>Special 1: </strong><Actions actions={stats.specialOne} /></div>}
            {stats.specialTwo && <div><strong>Special 2: </strong><Actions actions={stats.specialTwo} /></div>}
            {stats.extra && stats.extra.map((e, i) => <div key={i} className="MonsterTracker--Stats--SpecialLine">{e}</div>)}
        </div>
    </div>);
}
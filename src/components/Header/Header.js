import React from "react";

import {ElementTracker} from "../ElementTracker/ElementTracker"
import {TurnTracker} from "./TurnTracker"

import "./Header.css";

export function Header() {
    return (<div>
        <div className="Game--Header">
            <div className="Game--Header--Content">
                <ElementTracker />
                <TurnTracker />
                <button className="Game--Header--EndTurn" disabled>End Turn</button>
            </div>
        </div>
        <div className="Game--Header--HeightOffset"></div>
    </div>);
}
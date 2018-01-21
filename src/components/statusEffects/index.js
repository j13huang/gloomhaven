import React from 'react';

import {STATUS_EFFECTS, iconForStatusEffect} from "../../lib/statusEffects";

export class StatusEffects extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="Monsters--ToggleAllStatusEffects">
            {STATUS_EFFECTS.map((s) => <img src={iconForStatusEffect(s)} />)}
        </div>);
    }
}

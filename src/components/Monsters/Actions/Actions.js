import React from "react";
import * as classNames from 'classnames';

import {getIcon} from "../../../lib/icons";
import * as elements from "../../../lib/elements";
import {TEXT} from "../../../lib/actions";

import "./Actions.css";

function CustomAction({action, subAction}) {
    return (<div className="CustomAction--Container">
        {action.type} {action.modifier && !action.modifier.match(/^(\+|-)/) && action.modifier}
        <img className={classNames({"CustomAction--Icon": true, "CustomAction--SubAction--Icon": subAction})} src={getIcon(action.type)} alt={action.type} />
        {action.modifier && action.modifier.match(/^(\+|-)/) && action.modifier}
    </div>);
}

function Action({action, subAction}) {
    return (<div className={classNames({"Card--Action": true, "Card--SubAction": subAction})}>
        {typeof(action) === "string" && action}
        {action.type === TEXT && action.modifier}
        {action.type && action.type !== TEXT && <CustomAction action={action} subAction={subAction} />}
        {action.image && <img className="Card--Image" src={action.image} alt="extra info for card"/>}
    </div>);
}

export function Actions({className, actions}) {
    //console.log(actions);
    return (<div className={className}>
        {actions.map((a, i) => {
            if (a.type === "element") {
                // use element
                return (
                    <div className="Card--ElementUsage" key={i}>
                        {a.use && <div className={classNames("Card--Element", "Card--Element--Used")}>
                            <img className={classNames("Card--Element", "Card--Element--Icon", "Card--Element--UsedElement")} src={elements.iconForElement(a.use)} alt="use element"/>
                            <img className={classNames("Card--Element", "Card--Element--Icon", "Card--Element--UsedOverlay")} src={elements.useElementIcon} alt="use element"/>
                        </div>}
                        {a.use && <div className="Card--Element--Separator">:</div>}
                        {a.action && <div>
                            <Action action={a.action} />
                            {a.action.subActions && a.action.subActions.map((sa, j) => <Action key={j} action={sa} subAction />)}
                        </div>}
                        {a.image && <img className="Card--Image" src={a.image} alt="extra info for card"/>}
                        {a.create && <div className={"Card--Element"}>
                            <img className={classNames("Card--Element", "Card--Element--Icon")} src={elements.iconForElement(a.create)} alt="use element"/>
                        </div>}
                    </div>
                );
            }
            return (<div className="Action--Section" key={i}>
                <Action action={a} />
                {a.subActions && a.subActions.map((sa, j) => <Action key={j} action={sa} subAction />)}
            </div>);
        })}
    </div>);
}
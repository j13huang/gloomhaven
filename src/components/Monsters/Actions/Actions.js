import React from "react";
import * as classNames from 'classnames';

import {getIcon} from "../../../lib/icons";
import * as elements from "../../../lib/elements";
import {COMPOUND_TEXT} from "../../../lib/actions";

import "./Actions.css";

function ActionModifier({action, isSubAction, isBoss, stats}) {
    let statModifier = null;
    if (!isBoss && stats && action.modifier && action.modifier.match(/^(\+|-)\d+/)) {
        statModifier = parseInt(action.modifier, 10);
    }

    return (<React.Fragment>
        {action.type}
        <img className={classNames({"ActionModifier--Icon": true, "ActionModifier--SubAction--Icon": isSubAction})} src={getIcon(action.type)} alt={action.type} />
        {statModifier != null ?
            <React.Fragment>
                {stats.normal[action.type.toLowerCase()] + statModifier}
                {" / "}
                <span className="ActionModifier--stats--elite">
                    {stats.elite[action.type.toLowerCase()] + statModifier}
                </span>
            </React.Fragment> :
            action.modifier
        }
    </React.Fragment>);
}

function Action({className, action, isSubAction, isBoss, stats}) {
    return (<div className={classNames({"Card--Action": true, "Card--SubAction": isSubAction, [className]: className})}>
        {typeof(action) === "string" && action}
        {action.type === COMPOUND_TEXT && <div>
            {action.modifier.map((t, i) => {
                let content = t;
                if (t.type) {
                    content = <Action key={i} className="Card--Action--inline" action={t} isSubAction={isSubAction} isBoss={isBoss} stats={stats} />;
                }

                return <React.Fragment key={i}>{content}</React.Fragment>;
            })}
        </div>}
        {action.type && action.type !== COMPOUND_TEXT &&
            <ActionModifier action={action} isSubAction={isSubAction} isBoss={isBoss} stats={stats} />
        }
        {action.image && <img className="Card--Image" src={action.image} alt="extra info for card"/>}
    </div>);
}

export function Actions({className, actions, isBoss, stats}) {
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
                            <Action action={a.action} isBoss={isBoss} stats={stats} />
                            {a.action.subActions && a.action.subActions.map((sa, j) => <Action key={j} action={sa} isSubAction />)}
                        </div>}
                        {a.image && <img className="Card--Image" src={a.image} alt="extra info for card"/>}
                        {a.create && <div className={"Card--Element"}>
                            <img className={classNames("Card--Element", "Card--Element--Icon")} src={elements.iconForElement(a.create)} alt="use element"/>
                        </div>}
                    </div>
                );
            }
            return (<div className="Action--Section" key={i}>
                <Action action={a} isBoss={isBoss} stats={stats} />
                {a.subActions && a.subActions.map((sa, j) => <Action key={j} action={sa} isSubAction isBoss={isBoss} stats={stats} />)}
            </div>);
        })}
    </div>);
}
import React from "react";
import * as classNames from "classnames";

import {ELEMENTS_LIST, iconForElement} from "../../lib/elements";

import "./ElementTracker.css";

const INERT = "inert";
const WANING = "waning";
const STRONG = "strong";

const borderClassNameForStatus = {
    [INERT]: "ElementTracker--Element--BorderInert",
    [WANING]: "ElementTracker--Element--BorderWaning",
    [STRONG]: "ElementTracker--Element--BorderStrong",
};

const classNameForStatus = {
    [INERT]: "ElementTracker--Element--Inert",
    [WANING]: "ElementTracker--Element--Waning",
    [STRONG]: "ElementTracker--Element--Strong",
};

/*
function Elements({className, elements, status, onClick}) {
    return (<div className="ElementTracker--Column">
        {status}
        {ELEMENTS_LIST.map((e, i) => {
            const activeClass = (elements[e] === status) && "ElementTracker--Element--Active";
            return (<img key={i}
                className={classNames("ElementTracker--Element", activeClass)}
                src={iconForElement(e)}
                onClick={() => onClick(e, status)}
                alt={e}
            />)
        })}
    </div>);
}
*/

export class ElementTracker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            elements: ELEMENTS_LIST.reduce((acc, e) => {acc[e] = INERT; return acc;}, {})
        };
    }

    setElementStatus(element, status) {
        this.setState({
            elements: {
                ...this.state.elements,
                [element]: status,
            },
        });
    }

    render() {
        return (<div className="ElementTracker">
            {ELEMENTS_LIST.map((e, i) => {
                const status = this.state.elements[e];
                return (<div key={i} className="ElementTracker--Column">
                    {/*e*/}
                    {[INERT, WANING, STRONG].map((s) =>
                        <div key={s} className={classNames({
                            "ElementTracker--Element": true,
                            "ElementTracker--ElementContainer": true,
                            "ElementTracker--Element--Border": true,
                            //"ElementTracker--Element--BorderActive": status === s,
                            //"ElementTracker--Element--BorderActive": true,
                            [borderClassNameForStatus[s]]: true,
                        })}>
                            <img
                                className={classNames({
                                    "ElementTracker--Element": true,
                                    "ElementTracker--Element--Inactive": true,
                                    [classNameForStatus[s]]: (status === s),
                                })}
                                src={iconForElement(e)}
                                onClick={() => this.setElementStatus(e, s)}
                                alt={`${e} - ${status}`}
                            />
                        </div>
                    )}
                </div>);
            })}
            {/*}
            <div className="ElementTracker--Column">
                <div>Elements:</div>
                {ELEMENTS_LIST.map((e, i) => {
                    const status = this.state.elements[e];
                    let className;
                    let nextStatus = "";
                    switch (status) {
                        case INERT:
                            className = "ElementTracker--Element--Inert";
                            nextStatus = STRONG;
                            break;
                        case WANING:
                            className = "ElementTracker--Element--Waning";
                            nextStatus = INERT;
                            break;
                        case STRONG:
                            className = "ElementTracker--Element--Strong";
                            nextStatus = WANING;
                            break;
                        default: return null;
                    }
                    return (<div key={i}
                        className={classNames({
                            "ElementTracker--Element": true,
                            "ElementTracker--ElementContainer": true,
                            "ElementTracker--Element--Border": status === INERT
                        })}>
                        <img
                            className={classNames("ElementTracker--Element", className)}
                            src={iconForElement(e)}
                            onClick={() => this.setElementStatus(e, nextStatus)}
                            alt={`${e} - ${status}`}
                        />
                    </div>)
                })}
            </div>
            */}
            {/*}
            <Elements
                className="ElementTracker--Column"
                elements={this.state.elements}
                status={INERT}
                onClick={(e, status) => this.setElementStatus(e, status)}
            />
            <Elements
                className="ElementTracker--Column"
                elements={this.state.elements}
                status={WANING}
                onClick={(e, status) => this.setElementStatus(e, status)}
            />
            <Elements
                className="ElementTracker--Column"
                elements={this.state.elements}
                status={STRONG}
                onClick={(e, status) => this.setElementStatus(e, status)}
            />
            */}
        </div>);
    }
}
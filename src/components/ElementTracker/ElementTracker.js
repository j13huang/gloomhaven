import React from "react";
import {connect} from "react-redux";
import * as classNames from "classnames";

import {ELEMENTS_LIST, INERT, WANING, STRONG, iconForElement} from "../../lib/elements";
import {setStatusAction} from "../../store/elements";

import "./ElementTracker.css";

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

function ElementTrackerComponent({className, elements, setElementStatus}) {
    return (<div className={classNames(className, "ElementTracker")}>
        {ELEMENTS_LIST.map((e) => {
            const status = elements[e];
            return (<div key={e} className="ElementTracker--Column">
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
                            onClick={() => setElementStatus(e, s)}
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
                const status = elements[e];
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
                        onClick={() => setElementStatus(e, nextStatus)}
                        alt={`${e} - ${status}`}
                    />
                </div>)
            })}
        </div>
        */}
        {/*}
        <Elements
            className="ElementTracker--Column"
            elements={elements}
            status={INERT}
            onClick={(e, status) => setElementStatus(e, status)}
        />
        <Elements
            className="ElementTracker--Column"
            elements={elements}
            status={WANING}
            onClick={(e, status) => setElementStatus(e, status)}
        />
        <Elements
            className="ElementTracker--Column"
            elements={elements}
            status={STRONG}
            onClick={(e, status) => setElementStatus(e, status)}
        />
        */}
    </div>);
}

export const ElementTracker = connect(
    (state, ownProps) => ({
        elements: state.elements,
    }),
    (dispatch) => ({
        setElementStatus: (element, status) => dispatch(setStatusAction(element, status)),
    }),
)(ElementTrackerComponent);

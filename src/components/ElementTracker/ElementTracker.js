import React from "react";
import * as classNames from "classnames";

import {ELEMENTS_LIST, iconForElement} from "../../lib/elements";

import "./ElementTracker.css";

const INERT = "inert";
const WANING = "waning";
const STRONG = "strong";

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

export class ElementTracker extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            elements: ELEMENTS_LIST.reduce((acc, e) => {acc[e] = INERT; return acc;}, {})
        };
    }

    setElementStatus(element, status) {
        console.log(this.state.elements)
        this.setState({
            elements: {
                ...this.state.elements,
                [element]: status,
            },
        });
    }

    render() {
        return (<div className="ElementTracker">
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
        </div>);
    }
}
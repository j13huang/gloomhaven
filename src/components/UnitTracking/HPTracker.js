import React from "react";
import * as classNames from "classnames";
import * as _ from "lodash";

import "./HPTracker.css";

export class HPTracker extends React.Component {
    constructor(props) {
        super(props)

        this.onHPClick = _.debounce(props.onHPClick, 500);
        this.state = {
            hp: props.maxHP,
        }
    }

    changeHP(hp) {
        // if clicking... this.setState({hp: hp <= this.state.hp ? hp - 1 : hp});
        this.setState({hp});
        this.onHPClick(hp);
    }

    render() {
        const {className, maxHP} = this.props;
        return (<div className={classNames("HPTracker--Container", className)}>
            {(maxHP > 0) &&
                <div className="HPTracker--Bars">
                    {new Array(maxHP).fill().map((_, i) => {
                        const hp = i + 1;
                        return (<div key={hp}
                            className={classNames({"HPTracker--HP": true, "HPTracker--HP--Active": hp <= this.state.hp})}
                            onMouseDown={() => this.changeHP(hp)}
                            onMouseOver={(event) =>{
                                // left click
                                // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
                                if (event.buttons % 2 === 1) {
                                    this.changeHP(hp)
                                }
                            }}
                        >
                            {hp}
                        </div>);
                    })}
                </div>}
        </div>);
    }
}

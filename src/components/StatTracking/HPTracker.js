import React from "react";
import * as classNames from "classnames";

import "./HPTracker.css";

export class HPTracker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hp: props.maxHP,
        };
    }

    setHP(hp) {
        //this.setState({hp: hp <= this.state.hp ? hp - 1 : hp});
        this.setState({hp});
    }

    render() {
        return (<div className="HPTracker--Container">
            <div>HP:</div>
            {(this.props.maxHP > 0) &&
                <div className="HPTracker--Bars">
                    {new Array(this.props.maxHP).fill().map((_, i) => {
                        const hp = i + 1;
                        return (<div key={hp}
                            className={classNames({"HPTracker--HP": true, "HPTracker--HP--Active": hp <= this.state.hp})}
                            onClick={() => this.setHP(hp)}
                        >
                            {hp}
                        </div>);
                    })}
                </div>}
        </div>);
    }
}

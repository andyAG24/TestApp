import React, { Component } from 'react';
import Scorocode from 'scorocode';
import './button.css';

Scorocode.Init({
    ApplicationID: "3196b2e873234547ad8b06ed636d3538",
    JavaScriptKey: "5e85f685a23e44e6abad95accc1dd2ea",
    MasterKey: "659d718ff9664f6fafbdb79efc93cb34"
});



class Button extends React.Component {
    

    render () {
        return (
            <div className="get-info" onClick={this.props.gettingBuildings}>
                Запустить приложение!
            </div>
        )
    }
}

export default Button;
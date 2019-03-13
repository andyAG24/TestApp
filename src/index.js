import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Scorocode from '../node_modules/scorocode';

Scorocode.Init({
    ApplicationID: "3196b2e873234547ad8b06ed636d3538",
    JavaScriptKey: "5e85f685a23e44e6abad95accc1dd2ea",
    MasterKey: "659d718ff9664f6fafbdb79efc93cb34"
});

ReactDOM.render(
    <App />, document.getElementById('root'));
serviceWorker.unregister();

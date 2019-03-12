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

// var buildings = new Scorocode.Query("buildings");
// buildings.find().then((finded) => {
//   let buildings = finded.result;
//   return buildings;
// });
// const infoBuildings = buildings.map((buildings) =>
//   <li>{buildings}</li>
// );

ReactDOM.render(
    <App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

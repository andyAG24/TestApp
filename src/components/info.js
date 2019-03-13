import React, { Component } from 'react';
import Scorocode from 'scorocode';
import './info.css';

Scorocode.Init({
    ApplicationID: "3196b2e873234547ad8b06ed636d3538",
    JavaScriptKey: "5e85f685a23e44e6abad95accc1dd2ea",
    MasterKey: "659d718ff9664f6fafbdb79efc93cb34"
});



class Info extends React.Component {
    

    render () {
        return (
            <div>
                { this.props.building1._id && 
                    <div className="app-window clearfix">
                        {/* <div className="app-header"></div> */}
                        <div className="content">
                        <div className="building-names clearfix">
                            <ul>
                                <li onClick={ () => {this.props.getBuildingInfoAndFloors(0)}} className="building-button">
                                <input type="radio" name="radio" id="radio1" className="radio"/>
                                <label id="b1" htmlFor="radio1">
                                    
                                {/* <div onClick={ () => {this.props.getBuildingInfoAndFloors(0)}} className="building-button">{this.props.building1.name}</div> */}
                                </label>
                                <div>
                                        {this.props.building1.name}
                                    </div>
                                </li>

                                <li onClick={ () => {this.props.getBuildingInfoAndFloors(1)}} className="building-button">
                                <input type="radio" name="radio" id="radio2" className="radio"/>
                                <label id="b2" htmlFor="radio2">
                                    
                                {/* <div onClick={ () => {this.props.getBuildingInfoAndFloors(1)}} className="building-button">{this.props.building2.name}</div> */}
                                </label>
                                <div>
                                        {this.props.building2.name}
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="building clearfix">
                            <div className="building-info clearfix">
                            <div>
                            <p>Наименование: {this.props.name}</p>
                            <p>ID: {this.props.id}</p>
                            <p>Создано: {this.props.createdAt}</p>
                            <p>Обновлено: {this.props.updatedAt}</p>
                            </div>
                            
                            <ul id="floors-names">{this.props.floorsList}</ul>
                            { this.props.roomsNames && 
                                <ul id="rooms-names">{this.props.roomsNames}</ul>
                            }
                            {   this.props.roomsNames &&
                                <ul id="rooms-names">{this.props.moreRoomsArray}</ul>
                            }
                            </div>
                            

                            { this.props.requiredEquipment &&
                                <div className="equipment-info">
                                    Найденное оборудование: 
                                    <ol>{this.props.requiredEquipment}</ol> 
                                </div>
                            }
                        </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Info;
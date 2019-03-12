import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/button';
import Info from './components/info';
import Scorocode from 'scorocode';


Scorocode.Init({
  ApplicationID: "3196b2e873234547ad8b06ed636d3538",
  JavaScriptKey: "5e85f685a23e44e6abad95accc1dd2ea",
  MasterKey: "659d718ff9664f6fafbdb79efc93cb34"
});



class App extends Component {

  state = {
    building1: "",
    building2: "",
    buildingArray: undefined,
    name: undefined,
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    requiredFloor: ""
  }
  
  getBuildings = async(e) => {
    e.preventDefault();

    // Загружаем массив со зданиями и помещениями
    var buildings = new Scorocode.Query("buildings");
    buildings.find().then((finded) => {
      let buildings = finded.result;
      // console.log(buildings[0]);
      // console.log(buildings[0].valueOf);
      this.setState({
        building1: buildings[0],
        building2: buildings[1],
        buildingArray: buildings,
        roomsNames: '',
        roomsArray: '',
        moreRoomsArray: '',
        requiredEquipment: ''
      });
    });
    for (let building in this.buildingArray) {
      var buildingsNameList;
      buildingsNameList.push(<li className="">{building.name}</li>);
    };
    document.getElementById("get-info").remove();
    
    return buildingsNameList;
  };

  getBuildingInfo = async(indexOfBuilding) => {
    let building = this.state.buildingArray[indexOfBuilding];
    this.setState({
      name: building.name,
      id: building._id,
      createdAt: building.createdAt.toLocaleString("ru-ru"),
      updatedAt: building.updatedAt.toLocaleString("ru-ru"),
      roomsNames: '',
      roomsArray: '',
      moreRoomsArray: '',
      requiredEquipment: ''
    });
    // console.log(building._id);
  }

  getFloors = async(indexOfBuilding) => {
    let building = this.state.buildingArray[indexOfBuilding];
    let floorsList = building.rooms;

    this.setState({ moreRoomsArray: '' });
    let floorsNames = floorsList.map((floorsList) => <li id={floorsList.id} className="floor" onClick={ () => {this.getRooms(floorsList.id); ; this.getEquipment(floorsList.id)}}>{floorsList.name}</li>);
    let floorIds = floorsList.map((floorsList) => floorsList.id);
    let floorArray = floorsList.map((floorsList) => floorsList);
    this.setState({
      floorsList: floorsNames,
      floorIds: floorIds,
      floorArray: floorArray,
      roomsNames: '',
      roomsArray: '',
      moreRoomsArray: '',
      requiredEquipment: ''
    });
    // console.log(floorsList);
  }

  getBuildingInfoAndFloors = async(indexOfBuilding) => {
    this.getAllEquipment();
    this.getBuildingInfo(indexOfBuilding);
    this.getFloors(indexOfBuilding);
  }

  getRooms = async(floorId) => {
    // console.log(floorId);
    // console.log(this.state.floorArray);
    this.setState({ moreRoomsArray: '' });
    let requiredFloor = this.state.floorArray.find(floor => floor.id === floorId);
    let roomsArray = requiredFloor.children;
    if (roomsArray !== undefined) {
      // console.log(roomsArray);
      let roomsNames = roomsArray.map((roomsArray) => <li id={roomsArray.id} className="room" onClick={ () => {this.getMoreRooms(roomsArray.id); ; this.getEquipment(roomsArray.id)}}>{roomsArray.name}</li>);
      this.setState({
        roomsNames: roomsNames,
        requiredFloor: requiredFloor,
        roomsArray: roomsArray,
        requiredEquipment: ''
      });
    } 
    this.getEquipment(this.state.floorId);
  }

  getMoreRooms = async(roomId) => {
    // console.log(roomId);
    let requiredRooms = this.state.roomsArray.find(roomArray => roomArray.id === roomId);
    // console.log(requiredRooms)
    this.setState({ roomId: roomId });
    if (requiredRooms !== undefined) {
      let roomsArray = requiredRooms.children;
      if (roomsArray !== undefined) {
        // console.log(roomsArray);
        let roomsNames = roomsArray.map((roomsArray) => <li id={roomsArray.id} className="room" onClick={ () => {this.getMoreRooms(roomsArray.id); this.getEquipment(roomsArray.id)}}>{roomsArray.name}</li>);
        this.setState({
          moreRoomsArray: roomsNames,
          requiredEquipment: ''
        });
      } else {
        this.setState({
          moreRoomsArray: '',
          requiredEquipment: ''
        });
      }
    } else if ((requiredRooms !== undefined) && (requiredRooms.children !== undefined)) {
      this.setState({
        moreRoomsArray: '',
        requiredEquipment: ''
      });
    }
    // this.getEquipment(this.state.roomId);
    // console.log(this.state.equipment);
  }

  getAllEquipment() {
    var eq = new Scorocode.Query("equipment");
    eq.find().then((found) => {
      let equipment = found.result;
      this.setState({
        equipment: equipment,
        requiredEquipment: ''
      });
    });
  }

  getEquipment = async(roomId) => {
    console.log(roomId);
    this.setState({requiredEquipment: 'Оборудование отсутствует'});
    if ((roomId !== '') && (roomId !== undefined)) {
      let requiredEquipment = this.state.equipment.filter(equipment => equipment.room === roomId);
      console.log(requiredEquipment);
      // let requiredEquipmentList;
      // requiredEquipment.forEach(requiredEquipmentList.push(<li id={requiredEquipment._id} className="equipment">{requiredEquipment.name}</li>));
      let requiredEquipmentList = requiredEquipment.map((requiredEquipment) => <li id={requiredEquipment._id} className="equipment">{requiredEquipment.name} (ID: {requiredEquipment._id})</li>);
      console.log(requiredEquipmentList);
      this.setState({
        requiredEquipment: requiredEquipmentList
      });
    }
    console.log(this.state.requiredEquipment);
  }

  render() {
    // console.log(this.state.buildingArray);
    
    return (
      <div>
        <div id="get-info">
          <Button 
          gettingBuildings={this.getBuildings}/>
        </div>
        <Info 
          buildingArray={this.state.buildingArray}
          gettingBuildingInfo={this.getBuildingInfo}
          building1={this.state.building1}
          building2={this.state.building2}
          name={this.state.name}
          id={this.state.id}
          createdAt={this.state.createdAt}
          updatedAt={this.state.updatedAt}
          getBuildingInfoAndFloors={this.getBuildingInfoAndFloors}
          floorsList={this.state.floorsList}
          roomsNames={this.state.roomsNames}
          requiredFloor={this.state.requiredFloor.name}
          moreRoomsArray={this.state.moreRoomsArray}
          requiredEquipment={this.state.requiredEquipment}/>
      </div>
    );
  }
}

export default App;

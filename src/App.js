import React, { Component } from 'react';
import GoogleMaps from './components/GoogleMaps.js'
import EarthquakeList from './components/EarthquakeList.js'
import './css/App.css';
import { Row, Col } from 'react-bootstrap';
import EarthquakeStore from './stores/EarthquakeStore';



class App extends Component {
  constructor() {
    super()
    this.state = {
      earthquakeItems: EarthquakeStore.getAll().earthquakeItems,
      lat: EarthquakeStore.getAll().lat,
      lng:EarthquakeStore.getAll().lng
    }
    this.getItems = this.getItems.bind(this);
  }
  componentWillMount(){
      EarthquakeStore.on("change", this.getItems);
  }
  //remove listeners when the component is unmounted to avoid having multiple listeners when the component is re-rendered
  componentWillUnmount(){
      EarthquakeStore.removeListener("change",this.getItems);
  }
  getItems(){
      this.setState({
          earthquakeItems:EarthquakeStore.getAll().earthquakeItems,
          lat:EarthquakeStore.getAll().lat,
          lng:EarthquakeStore.getAll().lng
      })
  }
  render() {
    return (
      <div className="app">

          <Row className="show-grid">

            <Col style={{paddingRight:0, height:'100vh',background:'#e2e2e2',overflowY:'auto'}} md={3}>
              <div className="info-container">
                <div className="app-header">
                  <h2>Earthquake Monitor</h2>
                  <div className="live-indicator">Live •</div>
                </div>
                  <EarthquakeList earthquakeItems={this.state.earthquakeItems}></EarthquakeList>
              </div>
            </Col>

            <Col style={{paddingLeft:0}} md={9}>
              <GoogleMaps lat={this.state.lat} lng={this.state.lng} ></GoogleMaps>
            </Col>

          </Row>

      </div>

    );
  }
}


export default App;

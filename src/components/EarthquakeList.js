import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/EarthquakeList.css';
import * as EarthquakeActions from '../actions/EarthquakeActions';



class EarthquakeList extends Component{
    constructor(props){
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(evt){
        var earthquake_index = evt.target.getAttribute("data-earthquake-index")
        console.log(earthquake_index)
        var lat = this.props.earthquakeItems[earthquake_index].geometry.coordinates[1];
        var lng = this.props.earthquakeItems[earthquake_index].geometry.coordinates[0];
        EarthquakeActions.moveMapToLocation(lat,lng);
    }
    render(){

        const listItems = this.props.earthquakeItems.map((item, index)=>{
               return (
                    <div className="earthquake-item-list" key={"earthquake_"+index} >
                        <div  className="info-up" >
                            <span className="pointer-cursor" onClick={this.handleClick} data-earthquake-index={index} >{item.properties.place}</span>
                            <span style={{color:'indianred'}}>{" MAG:" + item.properties.mag}</span>
                        </div>
                        <div className="info-bottom">
                            <span>{new Date(item.properties.time).toString()}</span>
                        </div>
                    </div>
                )
            })
        return (
            <div>{listItems}</div>
        )
     }
}

//type checking for props, https://www.npmjs.com/package/prop-types
EarthquakeList.propTypes = {
    earthquakes:PropTypes.array
};

export default EarthquakeList;
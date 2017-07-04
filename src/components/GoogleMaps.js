import React, { Component } from 'react';
import * as EarthquakeActions from '../actions/EarthquakeActions';
import PropTypes from 'prop-types';


const google = window.google;
var map = window.map; 

class GoogleMaps extends Component{
    constructor(){
        super();
        this.initMap = this.initMap.bind(this);
        this.getCircle = this.getCircle.bind(this);
        this.fetchEarthQuakeData = this.fetchEarthQuakeData.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidMount() {
        // Map is initialized only after the map div elemept is finished rendering
        this.initMap();
    }


    fetchEarthQuakeData() {
        //creates a script element and populates it with data from the API, the script is then appended to the head element
        var script = document.createElement('script');
        script.src = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
        document.getElementsByTagName('head')[0].appendChild(script);

        //creates a circle icon with a radius correlated with the earthquake magnitute
        map.data.setStyle((feature)=>{
          var magnitude = feature.getProperty('mag');
          return {
            icon: this.getCircle(magnitude)
          };
        });

        window.eqfeed_callback = function(results) {
          EarthquakeActions.updateEarthquakeItems(results.features);
          //adds GeoJson to the collection , docs - https://developers.google.com/maps/documentation/javascript/reference#Data          
          map.data.addGeoJson(results);
        }
    }

    initMap() {
            map = new google.maps.Map(this.refs.map, {
              zoom: 3,
              center: new google.maps.LatLng(this.props.lat,this.props.lng),
              mapTypeId: 'terrain',
              styles: [ { "elementType": "geometry", "stylers": [ { "color": "#1d2c4d" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#8ec3b9" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#1a3646" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#64779e" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#334e87" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#6f9ba5" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#3C7680" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#304a7d" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#2c6675" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#255763" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#b0d5ce" } ] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#3a4762" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#0e1626" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#4e6d70" } ] } ]
            })


        this.fetchEarthQuakeData();

        //refetches data every 30 secs 
        setInterval(()=>{
            this.fetchEarthQuakeData();
        },30000)

    }

    //creates a circle with radius depending on the earthquake magnitude 
    getCircle(magnitude) {
        return {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'red',
          fillOpacity: .2,
          scale: Math.pow(2, magnitude) / 2,
          strokeColor: 'white',
          strokeWeight: .5
        }
    }
    render() {
        return (
            <div ref="map" style={{height: '100vh', width: '100%'}}></div>
        )
     }
    componentDidUpdate(){
      var center = new google.maps.LatLng(this.props.lat, this.props.lng);
      map.panTo(center);
    }
}

GoogleMaps.propTypes = {
    lat:PropTypes.number,
    lng:PropTypes.number
};


export default GoogleMaps;
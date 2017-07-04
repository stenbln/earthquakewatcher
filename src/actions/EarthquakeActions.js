import dispatcher from '../dispatcher';

export function updateEarthquakeItems(earthquakeItems){
    dispatcher.dispatch({
        type:"UPDATE_EARTHQUAKE_ITEMS",
        earthquakeItems,
    });
}

export function moveMapToLocation(lat,lng){
    dispatcher.dispatch({
        type:"MOVE_MAP_NEW_LOCATION",
        lat,
        lng
    });
}
import {EventEmitter} from "events";
import dispatcher from '../dispatcher';


class EarthquakeStore extends EventEmitter{
    constructor(){
        super();
        this.earthquakeItems=[];
        this.lat = 25.8;
        this.lng = -12.3;
    }

    getAll(){
        return {
            earthquakeItems:this.earthquakeItems,
            lat:this.lat,
            lng:this.lng
        };
    }

    updateEarthquakeItems(earthquakeItems){
        this.earthquakeItems = earthquakeItems;
        this.emit("change");
    }

    updateMapCenter(lat,lng){
        this.lat = lat;
        this.lng = lng;
        this.emit("change");
    }

    handleActions(action){
        switch(action.type){
            case "UPDATE_EARTHQUAKE_ITEMS"://implement loading
                this.updateEarthquakeItems(action.earthquakeItems);
                break;
            case "MOVE_MAP_NEW_LOCATION"://implement loading
                this.updateMapCenter(action.lat,action.lng);
                break;
            default:
                //do nothing
        }
    }
}


const earthquakeStore = new EarthquakeStore();
dispatcher.register(earthquakeStore.handleActions.bind(earthquakeStore));
export default earthquakeStore;

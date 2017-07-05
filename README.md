### Earthquake Watcher  
Live Demo - https://stenbln.github.io/earthquakewatcher/ 

![alt text](https://github.com/stenbln/earthquakewatcher/blob/master/screenshots/index.png)

#### Description
Live overview of earthquakes built with React + Flux

Data is pulled from the external API (http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp
) every 30 seconds and earthquakes with their corresponding magnitudes are visualized on the map.

### Components

![alt text](https://github.com/stenbln/earthquakewatcher/blob/master/screenshots/components.png)


`<GoogleMaps />` 
##### Props

| Name          | Type          | Default|Description|
| ------------- |:-------------:| -----: |------- |
| lat           | number        | 25.8   |Latitude that the map is centered to |
| lng           | number        |   -12.3  |Longitude that the map is centered to |


`<EarthquakeList />` 
##### Props

| Name          | Type          | Default|Description|
| ------------- |:-------------:| :-----: |------- |
| earthquakeItems           | array        | []   |Array of GeoJSON objects |



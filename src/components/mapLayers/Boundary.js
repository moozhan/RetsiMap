import React, {useState, useEffect }from 'react';
import { LayersControl, GeoJSON, FeatureGroup } from 'react-leaflet';
import {Boundaryfeatures} from "../../data/Boundary.json";
import { layer } from 'leaflet';

function Boundary() {
    const [style, setStyle] = useState();

    const style1 = (feature => {
        return ({
            fillColor: 'white',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });
    const style2 = (feature => {
        return ({
            fillColor: 'white',
            weight: 1,
            opacity: 1,
            color: 'blue',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });
    
    // layer.on("click", function (e) { 
    //     stateLayer.setStyle(style); //resets layer colors
    //     layer.setStyle(style2);  //highlights selected.
    // });
    const feature = Boundaryfeatures.map(feature=>{
        return(feature);
    });
    return(
        <LayersControl.Overlay name="Enschede Boundaries">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON data={feature} 
                    style={style1} 
                />
            )}
        </FeatureGroup>
    </LayersControl.Overlay>
    );
}

export default Boundary;
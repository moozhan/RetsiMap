import React, {useState, useContext, useEffect} from 'react';
import { LayersControl, GeoJSON, FeatureGroup } from 'react-leaflet';
import {rooftopenergyStateContext} from '../../Store';

import {Rooftopfeatures} from "../../data/Rooftops.json";


function Rooftop() {
    const [rooftopenergy, setrooftopenergy] = useContext(rooftopenergyStateContext);
    const [energy, setenergy] = useState();
    const [addedenergy, setaddedenergy] = useState([0]);

    const [style, setStyle] = useState({
        fillColor: 'blue',
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '2',
        fillOpacity: 0.5
    }
    );
    
    const highlighted = {
            fillColor: 'red',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
            };
    const feature = Rooftopfeatures.map(feature=>{
        return(feature);
    });

    var totalenergy = [0];

    function onEachFeature(feature, layer) {
        var area = feature.properties.Shape_Area;
        var smallarea = area.toFixed(2);
        layer.on("click", function (e) { 
            // stateLayer.setStyle(style); //resets layer colors
            layer.setStyle(highlighted);  //highlights selected.
            totalenergy.push(area);
            setrooftopenergy(totalenergy.reduce(myFunc));
        });
    }
    console.log(rooftopenergy);

    function myFunc(total, num) {
        return total + num;
      }
    return(
        <LayersControl.Overlay name="Enschede Rooftops">
        <FeatureGroup name="Marker with popup">
            {feature && (
                <GeoJSON 
                    data={feature} 
                    style={style} 
                    onEachFeature={onEachFeature}

                />
            )}
        </FeatureGroup>
    </LayersControl.Overlay>
    );
}

export default Rooftop;
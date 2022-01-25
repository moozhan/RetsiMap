import React, {useState} from 'react';
import Layout from '../components/layout/Layout';
import "./main.css";
import { MapContainer, TileLayer, LayersControl, FeatureGroup, LayerGroup, MapConsumer} from 'react-leaflet';
import { EditControl} from "react-leaflet-draw";
import "leaflet-draw";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import L from 'leaflet';
import Natuura2000 from '../components/mapLayers/Natuura2000';
import Geoman from "../components/Geoman";



function Map(){
    const [map, setMap] = useState(null);
    const [energy, setEnergy] = useState(0);

    const style = {
            fillColor: 'white',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '2',
            fillOpacity: 0.5
        };
    //cities.addTo(map);
    // var baseMaps = {
    //     "Cities": cities,
    // }
    // var overlayMaps = {
    //     "Cities": cities,
    //     "Cities": cities

    // };
    // L.control.layers(baseMaps, overlayMaps).addTo(map);


//     const icon = L.icon({
//         iconSize: [25, 41],
//         iconAnchor: [10, 41],
//         popupAnchor: [2, -40],
//         iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
//         shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
//       });
// //===================================================================================

      
// //============  Map Draw Configurations  ===================================
// const [mapLayers, setMapLayers] = useState([]);

// const _onCreate = e => {
//     const {layerType, layer} = e;
//     if(layerType === "polygon"){
//         const{_leaflet_id} = layer;
//         var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
//         setMapLayers(layers => [...layers, {id: _leaflet_id, latLngs: layer.getLatLngs()[0], area: area},]);
//     };
//     if(layerType === "marker"){
//         const{_leaflet_id} = layer;
//         setMapLayers(layers => [...layers, {id: _leaflet_id, latLngs: layer._latlng, type:"Wind Turbine", area: 0, distance: "5m"},
//     ]);
// };
// };
// const _onEdited = e => {
//     const {layers: {_layers}} = e;
//     Object.values(_layers).map(({_leaflet_id, editing}) => {
//         setMapLayers( layers => layers.map( l => l.id === _leaflet_id ? {...l, latlngs: { ...editing.latlngs[0]}}: l));
//     });
// };

// const _onDeleted = (e) => {
//     const { layers: {_layers}} = e;
//     Object.values(_layers).map(({_leaflet_id}) => {
//         setMapLayers( layers => 
//             layers.filter( l => l.id !== _leaflet_id));
//     });
// };
//=========================================================
    return(
        <Layout>
            <section className="centerpage">
                <MapContainer style={{ height: "90vh", width: "100vww" }} center={[52.473351, 6.667982]} zoom={13.5} scrollWheelZoom={true} crs={L.CRS.EPSG3857}>
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="OpenStreetMap">
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            filter= "myFilter"
                            />
                        </LayersControl.BaseLayer>
                        <LayerGroup>
                            <Natuura2000 /> 

                        </LayerGroup>
                        <MapConsumer>
                        {(map) => {
                            var plantOne = new L.FeatureGroup();
                            map.addLayer(plantOne);
                            var drawControl = new L.Control.Draw({
                              edit: {
                                featureGroup: plantOne
                              }
                            });

                            var plantTwo = new L.FeatureGroup();
                            map.addLayer(plantTwo);
                            var drawControlTwo = new L.Control.Draw({
                              edit: {
                                featureGroup: plantTwo
                              }
                            });

                            //=============================================
                            var styleTwo = {            
                                fillColor: 'white',
                                weight: 1,
                                opacity: 1,
                                color: 'black',
                                dashArray: '2',
                                fillOpacity: 0.5
                            }
                            // var drawings = L.layerGroup([drawnItems]);

                            // var overlayMaps = {
                            //     "Cities": drawings
                            // };
                            // L.control.layers(overlayMaps).addTo(map);


                            
                            // document
                            //   .getElementById("drawPolyline")
                            //   .addEventListener("click", e => drawPolyline(e));
                            
                            // document
                            //   .getElementById("cancelDraw")
                            //   .addEventListener("click", e => cancelDraw(e));
                            
                            // let polylineDrawHandler;
                            // const drawPolyline = e => {
                            //   polylineDrawHandler = new L.Draw.Polyline(map, drawControl.options.polyline);
                            //   polylineDrawHandler.enable();
                            //   setEnergy(2);
                            //   console.log(energy);
                            // };
                            
                            // const cancelDraw = e => polylineDrawHandler.disable();
                            // map.on(L.Draw.Event.CREATED, e => {
                            //     const layer = e.layer;
                            //     drawnItems.addLayer(layer);
                            // });

                        // //second
                        // var secondItems = new L.FeatureGroup();
                        // map.addLayer(secondItems);
                        // var drawControl = new L.Control.Draw({
                        //   edit: {
                        //     featureGroup: secondItems
                        //   }
                        // });
                        
                        // document
                        //   .getElementById("secondtest")
                        //   .addEventListener("click", e => drawPolylinetwo(e));
                        
                        // document
                        //   .getElementById("cancelsecond")
                        //   .addEventListener("click", e => cancelDrawtwo(e));
                        
                        // let polylineDrawHandlertwo;
                        // const drawPolylinetwo = e => {
                        //     polylineDrawHandlertwo = new L.Draw.Polyline(map, drawControl.options.polyline);
                        //     polylineDrawHandlertwo.enable();
                        //   setEnergy(2);
                        //   console.log(energy);
                        // };
                        
                        // const cancelDrawtwo = e => polylineDrawHandlertwo.disable();
                        // map.on(L.Draw.Event.CREATED, e => {
                        //     const layer = e.layer;
                        //     secondItems.addLayer(layer);
                        // });


                        var polygonDrawer = new L.Draw.Polygon(map, drawControl.options.polygon);
                        map.on('draw:created', function (e) {
                            var type = e.layerType,
                                layer = e.layer;
                            layer.addTo(map);
                        });
                        const drawPolyline = e => {
                          polygonDrawer.enable();
                          setEnergy(2);
                          console.log(energy);
                        };
                        document
                            .getElementById("drawPolyline")
                            .addEventListener("click", e => drawPolyline(e));

                        //=============================================================================
                        var polygonDrawerTwo = new L.Draw.Polygon(map, drawControlTwo.options.polygon);
                        polygonDrawerTwo.setOptions({shapeOptions: styleTwo});
                        map.on('draw:created', function (e) {
                            var type = e.layerType,
                                layer = e.layer;
                            layer.addTo(map);
                        });
                        const drawPolylineTwo = e => {
                            polygonDrawerTwo.enable();
                          setEnergy(2);
                          console.log(energy);
                        };
                        document
                            .getElementById("drawPolylineTwo")
                            .addEventListener("click", e => drawPolylineTwo(e));





                        return null;
                        }}
                        </MapConsumer>
                    </LayersControl>
                    {/* <Geoman/> */}
                </MapContainer>     

            </section>
            <section>
            <button id="drawPolyline">Draw Plant 1</button>
            <button id="drawPolylineTwo">Draw Plant 2</button>

            {/* <button id="secondtest">Click me Draw</button>
            <button id="cancelsecond">Click me Draw</button> */}
            </section>
        </Layout>
    );
}

export default Map;

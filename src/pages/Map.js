import React, {useEffect, useState} from 'react';
import Layout from '../components/layout/Layout';
import "./main.css";
import { MapContainer, TileLayer, LayersControl, LayerGroup, MapConsumer} from 'react-leaflet';
import "leaflet-draw";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import L from 'leaflet';
import Natuura2000 from '../components/mapLayers/Natuura2000';
import miscanthus from '../components/images/Miscanthus.png';
import maze from '../components/images/maze.png';
import cattail from '../components/images/cattail.png';
import reed from '../components/images/reed.png';


function Map(){
    const [miscanthusAmount, setmiscanthusAmount] = useState(0);
    const [mazeAmount, setmazeAmount] = useState(0);
    const [cattailAmount, setcattailAmount] = useState(0);
    const [reedAmount, setreedAmount] = useState(0);

    //=================Styles====================//
    var Miscanthus = {            
        fillColor: 'white',
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '2',
        fillOpacity: 0.5
    }
    var Maize = {            
        fillColor: 'red',
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '2',
        fillOpacity: 0.5
    }
    var Cattail = {            
        fillColor: 'blue',
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '2',
        fillOpacity: 0.5
    }
    var Reed = {            
        fillColor: 'green',
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '2',
        fillOpacity: 0.5
    }

    return(
        <Layout>
            <section className="centerpage">
                <div className="navbarcontrol">
                    <div className="holder">
                        <div className="half">
                            <img src={miscanthus} className="controlimage" alt=""></img>
                        </div>
                        <div className="halftwo">
                            <button id="drawMiscanthus" className="buttonscontrol">Plant Some Miscanthus</button>
                            <button id="editMiscanthus" className="buttonscontrol">Remove All Miscanthus</button>
                        </div>
                    </div>
                    <div className="holder">
                        <div className="half">
                            <img src={maze} className="controlimage" alt=""></img>
                        </div>
                        <div className="halftwo">
                            <button id="drawMaize" className="buttonscontrol">Plant Some Maize</button>
                            <button id="editMaize" className="buttonscontrol">Remove All Maize</button>   
                        </div>
                    </div>                    
                    <div className="holder">
                        <div className="half">
                            <img src={cattail} className="controlimage" alt=""></img>
                        </div>
                        <div className="halftwo">
                            <button id="drawCattail" className="buttonscontrol">Plant Some Cattail</button>
                            <button id="editCattail" className="buttonscontrol">Remove All Cattail</button> 
                        </div>
                    </div>                 
                    <div className="holder">
                        <div className="half">
                            <img src={reed} className="controlimage" alt=""></img>
                        </div>
                        <div className="halftwo">
                            <button id="drawReed" className="buttonscontrol">Plant Some Reed</button>
                            <button id="editReed" className="buttonscontrol">Remove All Reed</button> 
                        </div>
                    </div>
                </div>
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
                            //====================== All Feature Groups ===========================
                            var cropMiscanthus = new L.FeatureGroup();
                            map.addLayer(cropMiscanthus);
                            var drawControl = new L.Control.Draw({
                              edit: {
                                featureGroup: cropMiscanthus
                              }
                            });

                            var cropMaize = new L.FeatureGroup();
                            map.addLayer(cropMaize);
                            var drawControlTwo = new L.Control.Draw({
                              edit: {
                                featureGroup: cropMaize
                              }
                            });
                            var cropCattail = new L.FeatureGroup();
                            map.addLayer(cropCattail);
                            var drawControlThree = new L.Control.Draw({
                              edit: {
                                featureGroup: cropCattail
                              }
                            });

                            var cropReed = new L.FeatureGroup();
                            map.addLayer(cropReed);
                            var drawControlFour = new L.Control.Draw({
                              edit: {
                                featureGroup: cropReed
                              }
                            });

                    // =============  create a polygon  =============================//
                            var polygonDrawer = new L.Draw.Polygon(map, drawControl.options.polygon);
                            polygonDrawer.setOptions({shapeOptions: Miscanthus});
                            var polygonDrawerTwo = new L.Draw.Polygon(map, drawControlTwo.options.polygon);
                            polygonDrawerTwo.setOptions({shapeOptions: Maize});
                            var polygonDrawerThree = new L.Draw.Polygon(map, drawControlThree.options.polygon);
                            polygonDrawerThree.setOptions({shapeOptions: Cattail});
                            var polygonDrawerFour = new L.Draw.Polygon(map, drawControlFour.options.polygon);
                            polygonDrawerFour.setOptions({shapeOptions: Reed});

                    //================= Draw Function Assigning Colors ===============//
                    
                        map.on('draw:created', function (e) {
                                var layer = e.layer;
                                layer.addTo(map);
                                var area = Math.round(L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]));
                                var color = layer.options.fillColor;
                                if (color === "white") {
                                    layer.addTo(cropMiscanthus);
                                } else if (color === "red") {
                                    layer.addTo(cropMaize);
                                    //setmazeAmount(mazeAmount => mazeAmount + area);
                                } else if (color === "blue") {
                                    layer.addTo(cropCattail);
                                    //setcattailAmount(cattailAmount => cattailAmount + area);
                                } else {
                                    layer.addTo(cropReed);
                                    //setreedAmount(reedAmount => reedAmount + area);
                                }
                        });
                        //=========== Enabling All Drawings =========================//

                        const drawMiscanthus = e => {
                          polygonDrawer.enable();
                        };
                        const drawMaize = e => {
                            polygonDrawerTwo.enable();
                        };
                        const drawCattail = e => {
                            polygonDrawerThree.enable();
                        };
                        const drawReed = e => {
                            polygonDrawerFour.enable();
                        };

                        //=========== Deleting the feature groups ==================//
                        const editMiscanthus  = e => {
                            cropMiscanthus.eachLayer(function(layer) {
                                if (!!layer.toGeoJSON) {
                                  map.removeLayer(layer);
                                }
                              });
                        };
                        const editMaize = e => {
                            cropMaize.eachLayer(function(layer) {
                                if (!!layer.toGeoJSON) {
                                  map.removeLayer(layer);
                                }
                              });
                        };
                        const editCattail = e => {
                            cropCattail.eachLayer(function(layer) {
                                if (!!layer.toGeoJSON) {
                                  map.removeLayer(layer);
                                }
                              });
                        };
                        const editReed = e => {
                            cropReed.eachLayer(function(layer) {
                                if (!!layer.toGeoJSON) {
                                  map.removeLayer(layer);
                                }
                              });
                        };
                        //=========== Button Events ==================//

                        document
                            .getElementById("drawMiscanthus")
                            .addEventListener("click", e => drawMiscanthus(e));
                        document
                            .getElementById("editMiscanthus")
                            .addEventListener("click", e => editMiscanthus(e));
                        document
                            .getElementById("drawMaize")
                            .addEventListener("click", e => drawMaize(e));
                        document
                            .getElementById("editMaize")
                            .addEventListener("click", e => editMaize(e));
                        document
                            .getElementById("drawCattail")
                            .addEventListener("click", e => drawCattail(e));
                        document
                            .getElementById("editCattail")
                            .addEventListener("click", e => editCattail(e));
                        document
                            .getElementById("drawReed")
                            .addEventListener("click", e => drawReed(e));
                        document
                            .getElementById("editReed")
                            .addEventListener("click", e => editReed(e));

                        return null;
                        }}
                        </MapConsumer>
                    </LayersControl>
                </MapContainer>     

            </section>
            <section>
                <div className="detailsofmap">
                    <div>
                    <div className="icons">
                        <img src={miscanthus} className="logosolarfarm" alt=""></img>
                        <p>{miscanthusAmount} ha</p>
                    </div>
                    <div className="icons">
                        <img src={maze} className="logosolarfarm" alt=""></img>
                        <p>{mazeAmount} ha</p>
                    </div>
                    <div className="icons">
                        <img src={cattail} className="logosolarfarm" alt=""></img>
                        <p>{cattailAmount} ha</p>
                    </div>
                    <div className="icons">
                        <img src={reed} className="logosolarfarm" alt=""></img>
                        <p>{reedAmount} ha</p>
                    </div>
                    </div>
                    <div className="break"></div>
                    <div>
                        <p><span>Total Energy Produced:</span></p>
                    </div>
                    <div>
                        <p><span>Total Co2 Emission Saving:</span></p>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Map;

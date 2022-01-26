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
import { polygon, distance, buffer, point, featureCollection, nearestPoint } from '@turf/turf'
import {features} from "../data/Engbertsdijkvenen.json";
import Plot from 'react-plotly.js';


function Map(){
    const [miscanthusAmount, setmiscanthusAmount] = useState(0);
    const [mazeAmount, setmazeAmount] = useState(0);
    const [cattailAmount, setcattailAmount] = useState(0);
    const [reedAmount, setreedAmount] = useState(0);
    // const [allEnergy, setallEnergy] = useState(0);
    // const [allCo2, setallCo2] = useState(0);

    //=====================Turf Stuff ====================//
    // let polygons = features[0].geometry[1].coordinates;
    // console.log(polygons);
    // var feature = polygon(polygons);
    // var buffering = buffer(feature, 50, { units: 'meters' });



    // useEffect(() => {
    //     console.log(mazeAmount);
    //   });
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
                        </div>
                        <div className="halftwo">
                            <button id="drawMiscanthus" className="buttonscontrol">Plant Some Miscanthus</button>
                            <button id="editMiscanthus" className="buttonscontrol">Remove All Miscanthus</button>
                        </div>
                    </div>
                    <div className="holder">
                        <div className="halfmaze">
                        </div>
                        <div className="halftwo">
                            <button id="drawMaize" className="buttonscontrol">Plant Some Maize</button>
                            <button id="editMaize" className="buttonscontrol">Remove All Maize</button>   
                        </div>
                    </div>                    
                    <div className="holder">
                        <div className="halfcattail">
                        </div>
                        <div className="halftwo">
                            <button id="drawCattail" className="buttonscontrol">Plant Some Cattail</button>
                            <button id="editCattail" className="buttonscontrol">Remove All Cattail</button> 
                        </div>
                    </div>                 
                    <div className="holder">
                        <div className="halfreed">
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
                    //set the variable for area
                    let misconthusarea = [];
                    let maizearea = [];
                    let cattailarea = [];
                    let reedarea = [];
                    let totalmisconthusarea = 0;
                    let totalmaizearea = 0;
                    let totalcattailarea = 0;
                    let totalreedarea = 0;
                    let reedpro = 0;
                    let cattailpro = 0; 
                    let maizepro = 0;
                    let conthuspro = 0;
                    let reedco = 0;
                    let cattailco = 0; 
                    let maizeco = 0;
                    let conthusco = 0;
                        map.on('draw:created', function (e) {
                                var layer = e.layer;
                                layer.addTo(map);
                                var area = Math.round(L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]));
                                var color = layer.options.fillColor;
                                if (color === "white") {
                                    layer.addTo(cropMiscanthus);
                                    misconthusarea.push(area);
                                    // console.log(misconthusarea);
                                    totalmisconthusarea = totalmisconthusarea + area;
                                    // console.log(totalmisconthusarea);
                                    document.getElementById("areaofMiscantus").innerHTML = totalmisconthusarea/10000;
                                    conthuspro = Math.round(246.15 * totalmisconthusarea/10000);
                                    document.getElementById("totalenergymiscantus").innerHTML = conthuspro;
                                    conthusco = Math.round(14.85 * totalmisconthusarea/10000);
                                    document.getElementById("Coreductionmuscantus").innerHTML = conthusco;

                                } else if (color === "red") {
                                    layer.addTo(cropMaize);
                                    maizearea.push(area);
                                    // console.log(maizearea);
                                    totalmaizearea = totalmaizearea + area;
                                    // console.log(totalmaizearea);
                                    document.getElementById("areaofMaize").innerHTML = totalmaizearea/10000;
                                    maizepro = Math.round(520.38 * totalmaizearea/10000);
                                    document.getElementById("totalenergymaize").innerHTML = maizepro;
                                    maizeco = Math.round(29.453 * totalmaizearea/10000);
                                    document.getElementById("Coreductionmaize").innerHTML = maizeco;

                                } else if (color === "blue") {
                                    layer.addTo(cropCattail);
                                    cattailarea.push(area);
                                    // console.log(cattailarea);
                                    totalcattailarea = totalcattailarea + area;
                                    // console.log(totalcattailarea);
                                    document.getElementById("areaofCattail").innerHTML = totalcattailarea/10000;
                                    cattailpro = Math.round(128.32 * totalcattailarea/10000);
                                    document.getElementById("totalenergyCattail").innerHTML = cattailpro;
                                    cattailco = Math.round(7.263 * totalcattailarea/10000);
                                    document.getElementById("CoreductionCattail").innerHTML = cattailco;

                                } else {
                                    layer.addTo(cropReed);
                                    reedarea.push(area);
                                    // console.log(reedarea);
                                    totalreedarea = totalreedarea + area;
                                    // console.log(totalreedarea);
                                    document.getElementById("areaofReed").innerHTML = totalreedarea/10000;
                                    reedpro = Math.round(262.46 * totalreedarea/10000);
                                    document.getElementById("totalenergyReed").innerHTML = reedpro;
                                    reedco = Math.round(14.855 * totalreedarea/10000);
                                    document.getElementById("CoreductionReed").innerHTML = reedco;
                                }
                                var totalenergyproduction = reedpro + cattailpro + maizepro + conthuspro;
                                // setallEnergy(totalenergyproduction);
                                document.getElementById("totalenergy").innerHTML = totalenergyproduction;
                                var totalemissionsaved = reedco + cattailco + maizeco + conthusco;
                                // setallCo2(totalemissionsaved);
                                document.getElementById("totalemissionsaved").innerHTML = totalemissionsaved;

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
                        <p id="areaofMiscantus"> 0 </p>
                        <p id="totalenergymiscantus"> 0 GJ</p>
                        <p id="Coreductionmuscantus"> 0 t</p>

                    </div>
                    <div className="icons">
                        <img src={maze} className="logosolarfarm" alt=""></img>
                        <p id="areaofMaize"> 0 ha</p>
                        <p id="totalenergymaize"> 0 GJ</p>
                        <p id="Coreductionmaize"> 0 t</p>

                    </div>
                    <div className="icons">
                        <img src={cattail} className="logosolarfarm" alt=""></img>
                        <p id="areaofCattail">0 ha</p>
                        <p id="totalenergyCattail"> 0 GJ</p>
                        <p id="CoreductionCattail"> 0 t</p>

                    </div>
                    <div className="icons">
                        <img src={reed} className="logosolarfarm" alt=""></img>
                        <p id="areaofReed"> 0 ha</p>
                        <p id="totalenergyReed"> 0 GJ</p>
                        <p id="CoreductionReed"> 0 t</p>
                    </div>
                    <br/>
                    <br/>
                    <br/>

                    </div>
                    
                    <div className="break"></div>
                    <div>
                        <p>Total Energy Produced: <span id="totalenergy"></span></p>
                    </div>
                    <div>
                        <p>Total Co2 Emission Saving: <span id="totalemissionsaved"></span></p>
                    </div>
                </div>
                {/* <div className="detailsofgraph">
                <Plot
                    data={[
                    {
                        x: ["energy Production", "Co2 Reduction"],
                        y: [allEnergy, allCo2],
                        type: 'scatter',
                        mode: 'markers',
                        marker: {color: 'red'},
                    },
                    {type: 'bar', x: ["energy Production", "Co2 Reduction"], y: [allEnergy, allCo2]},
                    ]}
                    layout={ {width: 350, height: 300} }
                />
                </div> */}
            </section>
        </Layout>
    );
}

export default Map;

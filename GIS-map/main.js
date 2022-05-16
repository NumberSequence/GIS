//Central Park   center: [40.70748615030739, -73.92744598608154],
// Prospect Park 40.662857, -73.969917
const myMap = L.map('map', {
  center: [40.662857, -73.969917],
  zoom: 11
});

let MassOnly = false;
let MurderOnly = false;
let DateOnly = false;

let testlayer

let SOL;
let MOL;
let MSOL;
let MMOL;

// BASE MAP

const basemapStreets = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
maxZoom: 19, 
attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(myMap);

/* 
//MARKER STYLES
function createCircleMarker( feature, latlng ){
  
  let options = {
    radius: 2,
    fillColor: "blue",
    color: "white",
    weight: .3,
    opacity: 1,
    fillOpacity: 0.3
  }
  return L.circleMarker( latlng, options );
}

function createCircleMarkerMass( feature, latlng ){

let options = {
  radius: 2.5,
  fillColor: "blue",
  color: "white",
  weight: .3,
  opacity: 1,
  fillOpacity: 0.4
}
return L.circleMarker( latlng, options );
}

function createCircleMarkerMurder( feature, latlng ){

  let options = {
    radius: 2,
    fillColor: "orange",
    color: "white", 
    weight: .3,
    opacity: 1,
    fillOpacity: 0.3
  }
  return L.circleMarker( latlng, options );
  }

  function createCircleMarkerMM( feature, latlng ){

    let options = {
      radius: 2.5,
      fillColor: "orange",
      color:  "white", 
      weight: .3,
      opacity: 1,
      fillOpacity: 0.4
    }
    return L.circleMarker( latlng, options );
    }
  */

/* 
//OTHER SHOOTINGS
const Shooting = $.getJSON("Shooting.geojson", function(data){
 SOL = L.geoJson(data, {
    pointToLayer: createCircleMarker, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                      + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
        layer.on('mouseover', function (e) {
          this.openPopup();
      });
      layer.on('mouseout', function (e) {
          this.closePopup();
      });
      }
  }).addTo(myMap);
 // overlay1
//controlLayers.addOverlay(SOL, "All Shootings");
});

//MASS
const MassShooting = $.getJSON("ShootingMass.geojson", function(data){
  MSOL = L.geoJson(data, {
     pointToLayer: createCircleMarkerMass, 
     onEachFeature: function (feature, layer) {
         layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                      + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
         layer.on('mouseover', function (e) {
          this.openPopup();
      });
      layer.on('mouseout', function (e) {
          this.closePopup();
      });
        }
   }).addTo(myMap);
  // overlay3
 //controlLayers.addOverlay(MSOL, "Mass Shootings");
 });

//MURD
const ShootingM = $.getJSON("ShootingM.geojson", function(data){
 MOL = L.geoJson(data, {
    pointToLayer: createCircleMarkerMurder, 
    onEachFeature: function (feature, layer) {
        layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                      + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
        layer.on('mouseover', function (e) {
          this.openPopup();
      });
      layer.on('mouseout', function (e) {
          this.closePopup();
      });
      }
  }).addTo(myMap);
 // overlay2
//controlLayers.addOverlay(MOL, "Murder Shootings");
});

 // MASSM
const MassShootingM = $.getJSON("ShootingMassM.geojson", function(data){
   MMOL = L.geoJson(data, {
      pointToLayer: createCircleMarkerMM, 
      onEachFeature: function (feature, layer) {
          layer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+feature.properties.OCCUR_TIME+ "<br>" 
                        + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths);
          layer.on('mouseover', function (e) {
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            this.closePopup();
        });
        }
    }).addTo(myMap);
   // overlay4
  //controlLayers.addOverlay(MMOL, "Mass Shootings w Murder");
  });
 
//TOGGLE LAYERS

function ToggleMurder () {
  MurderOnly = !MurderOnly;
  if(DateOnly) {document.getElementById('DateButton').click()};
  myMap.removeLayer(testlayer);
  ToggleLayer();
};

function ToggleMass () {
  MassOnly = !MassOnly;
  if(DateOnly) {document.getElementById('DateButton').click()};
  myMap.removeLayer(testlayer);
  ToggleLayer();
};

function ToggleDate () {
  //placed at end because the "if" runs before the toggle is made
  //DateOnly = !DateOnly
  if(!DateOnly) { 
  if(MassOnly){document.getElementById('MassButton').click()};
  if(MurderOnly){document.getElementById('MurderButton').click()};
  //  MassOnly = false;
  //  MurderOnly = false;
  //  $(".slider").prop("checked", false);
   // $(".slider murder").prop("checked", false);
    myMap.removeLayer(SOL);
    myMap.removeLayer(MSOL);
    myMap.removeLayer(MOL);
    myMap.removeLayer(MMOL)}
    else {
      myMap.addLayer(SOL);
      myMap.addLayer(MSOL);
      myMap.addLayer(MOL);
      myMap.addLayer(MMOL)}
  DateOnly = !DateOnly
  };

  function ToggleLayer () {
    //preserve layer order, remove first
    myMap.removeLayer(SOL);
    myMap.removeLayer(MSOL);
    myMap.removeLayer(MOL);
    myMap.removeLayer(MMOL);
    //  then add
       if(MurderOnly && MassOnly)  {
        myMap.addLayer(MMOL);
        }
      else if (MurderOnly && !MassOnly) {
              myMap.addLayer(MOL);
              myMap.addLayer(MMOL);
              //myMap.removeLayer(SOL);
              //myMap.removeLayer(MSOL);
              }
      else if(!MurderOnly && MassOnly) {
              myMap.addLayer(MSOL);
              myMap.addLayer(MMOL);
              //myMap.removeLayer(SOL);
              //myMap.removeLayer(MOL);
              }
        else {
        myMap.addLayer(SOL);
        myMap.addLayer(MSOL);
        myMap.addLayer(MOL);
        myMap.addLayer(MMOL);
        };
      };
     */

  
    //Fetch GeoJSON file
    $.getJSON("AllShoot.geojson", function(json) {
  
    testlayer = L.geoJson(json, {
       // pointToLayer: createCircleMarker, 
      
        pointToLayer: function(feature, latlng) {
          //let ismass = feature.properties.Mass === "TRUE";
          let ismurd = feature.properties.MurderF === "TRUE";
         
                  
                     
                        /* if (ismass && ismurd) {
                        return L.circleMarker(latlng, {
                          radius: 2.5,
                          fillColor: "orange",
                          color: "yellow", 
                          weight: .3,
                          opacity: 1,
                          fillOpacity: 0.3
                        })
                        } 
                        else  */
                        //if (!ismass && ismurd) {
                          if (ismurd) {
                          return L.circleMarker(latlng, {
                            radius: 2,
                            fillColor: "orange",
                            color: "yellow", 
                            weight: .3,
                            opacity: 1,
                            fillOpacity: 0.5,
                            
                          });
                         // this.setZIndexOffset(5000);
                          } 
                         /*  else if (ismass && !ismurd) {
                             return L.circleMarker(latlng, {
                              radius: 2.5,
                              fillColor: "blue",
                              color: "white",
                              weight: .3,
                              opacity: 1,
                              fillOpacity: 0.3
                            })
                            }  */
                            else {
                              return L.circleMarker(latlng, {
                                radius: 2,
                                fillColor: "blue",
                                color: "white",
                                weight: .3,
                                opacity: 1,
                                fillOpacity: 0.2
                              })
                              } 
                
                },
        
                
  
      
        onEachFeature: function (feature, testlayer) {
            testlayer.bindPopup("Date: " + feature.properties.OCCUR_DATE + "<br>" + "Time: "+ feature.properties.OCCUR_TIME.slice(0, -3)+ "<br>" 
                            //  + "Victims: "+feature.properties.Victims + "<br>" + "Deaths: "+feature.properties.Deaths
                              );
            testlayer.on('mouseover', function (e) {
              this.openPopup();
          });
          testlayer.on('mouseout', function (e) {
              this.closePopup();
          });
            
          },
      }
    
      ),
     
 
      sliderControl = L.control.sliderControl({
          position: "topleft",
          layer: testlayer, 
          timeAttribute: "OCCUR_DATE",
          range: true,
          showAllOnStart: true,
          alwaysShowDate: true
      });

      //add slider to map
      myMap.addControl(sliderControl);
      //initialize the slider
      sliderControl.startSlider();

  });


  

require([
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/FeatureLayer'
],function(Map, MapView, FeatureLayer){
    
    var map = new Map({
        basemap: 'satellite'
    });

    var view = new MapView({
        container: 'viewDiv',
        map: map,
        center: [-118.80543,34.02700],
        zoom: 13
    });


    var trailheadLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
        renderer: {
            type: 'simple',
            symbol: {
                type: 'picture-marker',
                url:"http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                width: '18px',
                heigth: '18px'
            },       
        },
        labelingInfo:{
            symbol: {
                type: "text",
                color: "#FFFFFF",
                haloColor: "#5E8D74",
                haloSize: "2px",
                font: {
                  size: "12px",
                  family: "Noto Sans",
                  style: "italic",
                  weight: "normal"
                }
            },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.TRL_NAME"
            }
        },
        popupTemplate: {
            title: '{TRL_NAME}',
            content: "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
            }
        
    });

    var trailsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        definitionExpression: 'ELEV_GAIN<250',
        renderer: {
            type: 'simple',
            symbol: {
                type: 'simple-line',
                color: 'green',
                style: 'solid'
            },
            visualVariables:[
                {
                type: "size",
                field: "ELEV_GAIN",
                minDataValue: 0,
                maxDataValue: 2300,
                minSize: "3px",
                maxSize: "7px"        
                }
            ],
            opacity: 0.75
        },
        outFields: ['TRL_NAME','ELEV_GAIN'],
        popupTemplate: {
            title: '{TRL_NAME}',
            content: [
                {
                  type: "media",
                  mediaInfos: [
                    {
                      type: "column-chart",
                      caption: "",
                      value: {
                        fields: ["ELEV_MIN", "ELEV_MAX"],
                        normalizeField: null,
                        tooltipField: "Min and max elevation values"
                      }
                    }
                  ]
                }
              ]
        }

    });

    var parksLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
        popupTemplate:{
            title: '{PARK_NAME}',
            content: [
                {
                  type: "fields",
                  fieldInfos: [
                    {
                      fieldName: "AGNCY_NAME",
                      label: "Agency",
                      isEditable: true,
                      tooltip: "",
                      visible: true,
                      format: null,
                      stringFieldOption: "text-box"
                    },
                    {
                      fieldName: "TYPE",
                      label: "Type",
                      isEditable: true,
                      tooltip: "",
                      visible: true,
                      format: null,
                      stringFieldOption: "text-box"
                    },
                    {
                      fieldName: "ACCESS_TYP",
                      label: "Access",
                      isEditable: true,
                      tooltip: "",
                      visible: true,
                      format: null,
                      stringFieldOption: "text-box"
                    },
                    {
                      fieldName: "GIS_ACRES",
                      label: "Acres",
                      isEditable: true,
                      tooltip: "",
                      visible: true,
                      format: {
                        places: 2,
                        digitSeparator: true
                      },
                      stringFieldOption: "text-box"
                    }
                  ]
                }
              ]
        }



    });



    map.add(trailheadLayer);
    map.add(trailsLayer,0);
    map.add(parksLayer,0);


});
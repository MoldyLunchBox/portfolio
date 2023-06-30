
// @ts-nocheck
// use client
'use client';
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";


export const Map = () => {
    return (
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [-10.0, -15.0, 0],
            center: [-10, 20],
            scale: 1000
          }}
          style={{ width:"100%", height: "100%"}}
        >
          <Geographies
            geography="/features.json"
            fill="black"
            stroke="black"
            strokeWidth={0.5}
          >
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          <Annotation
            subject={[-7.6167, 33.5900]}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: "#FF5533",
              strokeWidth: 3,
              strokeLinecap: "round"
            }}
          >
            <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
              {"Casablanca"}
            </text>
          </Annotation>
        </ComposableMap>
      );
}

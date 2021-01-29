import React from "react";
import {LeafletMap, TileLayer } from "react-leaflet";
function Map() {
    return (
        <div>
            <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </LeafletMap>
        </div>
    )
}

export default Map

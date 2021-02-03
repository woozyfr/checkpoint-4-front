import React, { useState, useEffect, useRef } from "react";
import "./css/styles.css";
import L from "leaflet";

/**
 * @class Map
 * @description Map du site
 */

export default function Map() {
  const mapRef = useRef();
  const layerRef = useRef();
  useEffect(() => {
    mapRef.current = L.map("map", {
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
      ],
    }).setView([43.0589, 5.9299], 12);
    layerRef.current = L.featureGroup().addTo(mapRef.current);
  }, []);

  return (
    <div>
      <form action="">
        <input
          type="text"
          name="search"
          id="search"
          className="searchInput"
          placeholder="Rechercher un Bar"
        />
      </form>
      <div id="map" />
      <div>Ajouter un nouveau Bar</div>
    </div>
  );
}

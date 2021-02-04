import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./css/styles.css";
import L from "leaflet";
import axios from "axios";

/**
 * @class Map
 * @description Map du site
 */

export default function Map() {
  const [search, setSearch] = useState("");
  const mapRef = useRef();
  const layerRef = useRef();
  const [bars, setBars] = useState([]);
  const [barsSource, setBarsSource] = useState([]);
  useEffect(() => {
    mapRef.current = L.map("map", {
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
      ],
    }).setView([43.3, 5.4], 6);
    layerRef.current = L.featureGroup().addTo(mapRef.current);
  }, []);

  useEffect(() => {
    if (!bars.length) {
      axios.get(`http://localhost:3048/bars/`).then((res) => {
        setBars(res.data);
        setBarsSource(res.data);
      });
    }
  }, []);

  useEffect(() => {
    if (bars) {
      layerRef.current.clearLayers();

      bars.forEach((bar) => {
        const m = L.marker(new L.LatLng(bar.latitude, bar.longitude)).addTo(
          layerRef.current
        );
        m.bindPopup(
          `<div><h4>${bar.name}</h4>
        <div>${bar.address}</div>
        <div>${bar.code_postal} ${bar.city}</div>
        <div>code  : ${bar.secret_code}</div>
        </div>`,
          {
            maxWidth: 610,
            minWidth: 610,
          }
        );
        m.on("click", function popitthis() {
          m.openPopup();
          mapRef.current.setView(new L.LatLng(bar.latitude, bar.longitude), 16);
        });
      });

      if (bars.length) {
        // Recentrage des datas
        const bounds = layerRef.current.getBounds();
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [bars]);

  const multipleWordsSearch = (words, row) => {
    console.log(words);
    const flatted = Object.values(row).join(" ").toLowerCase();
    for (const word of words) {
      if (!flatted.includes(word.toLowerCase())) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (search.length < 3) {
      setBars(barsSource);
    } else {
      let listBars = barsSource;
      if (barsSource.length) {
        const words = search.split(" ");
        console.log(words);
        listBars = bars.filter((q) => multipleWordsSearch(words, q));

        //   listBars = barsSource.filter(
        //     (q) =>
        //       q.name?.toLowerCase().includes(search?.toLowerCase()) ||
        //       q.city?.toLowerCase().includes(search?.toLowerCase()) ||
        //       q.description?.toLowerCase().includes(search?.toLowerCase()) ||
        //       q.code_postal?.toLowerCase().includes(search?.toLowerCase()) ||
        //       q.secret_code?.toLowerCase().includes(search?.toLowerCase()) ||
        //       q.address?.toLowerCase().includes(search?.toLowerCase())
        //   );
        // }

        setBars(listBars);
      }
    }
  }, [search.length]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          name="search"
          id="search"
          className="searchInput"
          placeholder="Rechercher un Bar"
          onChange={handleChange}
          value={search}
        />
      </form>
      <div id="map" />
      <Link to="/admin">Administration</Link>
    </div>
  );
}

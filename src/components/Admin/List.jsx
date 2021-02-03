import React, { useState, useEffect } from "react";
import "./css/styles.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * @class Layout
 * @description template du site
 */

const FakeBars = [
  {
    id: 1,
    name: "babarcoule",
    code_postal: "13190",
    address: "5 rue du peché",
    city: "Allauch",
    longitude: 43.0589,
    latitude: 5.9299,
    isBeer: 1,
    isVodka: 1,
    isWhisky: 1,
  },
  {
    id: 2,
    name: "ClandibarSaga",
    code_postal: "13190",
    address: "5 rue du peché",
    city: "Allauch",
    longitude: 43.0589,
    latitude: 5.9299,
    isBeer: 1,
    isVodka: 1,
    isWhisky: 1,
  },
  {
    id: 3,
    name: "Bara tapin",
    code_postal: "13190",
    address: "5 rue du peché",
    city: "Allauch",
    longitude: 43.0589,
    latitude: 5.9299,
    isBeer: 1,
    isVodka: 1,
    isWhisky: 1,
  },
  {
    id: 4,
    name: "La couleuvre",
    code_postal: "13190",
    address: "5 rue du peché",
    city: "Allauch",
    longitude: 43.0589,
    latitude: 5.9299,
    isBeer: 1,
    isVodka: 1,
    isWhisky: 1,
  },
  {
    id: 5,
    name: "Dodo la saumur",
    code_postal: "13190",
    address: "5 rue du peché",
    city: "Allauch",
    longitude: 43.0589,
    latitude: 5.9299,
    isBeer: 1,
    isVodka: 1,
    isWhisky: 1,
  },
];
export default function List() {
  const [bars, setBars] = useState(FakeBars);
  return (
    <div>
      <h1>
        Liste des bars{" "}
        <button className="btn btn-success">Ajouter un nouveau Bar</button>
      </h1>

      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Ville</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {bars.map((bar) => {
            return (
              <tr key={bar.id}>
                <th scope="row">{bar.id}</th>
                <td>{bar.name}</td>
                <td>{bar.city}</td>
                <td>
                  <Link
                    to={`/admin/edit/${bar.id}`}
                    className="btn btn-primary"
                  >
                    Editer
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

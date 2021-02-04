import React, { useState, useEffect } from "react";
import "./css/styles.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
/**
 * @class Layout
 * @description template du site
 */

export default function List() {
  const [bars, setBars] = useState([]);
  useEffect(() => {
    if (!bars.length) {
      axios.get(`http://localhost:3048/bars/`).then((res) => {
        setBars(res.data);
      });
    }
  }, []);

  return (
    <div>
      <h1>
        Liste des bars
        <Link to="/admin/add" className="btn btn-success">
          Ajouter un nouveau Bar
        </Link>
        <Link to="/" className="btn btn-primary">
          Retour a la carte
        </Link>
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
                  </Link>{" "}
                  <Link
                    to={`/admin/delete/${bar.id}`}
                    className="btn btn-danger"
                  >
                    Delete
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

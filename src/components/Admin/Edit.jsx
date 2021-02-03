import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import "./css/styles.css";
import PropTypes from "prop-types";
import axios from "axios";
/**
 * @class Add
 * @description Page d'ajout d'un bar
 */

export default function Add(props) {
  const [forms, setFroms] = useState({
    name: null,
    city: null,
    description: null,
    secret_code: null,
    code_postal: null,
    address: null,
    longitude: null,
    latitude: null,
  });
  let history = useHistory();
  let { id } = useParams();
  const handleChange = (event) => {
    setFroms({ ...forms, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    axios.get(`http://localhost:3048/bars/${id}`).then((res) => {
      setFroms(res.data);
    });
  }, [id]);

  const handleSubmit = (event) => {
    console.log(id);
    axios.put(`http://localhost:3048/bars/${id}`, forms).then((res) => {
      history.push("/admin");
    });
    event.preventDefault();
  };

  const detectLatLong = (event) => {
    axios
      .get(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURI(
          forms.address + " " + forms.city
        )}&postcode=${forms.code_postal}`
      )
      .then((res) => {
        if (Array.isArray(res.data.features)) {
          setFroms({
            ...forms,
            latitude: res.data.features[0].geometry.coordinates[1],
            longitude: res.data.features[0].geometry.coordinates[0],
          });
        }
      });
    event.preventDefault();
  };

  return (
    <div>
      <h1>Editer d'un nouveau Bar</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nom du bar"
            name="name"
            onChange={handleChange}
            value={forms.name}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={forms.description}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Adresse (rue etc...)"
            onChange={handleChange}
            value={forms.address}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="code_postal"
            name="code_postal"
            placeholder="Code Postal"
            onChange={handleChange}
            value={forms.code_postal}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Ville"
            name="city"
            onChange={handleChange}
            value={forms.city}
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={detectLatLong}
        >
          Detect latitude/longitude
        </button>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="latitude"
            name="latitude"
            placeholder="latitude"
            onChange={handleChange}
            value={forms.latitude}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="longitude"
            name="longitude"
            placeholder="longitude"
            onChange={handleChange}
            value={forms.longitude}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="secret_code"
            name="secret_code"
            placeholder="Code secret"
            onChange={handleChange}
            value={forms.secret_code}
          />
        </div>
        <Link to="/admin">Retour</Link>{" "}
        <button type="submit" class="btn btn-primary">
          Envoyer
        </button>
      </form>
    </div>
  );
}

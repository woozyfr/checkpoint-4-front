import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/styles.css";
import PropTypes from "prop-types";
import axios from "axios";
/**
 * @class Add
 * @description Page d'ajout d'un bar
 */

export default function Add(props) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [forms, setFroms] = useState({
    name: null,
    description: null,
    city: null,
    secret_code: null,
    code_postal: null,
    address: null,
    longitude: null,
    latitude: null,
  });
  let history = useHistory();
  const handleChange = (event) => {
    setFroms({ ...forms, [event.target.name]: event.target.value });
    //    console.log(forms);
    //setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("envoie");
    console.log(forms);

    axios.post(`http://localhost:3048/bars/`, forms).then((res) => {
      history.push("/admin");
    });

    event.preventDefault();
  };

  useEffect(() => {
    if (search.length > 8 && !isSelected) {
      axios
        .get(`https://api-adresse.data.gouv.fr/search/?q=${encodeURI(search)}`)
        .then((res) => {
          console.log(res);
          if (Array.isArray(res.data.features)) {
            setResults(res.data.features);
          }
        });
    } else {
      console.log("Pas assez de caracteres");
    }
  }, [search.length, isSelected]);

  const searchChange = (event) => {
    setSearch(event.target.value);
    setIsSelected(false);
  };

  const selectAddress = (result) => {
    setFroms({
      ...forms,
      latitude: result.geometry.coordinates[1],
      longitude: result.geometry.coordinates[0],
      city: result.properties.city,
      address: result.properties.name,
      code_postal: result.properties.postcode,
    });
    setSearch(result.properties.label);
    setResults([]);
    setIsSelected(true);
  };

  return (
    <div>
      <h1>Ajout d'un nouveau Bar</h1>
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
            id="secret_code"
            name="secret_code"
            placeholder="Code secret"
            onChange={handleChange}
            value={forms.secret_code}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="search"
            name="search"
            placeholder="Adresse a chercher (6 caractere minimum)"
            onChange={searchChange}
            value={search}
          />
        </div>
        <div>
          {results.map((result) => {
            return (
              <div
                key={result.properties.label}
                onClick={() => selectAddress(result)}
                className="rowAutocomplete"
              >
                <div> {result.properties.label}</div>
              </div>
            );
          })}
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary">
            Envoyer
          </button>
        </div>
        <h5>Debug mode (hidden normalement)</h5>

        <div>address : {forms.address}</div>
        <div>code_postal : {forms.code_postal}</div>
        <div>city : {forms.city}</div>
        <div>latitude : {forms.latitude}</div>
        <div>longitude : {forms.longitude}</div>
        <div className="form-group">
          <input
            type="hidden"
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
            type="hidden"
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
            type="hidden"
            className="form-control"
            id="city"
            placeholder="Ville"
            name="city"
            onChange={handleChange}
            value={forms.city}
          />
        </div>

        <div className="form-group">
          <input
            type="hidden"
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
            type="hidden"
            className="form-control"
            id="longitude"
            name="longitude"
            placeholder="longitude"
            onChange={handleChange}
            value={forms.longitude}
          />
        </div>
      </form>
    </div>
  );
}

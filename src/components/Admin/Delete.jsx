import { useHistory, useParams, Link } from "react-router-dom";
import "./css/styles.css";
import PropTypes from "prop-types";
import axios from "axios";
/**
 * @class Delete
 * @description Page d'ajout d'un bar
 */

export default function Delete(props) {
  let history = useHistory();
  let { id } = useParams();

  const handleSubmit = (event) => {
    console.log(id);
    axios.delete(`http://localhost:3048/bars/${id}`).then((res) => {
      history.push("/admin");
    });
    event.preventDefault();
  };

  return (
    <div>
      <h1>Confirmation de suppression</h1>
      <form onSubmit={handleSubmit}>
        <Link to="/admin" className="btn btn-primary">
          retour
        </Link>
        <button type="submit" className="btn btn-danger">
          Confirmer Suppression
        </button>
      </form>
    </div>
  );
}

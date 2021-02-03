import React from "react";
import "./css/styles.css";
import PropTypes from "prop-types";

/**
 * @class Templates
 * @description fusionne le haut et le bas du site
 */

export default function Layout(props) {
  const { children } = props;
  return <div>{children}</div>;
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

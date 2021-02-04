import React from "react";
import "./css/styles.css";
import PropTypes from "prop-types";

/**
 * @class Layout
 * @description template du site
 */

export default function Layout(props) {
  const { children } = props;
  return (
    <div>
      <span id="logo">
        Bar
        <span>Clandestin</span>
      </span>
      <div class="main">{children}</div>
    </div>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

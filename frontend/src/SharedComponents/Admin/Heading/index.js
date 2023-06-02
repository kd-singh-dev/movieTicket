import React from "react";

import "./Heading.css";

const Heading = ({ content }) => {
  return (
    <div className="admin-heading">
      <h4>Hey Admin,</h4>
      <p>{content}</p>
    </div>
  );
};

export default Heading;

import React from "react";

import "./SubmitButton.css";

const SubmitButton = (props) => {
  return (
    <button
      onClick={props.onSubmit}
      className={`submit-btn ${props.selected && "selected"}`}
      id={props.id}
    >
      {props.btnText}
    </button>
  );
};

export default SubmitButton;

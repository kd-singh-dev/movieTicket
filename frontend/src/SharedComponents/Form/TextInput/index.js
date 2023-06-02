import React from "react";

import "./TextInput.css";

const TextInput = (props) => {
  return (
    <div className="input-div">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextInput;

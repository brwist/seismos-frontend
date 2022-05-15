import React from "react";

const CustomButton = (props) => {
  return (
    <button
      style={{
        backgroundColor: "red",
        padding: 10,
        fontWeight: "bold",
        color: "white",
        borderRadius: 5,
        width: 100,
        borderColor: "red",
      }}
      type={props.type}
      name={props.name || ""}
      value={props.value || ""}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
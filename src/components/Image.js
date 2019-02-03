import React from "react";

const Image = props => {
  return (
    <img
      src={props.src}
      alt=""
      style={{maxWidth: 200}}
      className="border border-dark rounded img-thumbnail m-3"
      onClick={() => props.onClick(props.id)}
    />
  );
};

export default Image;

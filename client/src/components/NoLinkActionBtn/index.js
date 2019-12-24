import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function NoLinkActionBtn(props) {
  const key = props.key;
  const id = props.id;
  const btnClickHandler = props.btnClickHandler;
  return (
    <button type="button" className="btn custom-view-btn" tabIndex="0" onClick={event => btnClickHandler(event)} id={id} key={key}>
      {props.buttonName}
    </button>
  );
}

export default NoLinkActionBtn;
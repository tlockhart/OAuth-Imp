import React from "react";
import "./style.css";
import {Link} from 'react-router-dom';
import { checkPropTypes } from "prop-types";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function NoLinkActionBtn(props) {
  const key = props.key;
  const id = props.id;
  const btnClickHandler = props.btnClickHandler;
  return (
    // <Link to= {props.to}>
      <button type="button" className="btn custom-view-btn" tabIndex="0" onClick={event=> btnClickHandler(event)} id={id} key = {key}>
         {props.buttonName}
      </button>
    // </Link>
        
    // </div>
  );
}

export default NoLinkActionBtn;
import React from "react";
import "./style.css";
import {Link} from 'react-router-dom';

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function ProductUpdateBtn(props) {
  return (
    <Link to= {props.to}>
      <button type="button" className="btn custom-view-btn" tabIndex="0">
         {props.buttonName}
      </button>
    </Link>
        
    // </div>
  );
}

export default ProductUpdateBtn;
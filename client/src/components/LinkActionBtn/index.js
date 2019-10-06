import React from "react";
import "./style.css";
import {Link} from 'react-router-dom';

function LinkActionBtn(props) {
  return (
    <Link to= {props.to}>
      <button type="button" className="btn custom-view-btn" tabIndex="0">
         {props.buttonName}
      </button>
    </Link>
        
    // </div>
  );
}

export default LinkActionBtn;
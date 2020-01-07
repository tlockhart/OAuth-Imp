import React from 'react';
import {  MDBCol } from "mdbreact";
// import { MDBBtn } from "mdbreact";
// import $ from 'jquery';
// import styles from './styles.css';

// export class Uploader extends Component {
export let Uploader = (props) => {
  // let imageMaxMB = props.image.maxMB;
  // let imageMax = props.image.imageMax;
  // let image = props.image;

  // create ref
  let imageSelectRef = React.createRef();
  let previewCanvasRef = React.createRef();
  // let submitBtnRef = React.createRef();
  return (
    <React.Fragment>
      <MDBCol size="1">
        {/* BLANK */}
      </MDBCol>

      {/* BROWSE BUTTON */}
      <MDBCol size="4">

        {/* DIsplay Image */}
        <div className="col-12">
                <input
            type={props.image.type}
            className={props.image.className}
            id={props.image.submitBtnId}
            ref={imageSelectRef}
            aria-describedby="inputGroupFileAddon01"
            name={props.image.name}
            accept=".png, .jpeg, .jpg"
            // // 12/12:
            onChange={
              (event) => {
                props.selectImage(event, imageSelectRef, previewCanvasRef)
              }
            }
          />
          <label
            className="custom-file-label"
            id="img-select-label"
            htmlFor={props.image.submitBtnId}
          >
            {/* // CHANGE THE IMAGE NAME IN SELECTION HERE */}
            {props.image.imageName}
          </label>
        </div> 
      </MDBCol>
      {/* *******IMAGE PREVIEW CAVAS*********/}
      <MDBCol size="3">
        <div className="name-container">
          <div
            className="preview"
            ref={previewCanvasRef}>
            <h4>Image Preview</h4>
            <p id="file-msg">No file currently selected for upload</p>
          </div>
        </div>
      </MDBCol>
      {/* <MDBCol size="1">
         Tony 
        </MDBCol> */}
      {/* REQUIREMENTS */}
      {/* <MDBCol size="3">
        <h4>Requirements:</h4>
        <ol>
          <li><b>Filesize:</b> &#60; {imageMaxMB}MB</li>
          <li><b>Dimensions: </b></li>
          Min: {props.imageMin}, Max: {imageMax}
        </ol>
      </MDBCol> */}
{/* HERE */}
    </React.Fragment >
  )
  // }
}
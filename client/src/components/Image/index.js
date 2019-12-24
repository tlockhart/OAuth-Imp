import React from 'react';
// import { MDBBtn } from "mdbreact";
// import $ from 'jquery';
// import styles from './styles.css';

// export class Uploader extends Component {
export let Uploader = (props) => {
  let imageMaxMB = props.image.maxMB;
  let imageMax = props.image.imageMax;
  let image = props.image;

  // create ref
  let imageSelectRef = React.createRef();
  let previewCanvasRef  = React.createRef();
  let submitBtnRef = React.createRef();
  return (
    <React.Fragment>
      {/* <div className="container"> */}
        <div className="row">
          <div className="col-4">
            {/*************TEST ELEMENT******************/}
            {/* MDB REACT COMPONENT: BROWSE IMAGE BUTTON*/}
            <div className="custom-file">
              {/* DIsplay Image */}
              thumbnailImage
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
            {/********************************/}
            <div className="image-input-wrapper">
              {/* SELECT IMAGE (PNG,JPG) LABEL*/}
              <label
                className="upload-btn"
                id="select-btn"
                htmlFor="image-input">Select image (PNG, JPG)</label>
              <ol>
                <b>Requirements:</b> <br></br>
                <li><b>Filesize:</b> &#60; {imageMaxMB}MB</li>
                <li><b>Dimensions: </b></li>
                Min: {props.imageMin}, Max: {imageMax}
              </ol>
              {/* UPLOAD IMAGE BUTTON */}
              {/* <button
                className="btn btn-info"
                id="submit-image"
                ref={submitBtnRef}
                onClick={(event) => props.submitImageHandler(event, image, submitBtnRef)}
              >Upload Image</button> */}
            </div>
          </div> {/* <!--Column-4--> */}

          <div className="col-4">
            {/* *******IMAGE PREVIEW CAVAS*********/}
            <div className="name-container">
              <div
                className="preview"
                ref={previewCanvasRef}>
                <h4>Image Preview</h4>
                <p id="file-msg">No file currently selected for upload</p>
              </div>
            </div>
          </div>{/* <!--col-4> */}

        </div> {/* <!--row--> */}
      {/* </div> <!--container--> */}
    </React.Fragment>
  )
  // }
}
import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import $ from 'jquery';
import styles from './styles.css';
import { setFileMessage, removeItem, removeCanvas, checkImageDimensions, setFileSize, isFileSelected, imgOnError, getFileInfo, displayImage, loadImage, isFileTypeValid } from './utils/helpers';

export class Uploader extends Component {
  // render() {
  constructor(props) {
    super(props);

    // Destructuring
    console.log("ImageUploader", this.props);
    console.log("ImageUploader", props);

    // this.state = {image: this.props.image};
    /****************/
    this.state = { image: this.props.image };
    console.log("STATE", this.state.image);
  }

  setProp = (key, value) => {
    // copy current state
    var image = this.state.image;
    // update props
    image[key] = value;
    // PROBLEM
    /*******************/
    console.log("image: ", image);
    /*******************/
    // Update state with new value
    this.setState({ image: image });
    console.log("Key:", [key]);
    console.log("Value:", value);
    console.log(`Image ${key}:`, this.state.image[key]);
  };

  componentDidMount() {
    // disable submit-image button
    let submitImageElement = document.getElementById('submit-image');
    submitImageElement.disable = true;

    this.setProp("submitImageElement", submitImageElement);
    this.setProp("fileMsgElement", document.getElementById(this.errorTag));
    this.setProp("previewCanvasElement", document.querySelector('.preview'));

    console.log("ImageUploaderStateMounted", this.state.image.imageMin);

    // Why is the image props not prining?
    console.log("ImageUploaderState", this.state.image.fileTypes);
  }

  //  Select an image
  selectImage = async (event) => {
    event.preventDefault();

    //Handle image name display;
    /*******************************************/
    await this.props.productImageClickHandler(event, document.getElementById(this.state.image.submitBtnId));
    /*******************************************/

    // Set reference to #image-input div
    this.setProp("input", getFileInfo(this.state.image.submitBtnId));

    this.setProp("file", this.state.image.input.files[0]);

    var _URL = window.URL || window.webkitURL;
    let img;
    if (isFileSelected(this.state.image.input) && isFileTypeValid(this.state.image.file, this.state.image.fileTypes)) {
      var blob = this.state.image.input.files[0];
      img = new Image();
      try {
        const result = await loadImage(img, blob);
        console.log("RESULT", result);

        // Set variables
        img.src = result.imageSrc;
        // this.image.imageSrc = result.imageSrc;
        this.setProp("imageSrc", result.imageSrc);
        // this.image.imageWidth = result.imageWidth;
        this.setProp("imageWidth", result.imageWidth);
        // this.image.imageHeight = result.imageHeight;
        this.setProp("imageHeight", result.imageHeight);
        // this.image.imageSize = result.imageSize;
        this.setProp("imageSize", result.imageSize);
        // this.image.imageName = result.imageName;
        this.setProp("imageName", result.imageName);

        // remove OL tag
        removeItem('ol', this.state.image.previewCanvasElement);
        var areDimensionsValid = checkImageDimensions(this.state.image.imageWidth, this.state.image.imageMin, this.state.image.imageHeight, this.state.image.imageMax, this.state.image.submitImageElement);

        this.setProp("imageSize", setFileSize(areDimensionsValid, this.state.image.errorTag, this.state.image.acceptedMsg, this.state.image.unacceptedMsg, this.state.image.imageName, this.state.image.imageSize, this.state.image.input.files, this.state.image.previewCanvasElement, this.state.image.imageWidth, this.state.image.imageHeight));

        // Create Canvas and load image
        displayImage(img, areDimensionsValid, this.state.image.previewCanvasElement);
      }
      catch (err) {
        console.log("failure ", err);
        imgOnError(this.state.image.previewCanvasElement, this.state.image.imageWidth, this.state.image.imageMax, this.state.image.imageHeight, this.state.image.errorTag, this.state.image.invalidMsg)
      }
      console.log("IMAGE NAME", this.state.image.file);
    }// if
    else {
      removeCanvas(this.state.image.previewCanvasElement);
      setFileMessage(this.state.image.errorTag, this.state.image.unacceptedMsg);
    }
  };

  render() {
    let imageName = this.state.image.imageName;
    let imageMin = this.state.image.imageMin;
    let imageMaxMB = this.state.image.maxMB;
    let imageMax = this.state.image.imageMax;
    let image = this.state.image;
    // console.log("ImageUploaderStateRendering", this.image.imageMin);
    console.log("ImageUploaderStateRendering", imageMin);
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-4">
              {/*************TEST ELEMENT******************/}
              {/* MDB REACT COMPONENT: BROWSE IMAGE BUTTON*/}
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  name="this.props.image.imageName"
                  accept=".png, .jpeg, .jpg"
                  onChange={
                    (event) => {
                      this.selectImage(event)
                    }
                  }
                />
                <label
                  className="custom-file-label"
                  id="img-select-label"
                  htmlFor="inputGroupFile01">
                  {this.props.image.imageName}
                </label>
              </div>
              {/********************************/}
              <div className="image-input-wrapper">
                {/* SELECT IMAGE (PNG,JPG) LABEL*/}
                <label
                  // className="btn btn-info upload-btn"
                  className="upload-btn"
                  id="select-btn"
                  htmlFor="image-input">Select image (PNG, JPG)</label>
                <ol>
                  <b>Requirements:</b> <br></br>
                  <li><b>Filesize:</b> &#60; {imageMaxMB}MB</li>
                  <li><b>Dimensions: </b></li>
                  Min: {this.state.imageMin}, Max: {imageMax}
                </ol>
                {/* UPLOAD IMAGE BUTTON */}
                <button
                  className="btn btn-info"
                  id="submit-image"
                  type="submit"
                  onClick={(event) => this.props.submitImageHandler(event, image)}
                >Upload Image</button>
              </div>
            </div> {/* <!--Column-4--> */}

            <div className="col-4">
              {/* *******IMAGE PREVIEW CAVAS*********/}
              <div className="name-container">
                <div className="preview">
                  <h4>Image Preview</h4>
                  <p id="file-msg">No file currently selected for upload</p>
                </div>
              </div>
            </div>{/* <!--col-4> */}

          </div> {/* <!--row--> */}
        </div> {/* <!--container--> */}
      </React.Fragment>
    )
  }
}
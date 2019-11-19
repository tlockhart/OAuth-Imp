import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import $ from 'jquery';
import styles from './styles.css';
import { setFileMessage, removeItem, removeCanvas, checkImageDimensions, setFileSize, isFileSelected, imgOnError, getFileInfo, displayImage, loadImage, convertImageFromUrlToBase64String, isFileTypeValid } from './utils/helpers';

export class Uploader extends Component {
  // render() {
  constructor(props) {
    super(props);

    this.image = {
      input: null,
      file: null,
      canvasPreview: null,
      fileTypes: [
        'image/jpeg',
        'image/jpg',
        'image/png'
      ],
      imageName: '',
      imageWidth: 0,
      imageHeight: 0,
      imageSize: 0,
      imageSrc: '',
      imageMin: 200,
      imageMax: 450,
      maxMB: 2,
      errorTag: 'file-msg',
      invalidMsg: 'Not a valid file.',
      unacceptedMsg: 'File not accepted.',
      acceptedMsg: 'File accepted.',
    };

    // Destructuring
    let {
      input,
      file,
      canvasPreview,
      fileTypes,
      imageName,
      imageWidth,
      imageHeight,
      imageSize,
      imageSrc,
      imageMin,
      imageMax,
      maxMB,
      errorTag,
      invalidMsg,
      unacceptedMsg,
      acceptedMsg,
    } = this.image;

    // Destructuring
    this.input = input;
    this.file = file;
    this.preview = canvasPreview;
    this.fileTypes = fileTypes;

    this.imageName = imageName;
    // Image Dimensions
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imageSize = imageSize;
    this.imageSrc = imageSrc;

    // const image dimension size
    this.imageMin = imageMin;
    this.imageMax = imageMax;

    // const image file size
    this.maxMB = maxMB;

    this.errorTag = errorTag;
    this.invalidMsg = invalidMsg;
    this.unacceptedMsg = unacceptedMsg;
    this.acceptedMsg = acceptedMsg;

    $('#select-btn').on('click', function () {
      // select button isn't a button, its a label
      // event.preventDefault();
      $('#select-btn').hide();

    });

  }
  componentDidMount() {
    // disable submit-image button
    document.getElementById('submit-image').disabled = true
  }

  //  Select an image
  selectImage = async (event) => {
    event.preventDefault();

    // Set reference to #image-input div
    this.input = getFileInfo();
    this.file = this.input.files[0];

    var _URL = window.URL || window.webkitURL;
    let img;
    this.preview = document.querySelector('.preview');
    if (isFileSelected(this.input) && isFileTypeValid(this.file, this.fileTypes)) {
      var blob = this.input.files[0];
      img = new Image();
      try {
        const result = await loadImage(img, blob);
        console.log("RESULT", result);

        // Set variables
        img.src = result.imageSrc;
        this.imageSrc = result.imageSrc;
        this.imageWidth = result.imageWidth;
        this.imageHeight = result.imageHeight;
        this.imageSize = result.imageSize;
        this.imageName = result.imageName;

        // remove OL tag
        removeItem('ol', this.preview);
        var areDimensionsValid = checkImageDimensions(this.imageWidth, this.imageMin, this.imageHeight, this.imageMax);

        this.imageSize = setFileSize(areDimensionsValid, this.errorTag, this.acceptedMsg, this.unacceptedMsg, this.imageName, this.imageSize, this.input.files, this.preview, this.imageWidth, this.imageHeight);

        // Create Canvas and load image
        displayImage(img, areDimensionsValid, this.preview);
      }
      catch (err) {
        console.log("failure ", err);
        imgOnError(this.preview, this.imageWidth, this.imageMax, this.imageHeight, this.errorTag, this.invalidMsg)
      }
      console.log("IMAGE NAME", this.file);
    }// if
  };

  submitImageHandler = async (event) => {
    // if file selected
    if (isFileSelected(this.input)) {
      // Don't refresh the page!
      event.preventDefault();

      // checks image dimension and file size
      let isInputValid = false

      // Check Image Dimensions
      if (this.imageWidth >= this.imageMin && this.imageWidth <= this.imageMax && this.imageHeight >= this.imageMin && this.imageHeight <= this.imageMax) {
        isInputValid = true
      } else {
        isInputValid = false
      }

      // Check Image Size
      console.log("FileName:", this.imageName);
      console.log("FileSize:", this.imageSize);

      // Get Unit of Measure
      var unit = this.imageSize.slice(-2).toLowerCase();

      // Get FileSize
      var fileSizeNumber = this.imageSize.replace(/[^\d.-]/g, '');

      console.log("FILESIZE = " + fileSizeNumber + ", Unit = " + unit);
      console.log("Max File Size:", this.maxMB);

      if (unit === 'mb') {
        console.log("max file size:", this.maxMB, ", actual file size:", fileSizeNumber);
        if (fileSizeNumber <= this.maxMB) {
          isInputValid = true
        } else {
          isInputValid = false
        }
      }
      else if (unit === 'kb') {
        if (fileSizeNumber <= this.maxMB * 1000) {
          isInputValid = true
        } else {
          isInputValid = false
        }
      }

      // If input is not valid do not accept image and do nothing
      console.log("Is Input File Valid:", isInputValid);
      if (!isInputValid) {
        var fileMsg = document.getElementById(this.errorTag)
        if (fileMsg) {
          setFileMessage(this.errorTag, this.unacceptedMsg);
        } else {
          setFileMessage(this.errorTag, this.acceptedMsg);
        }

        // show select image:
        $('#select-btn').show()
      } else {
        // console.log ("Image is acceptable");
        var imageUrl = this.imageSrc;

        /******************************************************    Converts image to base64String
        ****************************************************/
       let base64StringImage = await convertImageFromUrlToBase64String(imageUrl);
       console.log("In the out");
       console.log("Converted Image: ", base64StringImage);
      }// else
      // remove canvas after submit
      removeCanvas(this.preview);
    } // if file selected

    // disable submit-btn
    document.getElementById('submit-image').disabled = true
  };// submit-Image on click

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="image-input-wrapper col-lg-4">
              {/* IMAGE INPUT LABEL */}
              <label
                className="btn btn-info upload-btn"
                id="select-btn"
                htmlFor="image-input">Select image (PNG, JPG)</label>
              <ol>
                <b>Requirements:</b> <br></br>
                <li><b>Filesize:</b> &#60; {this.maxMB}MB</li>
                <li><b>Dimensions: </b></li>
                Min: {this.imageMin}, Max: {this.imageMax}
              </ol>

              {/* THESE ARE THE BUTTONS */}
              {/* Choose file image-input Button */}
              <input
                type="file"
                id="image-input"
                name="image-input"
                accept=".png, .jpeg, .jpg"
                onChange={
                  (event) => {
                    this.selectImage(event)
                  }
                }
              />
              {/* UPLOAD IDENTITY BUTTON */}
              <button
                className="btn btn-info"

                // disabled="disabled"
                id="submit-image"
                type="submit"
                onClick={
                  this.submitImageHandler
                }
              >Upload Image</button>
            </div>

            {/* **************************Image Display */}
            <div className="col-lg-4 name-container kb-box">
              <div className="preview">
                <h4>Image Preview</h4>
                {/* <p id="error">No file currently selected for upload</p> */}
                <p id="file-msg">No file currently selected for upload</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
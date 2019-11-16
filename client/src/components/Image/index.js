import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import $ from 'jquery';
import styles from './styles.css';

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
        'image/pjpeg',
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
    this.unacceptedMsg =  unacceptedMsg;
    this.acceptedMsg =  acceptedMsg;

    $('#select-btn').on('click', function () {
      // select button isn't a button, its a label
      // event.preventDefault();
      $('#select-btn').hide();

    });

  }
  componentDidMount(){
    // disable submit-image button
    document.getElementById('submit-image').disabled = true
  }
  setImageParagraphTag(para, color){
    // Set Paragraph
    para = document.createTextNode('File Name: ' + this.imageName + ', File Size: ' + this.imageSize + ', Width: ' + this.imageWidth + ', Height: ' + this.imageHeight);

    let listItem = document.createElement('li');
    listItem.setAttribute('id', 'li-id');
    

    // listItem.appendChild(lnBreak);
    listItem.appendChild(para);

    let orderedList = document.createElement('ol');
    this.preview.appendChild(orderedList);

    orderedList.appendChild(listItem);
    $('#li-id').css({ 'color': color });
    // remove canvas if image added
    this.removeItem('canvas');
  }
    checkImageDimensions = () => {
    let areDimensionsValid = false;
    let para = document.createTextNode('');
    // let lnBreak = document.createElement('br');
    // let status = document.getElementById('error').innerHTML = '';
    
    // Insert lnBreak before paragraph:
    // listItem.insertBefore(lnBreak, para);

    // if dimensions valid
    if (this.imageWidth >= this.imageMin && this.imageWidth <= this.imageMax && this.imageHeight >= this.imageMin && this.imageHeight <= this.imageMax) {
      // console.log("IMAGE IS GOOD");
      document.getElementById('submit-image').disabled = false;
      this.setFileMessage(this.errorTag, this.acceptedMsg);
      areDimensionsValid = true;
    } 
    // dimensions not valid
    else {
      // $('#select-btn').show()
      
      areDimensionsValid = false;
    }
    if(areDimensionsValid) {
      // Set file size with Units:
      this.imageSize = this.getFormattedFileSize();
      this.setImageParagraphTag(para, 'black');
    }
    else
    {
      console.log("****DIMENSIONS NOT VALID****");
      document.getElementById('submit-image').disabled = true;

      // Set file size with Units:
      this.imageSize = this.getFormattedFileSize();
      this.setImageParagraphTag(para, 'red');
      // para = document.createTextNode(
      //   'File Name: ' + this.imageName,
      //   'File Size: ' + this.imageSize,
      //   'Width: ' + this.imageWidth,
      //   'Height: ' + this.imageHeight
      // );

      // $('#li-id').css({ 'color': 'red' });
      this.setFileMessage(this.errorTag, this.unacceptedMsg)
    }
    return areDimensionsValid;
  };

  imgOnError = () => {
    if (this.imageWidth <= this.imageMax && this.imageHeight <= this.imageMax) {
      console.log('NOT A Valid File: ');
      this.setFileMessage(this.errorTag, this.invalidMsg);
      document.getElementById('submit-image').disabled = true
      $('#select-btn').show()
      console.log("IMAGE ERROR ONLOAD")
    }
    // Remove Canvas and Paragraph for wrong dimensions or no file.
    this.removeCanvas();
    console.log("in imgONERROR")
  }; // oneerror

  // Returns formatted version of file size
  returnFileSize = (number) => {
    if (number < 1024) {
      return number + 'bytes'
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB'
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + 'MB'
    }
  }

  // Check whether the file type of the input file is valid
  isFileTypeValid = (file) => {
    console.log("FILE :", file);
    if (file) {
      for (var i = 0; i < this.fileTypes.length; i++) {
        if (file.type === this.fileTypes[i]) {
          // console.log("File Length = "+this.fileTypes.length, "FileTypes", this.fileTypes[i]);
          // console.log("File Length = " + this.fileTypes.length);
          return true
        }
      }
    }
    else
      return false
  }

  removeCanvas() {
    var canvasElement = this.preview.getElementsByTagName('canvas');
      if (canvasElement.length >= 1) {
      this.removeItem('canvas');
      this.removeItem('ol');
      }
  }

  getFileInfo = () => {
    this.input = document.querySelector('#image-input');
    console.log("getFileInfo: File Information", this.input.files[0]);
    this.file = this.input.files[0];
    console.log("FIle:", this.file);
  };

  appendImage(img, canvas) {
    img.onload = () => {
      console.log("APPEND_IMG:", img);
      console.log("APPEND_IMG Width:", img.width, "IMG HT:", img.height);

      // Set canvas dimension to match image
      canvas.width = img.width
      canvas.height = img.height
      var context = canvas.getContext('2d');

      // Draw image to canvas
      context.drawImage(img, 0, 0);
      this.preview.appendChild(canvas);
    }
  }
  displayImage = (img, areDimensionsValid) => {
    var canvasElement = this.preview.getElementsByTagName('canvas');
    var canvas = document.createElement('canvas');
    // console.log("CANVASELEMENT", canvasElement);
    if (!areDimensionsValid) {

    }
    // No Image added to canvas
    else if (canvasElement.length === 0) {
      this.appendImage(img, canvas)
    }
    // Image added to canvas
    else {
      this.removeItem('canvas');
      this.appendImage(img, canvas);
    }
  };

  loadImage = (img, blob) => {
    console.log("IMG", img, "BLOB", blob);
    return new Promise(function (resolve, reject) {
      // define source
      img.src = URL.createObjectURL(blob);
      // resolve promise onLoad
      img.onload = () => {
        console.log('LOADIMAGE_IMG.WIDTH', img.width);
        // this.imageWidth = img.width;
        console.log('LOADIMAGE_IMG.HEIGHT', img.height);
        // this.imageHeight = img.height;
        console.log('LOADIMAGE_BLOB.SIZE', blob.size);
        // this.imageSize = blob.size;
        console.log('LOADIMAGE_BLOB.Name', blob.name);
        console.log("IMAGE", img, "size", img.size);

        const imageProps = {
          imageName: blob.name,
          imageHeight: img.height,
          imageWidth: img.width,
          imageSize: blob.size,
          imageSrc: img.src
        }
        resolve(imageProps);
      }
      // reject promis onError
      img.onerror = () => {
        reject("rejected")
      }
    })
  }

  removeItem = (element) => {
    /************************/
    let item = this.preview.getElementsByTagName(`${element}`);
    const isItemCreated = item.length ? true : false;
    console.log("item Length", item.length);
    console.log("is item created", isItemCreated);
    console.log("no item", item);
    if (isItemCreated) {
      this.preview.removeChild(item[0]);
    }
    /************************/
  };

  //  Select an image
  selectImage = async (event) => {
    event.preventDefault();

    // Set reference to #image-input div
    this.getFileInfo();

    var _URL = window.URL || window.webkitURL;
    let img;
    this.preview = document.querySelector('.preview');
    if (this.isFileSelected()) {
      var blob = this.input.files[0];
      img = new Image();
      try {
        const result = await this.loadImage(img, blob);
        console.log("RESULT", result);

        // Set variables
        img.src = result.imageSrc;
        this.imageSrc = result.imageSrc;
        this.imageWidth = result.imageWidth;
        this.imageHeight = result.imageHeight;
        this.imageSize = result.imageSize;
        this.imageName = result.imageName;

        // remove OL tag
        this.removeItem('ol');
        var areDimensionsValid = this.checkImageDimensions();

        // Create Canvas and load image
        this.displayImage(img, areDimensionsValid);
      }
      catch (err) {
        console.log("failure ", err);
        this.imgOnError()
      }
      console.log("IMAGE NAME", this.file);
    }// if
  };

  setFileMessage = (tag, message) => {
    document.getElementById(tag).innerHTML = message; 
  }

  convertImageFromUrlToBase64String = (url) => {
    var img = new Image()
    img.crossOrigin = 'Anonymous'
    var dataUrl;
    img.onload = function () {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      // Get a canvas reference to draw to the canvas
      var context = canvas.getContext('2d')

      // Draw image to the canvas
      context.drawImage(img, 0, 0)

      // Return a data URI containing a representation of the image in jpg format
      dataUrl = canvas.toDataURL('image/jpg');
      console.log("convertImageFromUrlToBase64String-DataURL:", dataUrl);
    }

    // Setting the img.src will call img.onload when the src is loaded
    img.src = url// url is the img src
    // console.log("IMG:", img, "Name:", this.fileName);
    console.log("IMG:", img, "Name:", this.imageName);
    console.log("IMG SRC:", url);
    console.log("IMG SRC:", this.imageSrc);
    // console.log("BASE64:", dataUrl);

  }// convertImage

  getFormattedFileSize() {
    let curFiles = this.input.files;
      return this.returnFileSize(curFiles[0].size);
  }
  isFileSelected() {
    let curFiles = this.input? this.input.files: null;
    return curFiles;
  }
  submitImageHandler = (event) => {
    // if file selected
    if (this.isFileSelected()) {
      // Don't refresh the page!
      event.preventDefault();
      console.log("****submitImageclicked");
      // alert("submitImageClicked");
      // checks image dimension and file size
      let isInputValid = false

      // this.updateImageDisplay();
      // // Set file size with Units:
      // this.setFormattedFileSize();
      

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
          this.setFileMessage(this.errorTag, this.unacceptedMsg);
        } else {
          this.setFileMessage(this.errorTag, this.acceptedMsg);
        }

        // show select image:
        $('#select-btn').show()
      } else {
        // console.log ("Image is acceptable");
        var imageUrl = this.imageSrc;

        /******************************************************    Converts image to base64String
        ****************************************************/
        this.convertImageFromUrlToBase64String(imageUrl);
      }// else
      // remove canvas after submit
      this.removeCanvas();
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
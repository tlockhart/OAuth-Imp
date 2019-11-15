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
      imageMax: 800,
      maxKB: 2
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
      maxKB
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
    this.maxKB = maxKB;

    $('#select-btn').on('click', function () {
      // select button isn't a button, its a label
      // event.preventDefault();
      $('#select-btn').hide();

      // enable submit-image (Upload Image Button)
      $('#submit-image').prop('disabled', false);
    });
  }

  displayImageProps = () => {
    let lnBreak = document.createElement('br');
    let status = document.getElementById('error').innerHTML = '';
    // console.log(`status: ${status}`)
    let para = document.createTextNode('File Name: ' + this.imageName + ', File Size: ' + this.imageSize + ', Width: ' + this.imageWidth + ', Height: ' + this.imageHeight);

    let listItem = document.createElement('li');
    listItem.setAttribute('id', 'li-id');

    listItem.appendChild(lnBreak);
    listItem.appendChild(para);

    let orderedList = document.createElement('ol');
    this.preview.appendChild(orderedList);

    orderedList.appendChild(listItem);

    // Insert lnBreak before paragraph:
    listItem.insertBefore(lnBreak, para);
    if (this.imageWidth >= this.imageMin && this.imageWidth <= this.imageMax && this.imageHeight >= this.imageMin && this.imageHeight <= this.imageMax) {
      // console.log("IMAGE IS GOOD");
      document.getElementById('submit-image').disabled = false
    } else {
      para = document.createTextNode(
        'File Name: ' + this.imageName,
        'File Size: ' + this.imageSize,
        'Width: ' + this.imageWidth,
        'Height: ' + this.imageHeight
      )

      $('#select-btn').show()
      // document.getElementById('submit-image').disabled = true
      $('#li-id').css({ 'color': 'red' })
    }
    // console.log("in imgONLoad")
  };

  imgOnError = () => {
    if (this.imageWidth <= this.imageMax && this.imageHeight <= this.imageMax) {
      console.log('NOT A Valid File: ' + this.file.type);
      var error = document.createElement('p')
      var node = document.createTextNode('Not a valid file: ' + this.file.type)
      error.appendChild(node)
      this.preview.appendChild(error)
      // document.getElementById('submit-image').disabled = true
      $('#select-btn').show()
      console.log("IMAGE ERROR ONLOAD")
    }
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
    for (var i = 0; i < this.fileTypes.length; i++) {
      if (file.type === this.fileTypes[i]) {
        // console.log("File Length = "+this.fileTypes.length, "FileTypes", this.fileTypes[i]);
        console.log("File Length = " + this.fileTypes.length);
        return true
      }
    }
    return false
  }

  

  getFileInfo = () => {
    this.input = document.querySelector('#image-input');
    console.log("getFileInfo: File Information", this.input.files[0]);
    this.file = this.input.files[0];
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
  displayImage = (img) => {
    var canvasElement = this.preview.getElementsByTagName('canvas');
    var canvas = document.createElement('canvas');
    // console.log("CANVASELEMENT", canvasElement);
    if (canvasElement.length === 0) {
      this.appendImage(img, canvas)
    }
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
    var blob = this.input.files[0];
    if (blob) {
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

        this.removeItem('ol');
        this.displayImageProps();
        // console.log("PREVIEW", this.preview.getElementsByTagName("OL"));

        // Create Canvas and load image
        this.displayImage(img);
      }
      catch (err) {
        console.log("failure ", err);
        this.imgOnError()
      }
      console.log("IMAGE NAME", this.file);
    }// if
  };

  // Sets message of preview tag
  enableSubmitBtn = () => {
    var $ptag = $('.preview #file-msg').text()
    if ($ptag === 'File not accepted.') {
      // disable submit-btn
      // $('#submit-btn').prop('disabled', true)
      // console.log("Image not processed");
    }
  };

  returnFileSize = (number) => {
    if (number < 1024) {
      return number + 'bytes'
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB'
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + 'MB'
    }
  };

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

  setFormattedFileSize() {
    let curFiles = this.input.files;
    if (this.isFileTypeValid(curFiles[0])) {
      // this.fileName = curFiles[0].name;
      this.fileSize = this.returnFileSize(curFiles[0].size);
    }
  }
    submitImageHandler = (event) => {
    // Don't refresh the page!
    event.preventDefault();
    console.log("****submitImageclicked");
    // alert("submitImageClicked");
    // checks image dimension and file size
    let isInputValid = false

    // this.updateImageDisplay();
    // Set file size with Units:
    this.setFormattedFileSize();
    /***************************************
    *Disable Select Button, and Enable submit Button for Error Handling
    ****************************************/
    $('#select-btn').attr('disabled', 'disabled')

    // set preview message and enable submitBtn
    this.enableSubmitBtn()

    /***********************************************************************/

    // Check Image Dimensions
    if (this.imageWidth >= this.imageMin && this.imageWidth <= this.imageMax && this.imageHeight >= this.imageMin && this.imageHeight <= this.imageMax) {
      isInputValid = true
    } else {
      isInputValid = false
    }

    // Check File Size
    // console.log("FileName:", this.fileName);
    console.log("FileName:", this.imageName);
    console.log("SubmitImageHandler: FileSize =:", this.fileSize);
    // console.log("FileSize:", this.imageSize);

    // Get Unit of Measure
    var unit = this.fileSize.slice(-2).toLowerCase();
    // var unit = 'KB'

    // Get FileSize
    var fileSizeNumber = this.fileSize.replace(/[^\d.-]/g, '');

    console.log("FILESIZE = " + fileSizeNumber + "Unit = " + unit);
    console.log("Max File Size:", this.maxKB);

    if (unit === 'mb') {
      console.log("max file size:", this.maxKB, ", actual file size:", fileSizeNumber);
      if (fileSizeNumber <= this.maxKB) {
        isInputValid = true
      } else {
        isInputValid = false
      }
    }
    else if (unit === 'kb') {
      if (fileSizeNumber <= this.maxKB * 1000) {
        isInputValid = true
      } else {
        isInputValid = false
      }

    }

    // If input is not valid do not accept image and do nothing
    console.log("Is Input File Valid:", isInputValid);
    if (!isInputValid) {
      var fileMsg = document.getElementById('file-msg')
      if (fileMsg) {
        document.getElementById('file-msg').innerHTML = 'File not accepted.'
      } else {
        var error = document.createElement('p')
        error.setAttribute('id', 'file-msg')
        var node = document.createTextNode('File not accepted.')
        error.appendChild(node)
        this.preview.appendChild(error)
      }

      // document.getElementById('submit-btn').disabled = true

      // show select image:
      $('#select-btn').show()

      // disable submit-image (Upload Image Button)
      // $('#submit-image').prop('disabled', true)

      // Disable submit-btn button
      // $('#submit-btn').attr('disabled', 'disabled');
      // disable submit-btn
      // $('#submit-btn').prop('disabled', true);
      // document.getElementById('submit-btn').disabled = true
    } else {
      // console.log ("Image is acceptable");
      var imageUrl = this.imageSrc;
      /******************************************************    Converts image to base64String
      ****************************************************/
      this.convertImageFromUrlToBase64String(imageUrl);
    }// else
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
                <li><b>Filesize:</b> &#60; 2MB</li>
                <li><b>Dimensions: </b></li>
                Min: 200, Max: 800
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
                    // this.updateImageDisplay(event)
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
                  // this.submitMe
                  this.submitImageHandler
                }
              >Upload Image</button>
            </div>

            {/* **************************Image Display */}
            <div className="col-lg-4 name-container kb-box">
              <div className="preview">
                <h4>Image Preview</h4>
                <p id="error">No file currently selected for upload</p>
                <p id="file-msg"></p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
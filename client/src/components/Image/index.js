import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import $ from 'jquery';

export class Uploader extends Component {
  // render() {
  constructor(props) {
    super(props);
    // FacePlusPlus API:
    this.key = 'o5qW4trQcuO1e8ElIJEIDnecHNILHOSu';
    this.secret = 'i4yY2sL2dg8cOxpUYTN8AZ4pKMHGP2lV';

    this.input = null;

    // When there is a change on the input field call updateImageDisplay
    // this.input.addEventListener('change', this.updateImageDisplay);

    // this.preview = null;

    this.fileTypes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png'
    ];

    this.list = null;
    this.listItem = null;
    this.br = document.createElement('br');
    // var br = document.createElement('BR');
    this.para = document.createElement('p');
    this.preview = '';
    this.files = [];
    this.fileName = '';
    this.fileSize = 0;
    this.image = null;
    this.imageWidth = 0;
    this.imageHeight = 0;
    this.isInputValid = false
    this.faceToken = null

    // const
    this.imageMin = 200
    this.imageMax = 800
    this.maxKB = 2

    $('#select-btn').on('click', function () {
      // select button isn't a button, its a label
      // event.preventDefault();
      $('#select-btn').hide()

      // enable submit-image (Upload Image Button)
      $('#submit-image').prop('disabled', false)
    });
  }

  componentDidMount() {
    // this.input = document.querySelector('#image-input');
    // this.preview = document.querySelector('.preview');
  }

  imgOnLoad = () => {
    this.imageWidth = this.width
    this.imageHeight = this.height

    this.para = document.createTextNode('File Name: ' + this.fileName + ', File Size: ' + this.fileName + ', Width: ' + this.imageWidth + ', Height: ' + this.imageHeight);

    this.listItem = document.createElement('li');
    this.listItem.setAttribute('id', 'li-id');

    this.listItem.appendChild(this.br);
    this.listItem.appendChild(this.para);

    this.list = document.createElement('ol')
    this.preview.appendChild(this.list)

    this.list.appendChild(this.listItem);

    // Insert break before paragraph:
    this.listItem.insertBefore(this.br, this.para);
    if (this.imageWidth >= this.imageMin && this.imageWidth <= this.imageMax && this.imageHeight >= this.imageMin && this.imageHeight <= this.imageMax) { } else {
      this.para = document.createTextNode(
        'File Name: ' + this.fileName,
        'File Size: ' + this.fileName,
        'Width: ' + this.imageWidth,
        'Height: ' + this.imageHeight
      )

      $('#select-btn').show()
      // document.getElementById('submit-image').disabled = true
      $('#li-id').css({ 'color': 'red' })
    }
  };

  imgOnError = () => {
    // if ( imageWidth <= imageMax && imageHeight <= imageMax )
    // {
    // console.log('NOT A Valid File: '+file.type);
    var error = document.createElement('p')
    var node = document.createTextNode('Not a valid file: ' + this.file.type)
    error.appendChild(node)
    this.preview.appendChild(error)
    // document.getElementById('submit-image').disabled = true
    $('#select-btn').show()
    // }
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
      if (this.file.type === this.fileTypes[i]) {
        // console.log("File Length = "+fileTypes.length);
        return true
      }
    }

    return false
  }

  updateImageDisplay = () => {
    // event.preventDefault();

    // Set Dimensions
    // this.stageImage();
    // empty previous contents of .preview
    while (this.preview.firstChild) {
      this.preview.removeChild(this.preview.firstChild);
    }

    // Store the selected file into a variable called curFiles
    var curFiles = this.input.files;
    this.file = curFiles[0];

    // If no file was selected Output message to preview
    if (curFiles.length === 0) {
      this.para.textContent = 'No file currently selected for upload'
      this.preview.appendChild(this.para);
    } else {
      this.list = document.createElement('ol');
      this.preview.appendChild(this.list);
      for (var i = 0; i < curFiles.length; i++) {
        this.listItem = document.createElement('li');
        this.listItem.setAttribute('id', 'li-id');
        // Print the image name and file size if the file type matches the accepted types
        if (this.isFileTypeValid(curFiles[i])) {
          this.fileName = curFiles[i].name;
          this.fileSize = this.returnFileSize(curFiles[i].size);
          // console.log(curFiles[i]);
          this.image = document.createElement('img');
          this.image.setAttribute('id', 'image-id');
          this.image.src = window.URL.createObjectURL(curFiles[i]);
          this.image.style.width = '200px';
          this.listItem.appendChild(this.image);
          // document.getElementById('submit-image').disabled = false;
        } else {
          this.para.textContent = 'File name ' + curFiles[i].name + ': File type not valid. Please select an image.';
          this.listItem.appendChild(this.para);
          // document.getElementById('submit-image').disabled = true;
        }// else
      }// for
    }// else
    /******************************
     * DISPLAY SAME PICTURE
     * *****************************/
    curFiles = [];
    this.input.value = null;
    /******************************/
  };

  getFileInfo = () => {
    this.input = document.querySelector('#image-input');
    // this.preview = document.querySelector('.preview');
    console.log("getFileInfo: File Information", this.input.files[0]);
    this.file = this.input.files[0];
  };
  
  displayImage = (img) => {

    // img.crossOrigin = 'Anonymous'
    img.onload = () =>{
      var canvas = document.createElement('canvas')
      console.log("IMG:", img);
      console.log("IMG Width:", img.width, "IMG HT:", img.height);
      canvas.width = img.width
      canvas.height = img.height

      var context = canvas.getContext('2d');


      context.drawImage(img, 0, 0);
      this.preview = document.querySelector('.preview');
      this.preview.appendChild(canvas);
  }
};

stageImage = (event) => {
    event.preventDefault();
    this.getFileInfo();
    var _URL = window.URL || window.webkitURL;
    var img;
    // var file = this.input.files[0];
    // if ((file = this.files[0])) {
    img = new Image();
    // img.onload = this.imgOnLoad();
    // img.onError = this.imgOnError();
    img.src = URL.createObjectURL(this.file);
    
    // }// if
    console.log("IMAGE NAME", this.file);

    // Create Canvas and load image
    this.displayImage(img);
  };

  enableSubmitBtn = () => {
    var $ptag = $('.preview #file-msg').text()
    if ($ptag === 'File not accepted.') {
      // disable submit-btn
      $('#submit-btn').prop('disabled', true)
      // console.log("Image not processed");
    }
  };

  formComplete = () => {
    var isFormComplete =
      $('#name-input').val() &&
      $('#intel-value').text() &&
      $('#stren-value').text() &&
      $('#speed-value').text() &&
      $('#durab-value').text() &&
      $('#power-value').text() &&
      $('#combat-value').text() &&
      $('#face').text() === 'Identity processed!' &&
      $('#steps').text() === 'Your selections are locked in.'

    if (isFormComplete) {
      $('#submit-btn').show()
      $('#submit-btn').prop('disabled', false)
      $('#reset-btn').hide()
    }
  };

  analyzeFace = () => {
    var url = 'https://api-us.faceplusplus.com/facepp/v3/face/analyze'
    var queryParams = [
      'api_key=' + this.key,
      'api_secret=' + this.secret,
      'face_tokens=' + this.faceToken,
      'return_landmark=1',
      'return_attributes=gender,age,emotion,ethnicity,beauty,glass,skinstatus,facequality'
    ].join('&')
    var query = url + '?' + queryParams
    // console.log("The queryURL = "+query);
    $.ajax({
      url: query,
      method: 'POST'
    }).then(function (response) {
      // console.log(response);
      var faceAge = response.faces[0].attributes.age.value
      var faceGender = (response.faces[0].attributes.gender.value).toLowerCase()
      // var faceEthnicity = (response.faces[0].attributes.ethnicity.value).toLowerCase()
      // var faceBType = faceGender + '_score'
      // var faceBRequest = 'response.faces[0].attributes.beauty.' + faceBType
      // var faceBeauty = faceBRequest
      // var faceEmotions = response.faces[0].attributes.emotion

      // $faceMsg.text('');
      var $facePara = $('#face')
      if ($facePara.length === 0) {
        var $faceMsg = $('<p>')
        $faceMsg.attr('id', 'face')
        $faceMsg.text('Identity processed!')
        $faceMsg.attr('age', faceAge)
        $faceMsg.attr('gender', faceGender)
        $('.preview').append($faceMsg)

        // Enable submit button  when response from face++ received
        this.formComplete()

        // console.log("Image has been processed!"+"Gender = "+faceGender+" Age = "+faceAge);
      } else {
        $faceMsg.text('Image not processed!')
        // console.log("Image has been processed!"+"Gender = "+faceGender+" Age = "+faceAge);
        // console.log("face id is not null");
      }
    })
  };// analyzeFace

  /********************************************
   * Store Face_Token for data Analysis:
   * ******************************************/
  parseToken = (faceObj) => {
    this.faceToken = faceObj.faces[0].face_token
    // console.log(faceToken);

    // Call FaceAPI to Analyze data
    this.analyzeFace()
  }

  base64Callback = (base64Str) => {
    var cors = 'https://cors-anywhere.herokuapp.com/'
    var query = cors + 'https://api-us.faceplusplus.com/facepp/v3/detect'

    $.ajax({
      url: query,
      method: 'POST',
      data: {
        'api_key': this.key,
        'api_secret': this.secret,
        'image_base64': base64Str,
        'return_landmark': 1,
        'return_attributes': 'gender,age',
        // dataType: 'jsonp',
        // success: options.success,
        // error: options.error,
        timeout: 10 * 1000
      }
    }).then(function (response) {
      // Create CODE HERE to Log the queryURL
      // Create CODE HERE to log the resulting object
      this.parseToken(response)
    })
  };// convertImageFromUrlToBase64String

  returnFileSize = (number) => {
    if (number < 1024) {
      return number + 'bytes'
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + 'KB'
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + 'MB'
    }
  };
  
  convertImageFromUrlToBase64String = (url, callbackFn) => {
    var img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = function () {
      var canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height

      var context = canvas.getContext('2d')
      context.drawImage(img, 0, 0)
      var dataUrl = canvas.toDataURL('image/jpg');
      console.log("convertImageFromUrlToBase64String-DataURL:", dataUrl);
      var isCallBackAFunction = typeof callbackFn === 'function'
      console.log("isCallBackAFunction:", isCallBackAFunction);
      if (dataUrl && isCallBackAFunction) {
        // look for "data: image/png;base64,"
        // or look for "data: image/jpg;base64,"
        // or look for "data: image/jpeg;base64,"
        // The Call back function, passes it the dataURL (base64 image) as an argument
        callbackFn(dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''))
      }
    }
    img.src = url// url is the img src
  }// convertImage

  submitImageHandler = (event) => {
    // Don't refresh the page!
    event.preventDefault()

    // this.getFileInfo();
    this.updateImageDisplay();

    /*********************************************************************
    *Enablesubmit Button for Error Handling
    ***********************************************************************/
    $('#select-btn').attr('disabled', 'disabled')
    // $('#submit-image').prop('disabled', true)
    // face++ timer to give results time to return
    this.enableSubmitBtn()

    /***********************************************************************/

    // Check Image Dimensions
    if (this.imageWidth >= this.imageMin && this.imageWidth <= this.imageMax && this.imageHeight >= this.imageMin && this.imageHeight <= this.imageMax) {
      this.isInputValid = true
    } else {
      this.isInputValid = false
    }

    // Check File Size
    console.log("FileName:", this.fileName);
    console.log("FileSize:", this.fileSize);

    // Get Unit of Measure
    var unit = this.fileSize.slice(-2).toLowerCase();

    // Get FileSize
    var fileSizeNumber = this.fileSize.replace(/[^\d.-]/g, '');

    console.log("FILESIZE = " + fileSizeNumber + "Unit = " + unit);
    console.log("Max File Size:", this.maxKB);
    // console.log("File Information", this.input.files);

    if (unit === 'mb') {
      console.log("max file size:", this.maxKB, ", actual file size:", fileSizeNumber);
      if (fileSizeNumber <= this.maxKB) {
        this.isInputValid = true
      } else {
        this.isInputValid = false
      }
    }
    else if (unit === 'kb') {
      if (fileSizeNumber <= this.maxKB * 1000) {
        this.isInputValid = true
      } else {
        this.isInputValid = false
      }

    }

    // If input is not valid do not accept image and do nothing
    console.log("Is Input File Valid:", this.isInputValid);
    if (!this.isInputValid) {
      // console.log ("Image is not acceptable!");
      var fileMsg = document.getElementById('file-msg')
      // console.log ("IS FILEMSG CREATED = "+fileMsg);
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
      // console.log ("Image is acceptable, Sending to FacePlusPlus!");
      var imageUrl = this.image.src
      /*********************************************************
         *This is a call to the function above, it accepts the
         *base64Str from the callbackFn and sends it to Face++API:
         *It will take 10 sec depending on photo size
        ***********************************************************/
      this.convertImageFromUrlToBase64String(imageUrl, this.base64Callback);
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
                    this.stageImage(event)
                    // this.updateImageDisplay(event)
                  }
                }
              />
              {/* UPLOAD IDENTITY BUTTON */}
              <button
                class="btn btn-info"
                // disabled ="disabled" 
                id="submit-image"
                type="submit"
                onClick={
                  (event) => {
                    this.submitImageHandler(event)
                  }
                }
              >Upload Identity</button>
            </div>

            {/* **************************Image Display */}
            <div className="col-lg-4 name-container kb-box">
              <div className="preview">
                <h4>Image Preview</h4>
                <p id="error">No file currently selected for upload</p>
                <p id="file-msg">File accepted</p>
                {/* <!--p id="face"></p--> */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
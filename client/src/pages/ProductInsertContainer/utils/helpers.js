exports.setImageParagraphTag = (para, color, imageName, imageSize, imageWidth, imageHeight, previewCanvas) => {
  // Set Paragraph
  para = document.createTextNode('File Name: ' + imageName + ', File Size: ' + imageSize + ', Width: ' + imageWidth + ', Height: ' + imageHeight);

  let listItem = document.createElement('li');
  listItem.setAttribute('id', 'li-id');


  // listItem.appendChild(lnBreak);
  listItem.appendChild(para);

  let orderedList = document.createElement('ol');
  previewCanvas.appendChild(orderedList);

  orderedList.appendChild(listItem);

  listItem.style.color = color;
  // remove canvas if image added
  this.removeItem('canvas', previewCanvas);
};

exports.removeItem = (element, previewCanvas) => {
  /************************/
  if (previewCanvas) {
    let item = previewCanvas.getElementsByTagName(`${element}`);
    const isItemCreated = item.length ? true : false;
    console.log("item Length", item.length);
    console.log("is item created", isItemCreated);
    console.log("no item", item);
    if (isItemCreated) {
      previewCanvas.removeChild(item[0]);
    }
    /************************/
  }

};

exports.removeCanvas = (previewCanvas) => {
  if (previewCanvas) {
    var canvasElement = previewCanvas.getElementsByTagName('canvas');
    if (canvasElement.length >= 1) {
      this.removeItem('canvas', previewCanvas);
      this.removeItem('ol', previewCanvas);
    }
  }

};


exports.setFileMessage = (tag, message) => {
  const errorTag = document.getElementById(tag);
  if (errorTag) {
    document.getElementById(tag).innerHTML = message;
  }

};

exports.getFormattedFileSize = (files) => {
  let curFiles = files;
  return this.returnFileSize(curFiles[0].size);
};

/*Returns formatted version of file size*/
exports.returnFileSize = (number) => {
  if (number < 1024) {
    return number + 'bytes'
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB'
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + 'MB'
  }
};

exports.appendImage = (img, canvas, previewCanvas) => {
  img.onload = () => {
    // Set canvas dimension to match image
    canvas.width = img.width
    canvas.height = img.height
    var context = canvas.getContext('2d');

    // Draw image to canvas
    context.drawImage(img, 0, 0);
    previewCanvas.appendChild(canvas);
  };
};

exports.checkImageDimensions = (imageWidth, imageMin, imageHeight, imageMax, submitImageButton) => {
  let areDimensionsValid = false;
  // let para = document.createTextNode('');

  // if dimensions valid
  if (imageWidth >= imageMin && imageWidth <= imageMax && imageHeight >= imageMin && imageHeight <= imageMax) {
    // document.getElementById('submit-image').disabled = false;
    submitImageButton.disabled = false;
    areDimensionsValid = true;
  }
  // dimensions not valid
  else {
    areDimensionsValid = false;
  }
  return areDimensionsValid;
};

exports.setFileSize = (areDimensionsValid, errorTag, acceptedMsg, unacceptedMsg, imageName, imageSize, files, previewCanvas, imageWidth, imageHeight) => {
  let para = document.createTextNode('');
  if (areDimensionsValid) {
    // Set file size with Units:
    imageSize = this.getFormattedFileSize(files);
    // setImageParagraphTag(para, 'black');
    this.setImageParagraphTag(para, 'black', imageName, imageSize, imageWidth, imageHeight, previewCanvas);
    this.setFileMessage(errorTag, acceptedMsg);
  }
  else {
    console.log("****DIMENSIONS NOT VALID****");
    document.getElementById('submit-image').disabled = true;

    // Set file size with Units:
    imageSize = this.getFormattedFileSize(files);
    this.setImageParagraphTag(para, 'red', imageName, imageSize, imageWidth, imageHeight, previewCanvas);
    this.setFileMessage(errorTag, unacceptedMsg)
  }
  return imageSize;
};

exports.isFileSelected = (input) => {
  let curFiles = input ? input.files : null;
  return curFiles;
};

exports.imgOnError = (previewCanvas, imageWidth, imageMax, imageHeight, errorTag, invalidMsg) => {
  if (imageWidth <= imageMax && imageHeight <= imageMax) {
    console.log('NOT A Valid File: ');
    this.setFileMessage(errorTag, invalidMsg);
    document.getElementById('submit-image').disabled = true
    // $('#select-btn').show()
    console.log("IMAGE ERROR ONLOAD")
  }
  // Remove Canvas and Paragraph for wrong dimensions or no file.
  this.removeCanvas(previewCanvas);
  console.log("in imgONERROR")
}; // oneerror


exports.displayImage = (img, areDimensionsValid, previewCanvas) => {
  var canvasElement = previewCanvas.getElementsByTagName('canvas');
  var canvas = document.createElement('canvas');
  console.log("DISPLAYIMAGE CANVASELEMENT:", canvasElement);
  if (!areDimensionsValid) {

  }
  // No Image added to canvas
  else if (canvasElement.length === 0) {
    this.appendImage(img, canvas, previewCanvas)
  }
  // Image added to canvas
  else {
    this.removeItem('canvas', previewCanvas);
    this.appendImage(img, canvas, previewCanvas);
  }
};

exports.loadImage = (img, blob) => {
  console.log("IMG", img, "BLOB", blob);
  return new Promise(function (resolve, reject) {
    // define source
    img.src = URL.createObjectURL(blob);
    // resolve promise onLoad
    img.onload = () => {

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
};

/* Base64 Decoder: Remove the metadata
https://www.base64decode.net/base64-image-decoder */
exports.convertImageFromUrlToBase64String = async (url) => {
  var img = new Image()
  img.crossOrigin = 'Anonymous'
  var dataUrl;
  return new Promise(function (resolve, reject) {
    // Setting the img.src will call img.onload when the src is loaded

    // Pull Width/Height from URL and store in img objec
    img.src = url;// url is the img src

    img.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      console.log("IMGWIDTH:", img.width, "IMGHEIGHT:", img.height);

      // Get a canvas reference to draw to the canvas
      var context = canvas.getContext('2d');
      // Draw image to the canvas
      context.drawImage(img, 0, 0);
      // Return a data URI containing a representation of the image in jpg format
      dataUrl = canvas.toDataURL('image/jpg');
      resolve(dataUrl);
    };
    // reject promis onError
    img.onerror = () => {
      reject("rejected");
    };
  }); // promise
};// convertImage

// Check whether the file type of the input file is valid
exports.isFileTypeValid = (file, fileTypes) => {
  if (file) {
    console.log("FILEType :", file.type);
    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        // console.log("File Length = "+this.fileTypes.length, "FileTypes", this.fileTypes[i]);
        // console.log("File Length = " + this.fileTypes.length);
        return true;
      }
      // else
      //   return false;
    }
  }
  else
    return false;
};

// export {setImageParagraphTag, removeItem, removeCanvas, setFileMessage, getFormattedFileSize, appendImage, checkImageDimensions, setFileSize, isFileSelected, imgOnError, displayImage, 
//   loadImage, convertImageFromUrlToBase64String, isFileTypeValid, returnFileSize};
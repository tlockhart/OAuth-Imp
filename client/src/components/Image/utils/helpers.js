// exports.setImageParagraphTag = (para, color, imageName, imageSize, imageWidth, imageHeight, preview, removeItem)

exports.setImageParagraphTag = (para, color, imageName, imageSize, imageWidth, imageHeight, preview) => {
  // Set Paragraph
  para = document.createTextNode('File Name: ' + imageName + ', File Size: ' + imageSize + ', Width: ' + imageWidth + ', Height: ' + imageHeight);

  let listItem = document.createElement('li');
  listItem.setAttribute('id', 'li-id');


  // listItem.appendChild(lnBreak);
  listItem.appendChild(para);

  let orderedList = document.createElement('ol');
  preview.appendChild(orderedList);

  orderedList.appendChild(listItem);
  // $('#li-id').css({ 'color': color });
  document.getElementById('li-id').style.color = color;
  // remove canvas if image added
  this.removeItem('canvas', preview);
};

exports.removeItem = (element, preview) => {
  /************************/
  let item = preview.getElementsByTagName(`${element}`);
  const isItemCreated = item.length ? true : false;
  console.log("item Length", item.length);
  console.log("is item created", isItemCreated);
  console.log("no item", item);
  if (isItemCreated) {
    preview.removeChild(item[0]);
  }
  /************************/
};

exports.removeCanvas = (preview) => {
  var canvasElement = preview.getElementsByTagName('canvas');
  if (canvasElement.length >= 1) {
    this.removeItem('canvas', preview);
    this.removeItem('ol', preview);
  }
};

exports.setFileMessage = (tag, message) => {
  document.getElementById(tag).innerHTML = message;
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

exports.appendImage = (img, canvas, preview) => {
  img.onload = () => {
    // console.log("APPEND_IMG:", img);
    // console.log("APPEND_IMG Width:", img.width, "IMG HT:", img.height);

    // Set canvas dimension to match image
    canvas.width = img.width
    canvas.height = img.height
    var context = canvas.getContext('2d');

    // Draw image to canvas
    context.drawImage(img, 0, 0);
    preview.appendChild(canvas);
  };
};

exports.checkImageDimensions = (imageWidth, imageMin, imageHeight, imageMax) => {
  let areDimensionsValid = false;
  // let para = document.createTextNode('');

  // if dimensions valid
  if (imageWidth >= imageMin && imageWidth <= imageMax && imageHeight >= imageMin && imageHeight <= imageMax) {
    document.getElementById('submit-image').disabled = false;
    areDimensionsValid = true;
  }
  // dimensions not valid
  else {
    areDimensionsValid = false;
  }
  return areDimensionsValid;
};

exports.setFileSize = (areDimensionsValid, errorTag, acceptedMsg, unacceptedMsg, imageName, imageSize, files, preview, imageWidth, imageHeight) => {
  let para = document.createTextNode('');
  if (areDimensionsValid) {
    // Set file size with Units:
    imageSize = this.getFormattedFileSize(files);
    // setImageParagraphTag(para, 'black');
    this.setImageParagraphTag(para, 'black', imageName, imageSize, imageWidth, imageHeight, preview);
    this.setFileMessage(errorTag, acceptedMsg);
  }
  else {
    console.log("****DIMENSIONS NOT VALID****");
    document.getElementById('submit-image').disabled = true;

    // Set file size with Units:
    imageSize = this.getFormattedFileSize(files);
    this.setImageParagraphTag(para, 'red', imageName, imageSize, imageWidth, imageHeight, preview);
    this.setFileMessage(errorTag, unacceptedMsg)
  }
  return imageSize;
};

exports.isFileSelected = (input) => {
  let curFiles = input ? input.files : null;
  return curFiles;
};

exports.imgOnError = (preview, imageWidth, imageMax, imageHeight, errorTag, invalidMsg) => {
  if (imageWidth <= imageMax && imageHeight <= imageMax) {
    console.log('NOT A Valid File: ');
    this.setFileMessage(errorTag, invalidMsg);
    document.getElementById('submit-image').disabled = true
    // $('#select-btn').show()
    console.log("IMAGE ERROR ONLOAD")
  }
  // Remove Canvas and Paragraph for wrong dimensions or no file.
  this.removeCanvas(preview);
  console.log("in imgONERROR")
}; // oneerror

exports.getFileInfo = () => {
  let input = document.querySelector('#image-input');
  console.log("getFileInfo: File Information", input.files[0]);
  console.log("FIle:", this.file);
 return input.files[0];
};

exports.displayImage = (img, areDimensionsValid, preview) => {
  var canvasElement = preview.getElementsByTagName('canvas');
  var canvas = document.createElement('canvas');
  // console.log("CANVASELEMENT", canvasElement);
  if (!areDimensionsValid) {

  }
  // No Image added to canvas
  else if (canvasElement.length === 0) {
    this.appendImage(img, canvas, preview)
  }
  // Image added to canvas
  else {
    this.removeItem('canvas', preview);
    this.appendImage(img, canvas, preview);
  }
};
// Check whether the file type of the input file is valid
  // isFileTypeValid = (file) => {
  //   console.log("FILE :", file);
  //   if (file) {
  //     for (var i = 0; i < this.fileTypes.length; i++) {
  //       if (file.type === this.fileTypes[i]) {
  //         // console.log("File Length = "+this.fileTypes.length, "FileTypes", this.fileTypes[i]);
  //         // console.log("File Length = " + this.fileTypes.length);
  //         return true
  //       }
  //     }
  //   }
  //   else
  //     return false
  // }
import { setFileMessage, removeItem, removeCanvas, checkImageDimensions, setFileSize, isFileSelected, imgOnError, getFileInfo, displayImage, loadImage, convertImageFromUrlToBase64String, isFileTypeValid } from './imageHelpers';

// export let submitImageHandler = async (event) => {
//     // if file selected
//     if (isFileSelected(this.input)) {
//       console.log("ActionHelper file selected");
//       // Don't refresh the page!
//       event.preventDefault();

//       // checks image dimension and file size
//       let isInputValid = false

//       // Check Image Dimensions
//       if (this.imageWidth >= this.imageMin && this.imageWidth <= this.imageMax && this.imageHeight >= this.imageMin && this.imageHeight <= this.imageMax) {
//         isInputValid = true
//       } else {
//         isInputValid = false
//       }

//       // Check Image Size
//       console.log("FileName:", this.imageName);
//       console.log("FileSize:", this.imageSize);

//       // Get Unit of Measure
//       var unit = this.imageSize.slice(-2).toLowerCase();

//       // Get FileSize
//       var fileSizeNumber = this.imageSize.replace(/[^\d.-]/g, '');

//       console.log("FILESIZE = " + fileSizeNumber + ", Unit = " + unit);
//       console.log("Max File Size:", this.maxMB);

//       if (unit === 'mb') {
//         console.log("max file size:", this.maxMB, ", actual file size:", fileSizeNumber);
//         if (fileSizeNumber <= this.maxMB) {
//           isInputValid = true
//         } else {
//           isInputValid = false
//         }
//       }
//       else if (unit === 'kb') {
//         if (fileSizeNumber <= this.maxMB * 1000) {
//           isInputValid = true
//         } else {
//           isInputValid = false
//         }
//       }

//       // If input is not valid do not accept image and do nothing
//       console.log("Is Input File Valid:", isInputValid);
//       if (!isInputValid) {
//         if (this.fileMsgElement) {
//           setFileMessage(this.errorTag, this.unacceptedMsg);
//         } else {
//           setFileMessage(this.errorTag, this.acceptedMsg);
//         }

//         // show select image:
//         // $('#select-btn').show()
//       } else {
//         // console.log ("Image is acceptable");
//         var imageUrl = this.imageSrc;

//         /******************************************************    Converts image to base64String
//         ****************************************************/
//         let base64StringImage = await convertImageFromUrlToBase64String(imageUrl);
//         console.log("In the out");
//         console.log("Converted Image: ", base64StringImage);
//       }// else
//       // remove canvas after submit
//       removeCanvas(this.previewCanvasElement);
//     } // if file selected

//     console.log("ActionHelper file NOT selected");
//     // disable submit-btn
//     this.submitImageElement.disabled = true;
//   };// submit-Image on click
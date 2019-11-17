
// export let imageProperties = () => {
//     input = document.querySelector('#image-input');

//     var preview = document.querySelector('.preview');

//     // var error = document.querySelector('.error')
//     var fileTypes = [
//         'image/jpeg',
//         'image/pjpeg',
//         'image/png'
//     ];

//     input = document.querySelector('#image-input')
//     var preview = document.querySelector('.preview')
//     // var error = document.querySelector('.error')
//     var fileTypes = [
//         'image/jpeg',
//         'image/pjpeg',
//         'image/png'
//     ];
// };

   // let lnBreak = document.createElement('br');
    // let status = document.getElementById('error').innerHTML = '';

    // Insert lnBreak before paragraph:
    // listItem.insertBefore(lnBreak, para);

// export let setDimensions = (event) => {
//   event.preventDefault();
//     var _URL = window.URL || window.webkitURL;
//     var img;
//     var file;
//     if ((file = this.files[0])) {
//         img = new Image();
//         img.onload = imgOnLoad();
//         img.onError = imgOnError();
//         img.src = _URL.createObjectURL(file);
//     }// if
// };

// export let imgOnLoad = () => {
//     imageWidth = this.width
//     imageHeight = this.height

//     para = document.createTextNode('File Name: ' + fileName + ', File Size: ' + fileSize + ', Width: ' + imageWidth + ', Height: ' + imageHeight)
//     listItem.appendChild(br)
//     listItem.appendChild(para)
//     list.appendChild(listItem)

//     // Insert break before paragraph:
//     listItem.insertBefore(br, para)
//     if (imageWidth >= imageMin && imageWidth <= imageMax && imageHeight >= imageMin && imageHeight <= imageMax) { } else {
//         para = document.createTextNode(
//             'File Name: ' + fileName,
//             'File Size: ' + fileSize,
//             'Width: ' + imageWidth,
//             'Height: ' + imageHeight
//         )

//         $('#select-btn').show()
//         document.getElementById('submit-image').disabled = true
//         $('#li-id').css({ 'color': 'red' })
//     }
// };

// export let imgOnError =  () => {
//     // if ( imageWidth <= imageMax && imageHeight <= imageMax )
//     // {
//     // console.log('NOT A Valid File: '+file.type);
//     var error = document.createElement('p')
//     var node = document.createTextNode('Not a valid file: ' + file.type)
//     error.appendChild(node)
//     preview.appendChild(error)
//     document.getElementById('submit-image').disabled = true
//     $('#select-btn').show()
//     // }
//   }; // oneerror

// export let updateImageDisplay = () => {
//     // empty previous contents of .preview
//     while (preview.firstChild) {
//       preview.removeChild(preview.firstChild);
//     }

//     // Store the selected file into a variable called curFiles
//     var curFiles = input.files;

//     // If no file was selected Output message to preview
//     if (curFiles.length === 0) {
//       para.textContent = 'No file currently selected for upload'
//       preview.appendChild(para);
//     } else {
//       list = document.createElement('ol');
//       preview.appendChild(list);
//       for (var i = 0; i < curFiles.length; i++) {
//         listItem = document.createElement('li');
//         listItem.setAttribute('id', 'li-id');
//         // Print the image name and file size if the file type matches the accepted types
//         if (isFileTypeValid(curFiles[i])) {
//           fileName = curFiles[i].name;
//           fileSize = returnFileSize(curFiles[i].size);
//           // console.log(curFiles[i]);
//           image = document.createElement('img');
//           image.setAttribute('id', 'image-id');
//           image.src = window.URL.createObjectURL(curFiles[i]);
//           image.style.width = '200px';
//           listItem.appendChild(image);
//           document.getElementById('submit-image').disabled = false;
//         } else {
//           para.textContent = 'File name ' + curFiles[i].name + ': File type not valid. Please select an image.';
//           listItem.appendChild(para);
//           document.getElementById('submit-image').disabled = true;
//         }// else
//       }// for
//     }// else
//     /******************************
//      * DISPLAY SAME PICTURE
//      * *****************************/
//     curFiles = [];
//     input.value = null;
//     /******************************/
//   };
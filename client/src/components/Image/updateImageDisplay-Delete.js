// When there is a change on the input field call
updateImageDisplay = () => {


    // Store the selected file into a variable called curFiles
    var curFiles = this.input.files;
    console.log("FILES", this.file);
    // var curFiles = this.file;
    console.log("CURRENTFILES", curFiles[0]);
    // this.file = curFiles[0];

    let para = this.preview.getElementsByTagName('p');
    var photo = document.createElement('img');
    // If no file was selected Output message to preview
    console.log("curfiles", curFiles.length);
    if (curFiles.length === 0) {
      para.textContent = 'No file currently selected for upload'
      this.preview.appendChild(para);
    } else {
      var unOrderedList = document.createElement('ul');
      this.preview.appendChild(unOrderedList);
      var listItem = document.createElement('li');
      listItem.setAttribute('id', 'li-id');
      // Print the image name and file size if the file type matches the accepted types
      if (this.isFileTypeValid(curFiles[0])) {
        // this.fileName = curFiles[0].name;
        this.fileSize = this.returnFileSize(curFiles[0].size);
        // var photo = document.createElement('img');
        photo.setAttribute('id', 'image-id');
        photo.src = this.imageSrc;
        photo.style.width = this.imageWidth;
        listItem.appendChild(photo);
        // document.getElementById('submit-image').disabled = false;
        console.log("UpdateImageDisplay: Filesize =", this.fileSize, "SRC:", this.imageSrc);
      } else {
        para.textContent = 'File name ' + this.imageName + ': File type not valid. Please select an image.';
        listItem.appendChild(para);
        // document.getElementById('submit-image').disabled = true;

        console.log("IN ELSE");
      }// else
    }// else
    /******************************
     * DISPLAY SAME PICTURE
     * *****************************/
    curFiles = [];
    this.input.value = null;
    /******************************/
  };
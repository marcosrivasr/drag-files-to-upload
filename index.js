//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  dragToUploadForm = document.querySelector("#dragToUploadForm"),
  input = dropArea.querySelector("#inputFile");
let files; //this is a global variable and we'll use it inside multiple functions

dragToUploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (files) {
    e.submit();
  }
});
button.addEventListener("click", (e) => {
  input.click(); //if user click on the button then the input also clicked
});
input.addEventListener("change", function () {
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  files = this.files[0];
  dropArea.classList.add("active");
  showFile(files); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  files = event.dataTransfer.files;
  showFile(files); //calling function
  dropArea.classList.remove("active");
});

function showFile(files) {
  [...files].forEach((file) => {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) {
      //if user selected file is an image file
      let fileReader = new FileReader(); //creating new FileReader object
      fileReader.onload = () => {
        let fileURL = fileReader.result; //passing user file source in fileURL variable
        // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
        const image = document.createElement("img");
        image.src = fileURL;
        image.setAttribute("width", "50px");
        let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
        //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        document.querySelector("#preview").appendChild(image);
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("This is not an Image File!");
      dropArea.classList.remove("active");
      dragText.textContent = "Drag & Drop to Upload File";
    }
  });
}

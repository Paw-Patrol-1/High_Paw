
import React from "react"
import axios from "axios"


function ImageUpdate() {
        const preset_key = "";
        const [image, setImage] = useState();


function handleFile(event) {
    const selectedImages = event.target.files[0];
    const formData = new FormData()
    formData.append("file", selectedImages)
    formData.append("upload_preset", preset_key)
    axios.post(
          "https://api.cloudinary.com/v1_1/dhknz3izf/image/upload",
          formData)
        .then(response => setImage(response.data))
        .catch(error => console.log(error));
      }
    

  
  

  return (
    <>
      <div className="w">
        <input type = "file" name="image" onChange={handleFile}></input>
        <br></br>
        <img src={image} className="w-100 h-100"/>
      </div>
    </>
  )
}

export default ImageUpdate
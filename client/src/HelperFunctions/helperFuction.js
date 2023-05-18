import axios from "axios";

export const profileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "rmfpv4pk");
  let data = "";
  await axios
    .post("https://api.cloudinary.com/v1_1/dhknz3izf", formData)
    .then((response) => {
      data = response.data["secure_url"];
      return data;
    
    })
    .catch((error) => {
      console.log(error);
      return error;

    });
  return data;
};

export const updateProfile = async (id, address, name, email, city, age, breed, picture, userId) => {
  const token = await localStorage.getItem("token");

  try {
    const res = await axios.post(
      `https://high-paw-production.up.railway.app/profile//edit/${id}`,
      {
        data: {
          email: email,
          address: address,
          city: city,
          age: age,
          breed: breed,
          name: name,
          picture: picture,
        },
        userId,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
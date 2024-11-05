import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "freelance");
  try {
    // const res = await axios.post(VITE_UPLOAD_LINKimport.meta.env., data);
    const res = await axios.post("https://api.cloudinary.com/v1_1/daffafkag/upload", data);
    // CLOUDINARY_URL=cloudinary://584217626332661:o1M5mjKeMeaeakao0wf2T3guBnk@daffafkag

    const { url } = res.data;
    console.log(res)
    console.log("Image URL: ",url)
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;

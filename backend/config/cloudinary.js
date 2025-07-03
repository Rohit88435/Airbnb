import { v2 as cloudinay } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {
  // cloudinary configuraion
  cloudinay.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  try {
    if (!filePath) {
      return null;
    }
    // upload on cloudinary
    const uplaodResult = await cloudinay.uploader.upload(filePath);

    //delete file from disk storage
    fs.unlinkSync(filePath);

    // return with url
    return uplaodResult.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log(error);
  }
};

export default uploadOnCloudinary;

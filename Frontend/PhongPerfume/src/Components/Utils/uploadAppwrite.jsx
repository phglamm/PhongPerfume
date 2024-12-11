import { storage } from "../../Config/appwrite";

const uploadFile = async (file) => {
  try {
    // Replace 'bucketID' with the ID of your storage bucket in Appwrite
    const bucketID = "67520668000a08fcfa7b";

    // Upload the file to Appwrite storage
    const response = await storage.createFile(bucketID, "unique()", file);

    // Get the public URL of the uploaded file
    const fileID = response.$id;
    const downloadURL = storage.getFileView(bucketID, fileID);

    console.log(downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadFile;

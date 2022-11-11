import { getAuth } from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';


async function upLoadImageToFirestore(event) {
  try{
    let file = event.target.files[0];
    
    let filePath = `${getAuth().currentUser.uid}/${file.name}`;
    let newImageRef = ref(getStorage(), filePath);
    
    let fileSnapshot = await uploadBytesResumable(newImageRef, file);
    
    let publicImageUrl = await getDownloadURL(newImageRef);
    
    return { publicImageUrl, fileSnapshot }
  } catch (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
    throw(error);
  }
}
export default upLoadImageToFirestore;
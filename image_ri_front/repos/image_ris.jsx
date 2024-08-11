import axios from "axios";

const url = axios.create({
  baseURL: 'http://127.0.0.1:5000/'
});

export const searchImages = (requestImage) => {
  return url.post('upload', requestImage)
    .then((result) => {
      return result.data;
    }).catch((error) => {
      console.log(error.response);
    });
};

export const retrieveImages = (relativeIndex) => {
  return url.get(`get-image/${relativeIndex}`, { responseType: 'blob' })
    .then((result) => {
      console.log("retieving image: ", result);
      return result.data;
    }).catch((error) => {
      console.log(error.response);
    });
};
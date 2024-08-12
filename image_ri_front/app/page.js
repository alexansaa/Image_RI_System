'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSimilarImages, getImage } from '@/redux/image/imageSlice';

import NearestNeighborRow from './nearestNeighborRow';

import styles from '@/app/styles.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const { response, isLoading, error } = useSelector((store) => store.image);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    console.log("result data from searchImages: ", response);
  }, [response])

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    dispatch(getSimilarImages(formData));
  };

  const uploadPredefinedImage = async (filePath) => {
    try {
      // Fetch the image from a local path
      const response = await fetch(filePath); // Replace with your actual path
      const blob = await response.blob();

      // Convert the Blob into a File object
      const file = new File([blob], "predefined_image.jpg", { type: "image/jpeg" });

      // Set the selected image for preview
      setSelectedImage(URL.createObjectURL(file));

      // Prepare the FormData for upload
      const formData = new FormData();
      formData.append('file', file);

      // Dispatch the action to upload the image and get similar images
      dispatch(getSimilarImages(formData));

    } catch (error) {
      console.error("Error uploading predefined image:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src="/search_icon.png" alt="Google Logo" style={{ marginBottom: '50px' }} />
      <h2>Image Search App</h2>
      <p>You can try one of the test-set images, or upload ypur own!</p>

      {/* <button onClick={uploadPredefinedImage}>Upload Predefined Image</button> */}
      <button onClick={() => uploadPredefinedImage('/predefinedSearch/output_image.jpg')}>
        <img
          src='/predefinedSearch/output_image.jpg'
          alt="Motorcicle"
          style={{ height: '100px', borderRadius: '10px', cursor: 'pointer' }}
        />
      </button>
      <button onClick={() => uploadPredefinedImage('/predefinedSearch/output_image2.jpg')}>
        <img
          src='/predefinedSearch/output_image2.jpg'
          alt="Motorcicle"
          style={{ height: '100px', borderRadius: '10px', cursor: 'pointer' }}
        />
      </button>
      <button onClick={() => uploadPredefinedImage('/predefinedSearch/output_image3.jpg')}>
        <img
          src='/predefinedSearch/output_image3.jpg'
          alt="Motorcicle"
          style={{ height: '100px', borderRadius: '10px', cursor: 'pointer' }}
        />
      </button>


      <h4>Upload your image for searching</h4>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #dfe1e5', borderRadius: '24px', padding: '10px', width: '560px' }}>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ flex: 1, border: 'none', outline: 'none' }} />
          {selectedImage && (
            <img src={selectedImage} alt="Uploaded" style={{ height: '100px', borderRadius: '10px', marginLeft: '10px' }} />
          )}
        </div>
      </form>

      {response && (
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Distance</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {response.map((element, index) => {
                return <NearestNeighborRow key={index} neighbor={element} />
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}




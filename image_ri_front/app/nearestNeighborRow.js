import React, { useEffect, useState } from 'react';
import { retrieveImages } from '@/repos/image_ris.jsx';

const NearestNeighborRow = ({ neighbor }) => {
  const { Clase, Distancia, Indice } = neighbor;
  const [myImg, setMyImg] = useState();

  useEffect(() => {
    const retrieveImg = async () => {
      try {
        const result = await retrieveImages(Indice);

        const imageUrl = URL.createObjectURL(result);

        setMyImg(imageUrl);
      } catch (error) {
        console.error("Error retrieving image:", error);
      }
    }

    retrieveImg();
  }, [Indice]);

  if (!myImg) {
    return <tr><td colSpan="3">Loading...</td></tr>;
  }

  return (
    <tr>
      <td>{Clase.charAt(0).toUpperCase() + Clase.slice(1)}</td>
      <td>{Distancia.toFixed(2)}</td>
      <td><img src={myImg} alt={`${Clase} Image`} width="100" /></td>
    </tr>
  );
};

export default NearestNeighborRow;

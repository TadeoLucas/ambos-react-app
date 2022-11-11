import React, { useState, useEffect } from "react";
import axios from "axios";
import upLoadImageToFirestore from "../utils/upLoadImageToFirestore";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { REACT_APP_FIREBASE_KEY } = process.env;


function ProductLoading() {
  const Actualuser = useSelector(state => state.Actualuser);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [price, setPrice] = useState(); // valor q acepta la DB del 0 a 16777215
  const [size, setSize] = useState();
  const [description, setDescription] = useState();
  const [picture, setPicture] = useState();
  const [progress, setProgress] = useState(0);
  const [picture2, setPicture2] = useState('');
  const [progress2, setProgress2] = useState(0);
  const [path, setPath] = useState();
  const [path2, setPath2] = useState('');
  const [boton, setBoton] = useState(true);

  useEffect(() => {
    if (name && price && size && description && picture && path) {
      setBoton(false);
    } else {
      setBoton(true);
    }
  }, [name, price, size, description, picture, path]);

  async function handleChange(event) {
    try {
      event.preventDefault();
      let { publicImageUrl, fileSnapshot } = await upLoadImageToFirestore(event);
      setPicture(publicImageUrl);
      setPath(fileSnapshot.metadata.fullPath);
      setProgress(fileSnapshot.totalBytes / fileSnapshot.bytesTransferred * 100);
      return;
    } catch (error) {
        alert("no se pudo cargar el archivo, intentalo de nuevo");
    };
  }

  async function handleChange2(event) {
    try {
      event.preventDefault();
      let { publicImageUrl, fileSnapshot } = await upLoadImageToFirestore(event);
      setPicture2(publicImageUrl);
      setPath2(fileSnapshot.metadata.fullPath);
      setProgress2(fileSnapshot.totalBytes / fileSnapshot.bytesTransferred * 100); // 3 - show progres
      return;
    } catch (error) {
        alert("no se pudo cargar el archivo, intentalo de nuevo");
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setBoton(true)
    try {
      if (name && price && size && description && picture && path) {
        await axios.post('/api/products', { name, price, size, description, picture, path, picture2, path2 });
      }
      return navigate('/products');

    } catch (error) {
      alert('algo salio mal intentalo de nuevo')
    }
  }

  return (
    <>
      {Actualuser?.type === 'admin' || REACT_APP_FIREBASE_KEY ?
        <div className="bacgroundProductLoading">
          <form className="formProd">
              <label> Producto </label>
              <input
                type="text"
                value={name || ''}
                onChange={(e) => setName(e.target.value)}
              />
              <label> Precio: $ </label>
              <input
                type="number"
                value={price || ''}
                onChange={(e) => setPrice(e.target.value)}
              />
              <label> Talle </label>
              <input
                type="text"
                value={size || ''}
                onChange={(e) => setSize(e.target.value)}
              />
              <label> Descripcion </label>
              <input
                type="text"
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                name="image1"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleChange}
              />
              <input
                name="image2"
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleChange2}
              />

            <div className="prod_progres">
              <progress value={progress}></progress>
              <progress value={progress2}></progress>
            </div>
            <br />
            <div className="displayPhotos">
              <img width='280' src={picture} alt='' />
              <img width='280' src={picture2} alt='' />
            </div>
            <br />
            <button disabled={boton} onClick={handleSubmit} className='final_button' >{!boton ? 'Finalizar Carga' : 'Debes Completar los Campos'}</button>
          </form>
        </div>
        :
        <h1>Lo sentimos ocurrio un error</h1>
      }
    </>
  );
}

export default ProductLoading;
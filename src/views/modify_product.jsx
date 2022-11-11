import React from "react";
import axios from "axios";
import { getProducts } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const {REACT_APP_FIREBASE_KEY} = process.env;

function ModifyProduct() {
  const {Actualuser, products} = useSelector(state => state);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState();

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts());
  }, [])

  async function sendChanges(picture) {

    await axios.put('/api/products/modify', { name, price, size, description, picture });
    return;
  }

  return (
    <>
      {Actualuser?.type === 'admin' || REACT_APP_FIREBASE_KEY ?
      <div className="backgroundModifyProducts">
      <h2 className="warning">Deberas llenar todos los campos del producto a modificar</h2>
        {products.length > 0 ?
          products.map((data) => (
            <React.Fragment key={data.id}>
              <form className="formProd">
                <>
                  <label> Producto Actual: {data.name}</label>
                  <input
                    type="text"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                  />
                </>
                <>
                  <label> Precio Actual: ${data.price}</label>
                  <input
                    type="number"
                    value={price || ''}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </>
                <>
                  <label> Talle Actual: {data.size}</label>
                  <input
                    type="text"
                    list="browsers"
                    value={size || ''}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  <datalist id="browsers">
                    <option value="xS"/>
                    <option value="S"/>
                    <option value="M"/>
                    <option value="L"/>
                    <option value="XL"/>
                    <option value="XXL"/>
                  </datalist>
                </>
                <>
                  <label> Descripcion Actual: {data.description}</label>
                  <input
                    type="text"
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </>
                <div className="displayPhotos">
                  <img width='280' src={data.picture} alt='' ></img>
                </div>
                <br />
                <button className="final_button" onClick={ (e) => sendChanges(data.picture) }>MODIFICAR</button>
              </form>
              <br />
              <div className="linea" />
            </React.Fragment>
          )
          )
          :
          <h1>NO HAY PRODUCTOS ACTUALMENTE</h1>
        }
      </div>
      :
      <h1>Lo sentimos ocurrio un error</h1>
      }
    </>
  )
}

export default ModifyProduct;
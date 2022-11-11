import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions";
import { deleteImageOfStorage } from "../firebase";
import axios from "axios";
import "./talleForPay.css"

const { REACT_APP_FIREBASE_KEY } = process.env;

function RemoveProduct() {

  const ambos = useSelector(state => state.products);
  const Actualuser = useSelector(state => state.Actualuser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [])


  async function deleteProduct(data) {
    await Promise.all([
      deleteImageOfStorage(data.path),
      deleteImageOfStorage(data.path2),
      axios.delete(`/api/products/${data.id}`)
    ])
  }

  return (
    <>
      {Actualuser?.type === 'admin' || REACT_APP_FIREBASE_KEY ?
        <div className="removeProductBackground">
          {ambos.length > 0 ?
            ambos.map((data) => (
              <React.Fragment key={data.id}>
                <form className="formProd">
                  <div className="restartForms">
                    <div className="displayPhotos">
                      <img width='280' src={data.picture} alt='' ></img>
                    </div>
                    <div>
                      <h3>{data.name}</h3>
                      <h3>Precio: ${data.price}</h3>
                      <h3>Talle: {data.size}</h3>
                      <h3>{data.description}</h3>
                    </div>
                  </div>
                  <button className="final_button" onClick={() => { deleteProduct(data) }}>ELIMINAR!!</button>
                  <br />
                </form>
                <div className="linea" />
              </React.Fragment>
            )
            )
            :
            <h1>NO HAY PRODUCTOS ACTUALMENTE</h1>
          }
        </div>
        :
        <h1>Lo sentimos ocurrio un error</h1>}
    </>
  )
}

export default RemoveProduct;
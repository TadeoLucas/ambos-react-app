import axios from "axios";
import React, { useEffect } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductsAwaitingPay } from "../redux/actions";

const { REACT_APP_FIREBASE_KEY } = process.env;

function Pendings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restarts, Actualuser } = useSelector(state => state)

  useEffect(() => {
    dispatch(getProductsAwaitingPay());
  }, [dispatch])

  async function sendProduct(prod) {
    const { id, name, price, size, description, picture, path, picture2, path2 } = prod;
    try {
      await axios.post('/api/products', { name, price, size, description, picture, path, picture2, path2 });
      await axios.delete(`/api/saleshistory/${id}`);
      return navigate('/products');
    } catch (error) {
      alert('algo salio mal intentalo de nuevo')
    }
  }

  return (Actualuser?.type === 'admin' || REACT_APP_FIREBASE_KEY ?
    <div>
      {restarts.map((prod) => (<div key={prod.id}>
        <div className="restartForms">
          <img width='280' src={prod.picture} alt=''></img>
          <div>
            <h3 className='title'>{prod.name}</h3>
            <h3 className='title'>{prod.price}</h3>
            <h3 className='title'><Moment>{prod.createdAt}</Moment></h3>
          </div>
        </div>
        <br />
        <button className="final_button" onClick={() => sendProduct(prod)}>Reestablecer Producto</button>
        <br /><br />
        <div className="linea" />
      </div>))}
    </div>
    :
    <h1>Lo sentimos algo salio mal</h1>
  )
}

export default Pendings;
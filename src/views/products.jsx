import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions";
import wspImage from '../images/wsp.png';
import { paymentProductWithMP } from "../utils/paymentMP";


function Products() {
  const dispatch = useDispatch();
  const ambos = useSelector(state => state.products);
  const Actualuser = useSelector(state => state.Actualuser);
  const [boton, setBoton] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [])

  function modifyAndPay(data) {
    if(Actualuser?.type === 'bann'){return alert('Lo Sentimos Ocurrio un Error')}
    setBoton(true);
    paymentProductWithMP({
      id: data.id,
      title: data.name,
      price: data.price,
      quantity: 1,
      description: data.description,
      size: data.size,
      picture: data.picture,
      path: data.path,
      picture2: data.picture2,
      path2: data.path2
    });
  }

  return (
    <div className="products">
      {ambos.length > 0 ?
        ambos.map((data) => (
          <React.Fragment key={data.id}>
            <h3 className='title'>{data.name}</h3>
            <h3 className='title'>Talle: {data.size}</h3>
            <h3 className='title'>$ {data.price}</h3>
            <h3 className='title'>{data.description}</h3>
            <div className="displayPhotos">
              <img width='280' src={data.picture} alt='' ></img>
              <img width='280' src={data.picture2} alt=''></img>
            </div>
            <button className="final_button" disabled={boton} onClick={() => modifyAndPay(data)}>
              Comprar ahora!!
            </button>
            <br /><br />
            <div className="linea" />
          </React.Fragment>
        )
        ) :
        <div>
          <h1>EN ESTE MOMENTO NO TENEMOS AMBOS DISPONIBLES</h1>
          <div className="med" />
          <h1>Registrate y hacenos tu Encargo Personalizado o Comunicate por Wsp con un Vendedor: <a target="_blank" href='https://wa.me/543815565222'><img width='50px' src={wspImage} /></a></h1>
        </div>
      }
    </div>
  );
};

export default Products;


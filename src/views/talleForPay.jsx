import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { paymentWithMP } from "../utils/paymentMP";
import "./talleForPay.css";

const {REACT_APP_FIREBASE_KEY} = process.env;

function TalleForPay() {
  const {Actualuser, design, actual_price } = useSelector(state => state);
  const [talle, setTalle] = useState();
  const [precio, setPrecio] = useState();
  const [quantity, setQuantity] = useState(1);
  const [boton, setBoton] = useState(true);
  const suppliers = [
    { label: "talle: xS", value: "xS" },
    { label: "talle: S", value: "S" },
    { label: "talle: M", value: "M" },
    { label: "talle: L", value: "L" },
    { label: "talle: XL", value: "XL" },
  ];
  const suppliers2 = [
    { label: `Ambo Completo de acrocel: ${actual_price?.amboAcrocel}`, value: actual_price?.amboAcrocel },
    { label: `Chaqueta Sola de acrocel: ${actual_price?.chaquetaAcrocel}`, value: actual_price?.chaquetaAcrocel },
    { label: `Chaqueta Sola de Arciel: ${actual_price?.chaquetaARCIEL}`, value: actual_price?.chaquetaARCIEL },
    { label: `Ambo Completo de Arciel: ${actual_price?.amboARCIEL}`, value: actual_price?.amboARCIEL }
  ]


  useEffect(() => {
    if (talle && precio) {
      setBoton(false);
    } else {
      setBoton(true);
    }
  }, [talle, precio]);

  function validateQuantity(e) {
    if (e.target.value > 0 && e.target.value < 16) {
      setQuantity(e.target.value)
    } else {
      alert('el valor debe estar entre 1 y 15 incluidos')
      setQuantity(1)
    }
  }

  function selectedSize(e) {
    setTalle(e.value);
  }

  function selectedPrice(e) {
    setPrecio(e.value);
  }

  function payNow() {
    setBoton(true);
    paymentWithMP({
      title: design.pantalon ? 'Ambo Completo' : 'Chaqueta Sola',
      price: precio,
      quantity: quantity,
      description: design.pantalon ?
        `Chaqueta color: ${design.chaqueta} ${design.vivo ? `, con Detalles: ${design.vivo},` : 'liso,'} y Pantalon color: ${design.pantalon}`
        :
        `Chaqueta color: ${design.chaqueta} ${design.vivo ? `, con Detalles: ${design.vivo}` : 'liso'}.`,
    })
  }

  return (
    <div className="background-finalPayment">
      {Actualuser?.type !== 'bann' || REACT_APP_FIREBASE_KEY ?
        <div className="finalPayment">
          <div>
            <h3>chaqueta color: {design?.chaqueta}</h3>
            {design?.vivo ? <h3>detalles color: {design.vivo}</h3> : null}
            {design?.pantalon ? <h3>pantalon color: {design.pantalon}</h3> : null}
            <div className="containImage">
              <img src={design?.modelTop} />
              <img src={design?.modelBott} />
            </div>
            <br />
            <h3>En caso de no haber seleccionado color del pantalon se aplicara el mismo color de la chaqueta.</h3>
          </div>
          <div>
            <div>
              <h4>Talles</h4>
              <Select
                placeholder='Talles'
                options={suppliers}
                className='select'
                onChange={selectedSize}
                autoFocus
              />
              <h4>Precios</h4>
              <Select
                placeholder='Precios'
                options={suppliers2}
                className='select'
                onChange={selectedPrice}
              />
            </div>
            <br />
            {talle ? <h3>talle: {talle}</h3> : null}
            {precio ? <h3>valor: ${precio}</h3> : null}
            <div className="Quantity">
              <label> Cantidad: </label>
              <input
                type="number"
                min="1"
                max="15"
                value={quantity}
                onChange={(e) => validateQuantity(e)}
              />
            </div>
            <br />
            <button
              className="final_button"
              disabled={boton}
              onClick={payNow}
            >
              Comprar
            </button>
          </div>
        </div>
        :
        <h1>Lo sentimos algo salio mal</h1>
      }
    </div>
  );
}

export default TalleForPay;

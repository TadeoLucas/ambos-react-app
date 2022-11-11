import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './talleForPay.css';
import { useSelector } from "react-redux";

const { REACT_APP_FIREBASE_KEY } = process.env;

function SetPriceOrders() {
  const Actualuser = useSelector(state => state.Actualuser);
  const navigate = useNavigate();
  const [chaquetaAcrocel, setChaquetaAcrocel] = useState();
  const [amboAcrocel, setAmboAcrocel] = useState();
  const [chaquetaARCIEL, setChaquetaARCIEL] = useState();
  const [amboARCIEL, setAmboARCIEL] = useState();
  const [boton, setBoton] = useState(true);

  useEffect(() => {
    if (chaquetaAcrocel && amboAcrocel && chaquetaARCIEL && amboARCIEL) {
      setBoton(false);
    } else {
      setBoton(true);
    }
  }, [chaquetaAcrocel, amboAcrocel, chaquetaARCIEL, amboARCIEL]);

  async function send() {
    try {
      await axios.post('/api/price',
        {
          chaquetaAcrocel,
          amboAcrocel,
          chaquetaARCIEL,
          amboARCIEL
        }
      )
      return navigate('/talleForPay');

    } catch (error) {
      alert('algo salio mal')
    }
  }

  return (
    <>
      {Actualuser?.type === 'admin' || REACT_APP_FIREBASE_KEY ?
        <div className="setPriceOrder">
          <h1>setear precios</h1>
          <br />
          <form className="formProd">
            <label> Chaqueta acrocel </label>
            <input
              type="number"
              value={chaquetaAcrocel || ''}
              onChange={(e) => setChaquetaAcrocel(e.target.value)}
            />
            <br />
            <label> Ambo acrocel </label>
            <input
              type="number"
              value={amboAcrocel || ''}
              onChange={(e) => setAmboAcrocel(e.target.value)}
            />
            <br />
            <label> CHAQUETA DE ARCIEL </label>
            <input
              type="number"
              value={chaquetaARCIEL || ''}
              onChange={(e) => setChaquetaARCIEL(e.target.value)}
            />
            <br />
            <label> AMBO DE ARCIEL </label>
            <input
              type="number"
              value={amboARCIEL || ''}
              onChange={(e) => setAmboARCIEL(e.target.value)}
            />
            <br />
            <button className="final_button" disabled={boton} onClick={send}>Cargar/Enviar</button>
          </form>
        </div>
        :
        <h1>Lo sentimos ocurrio un error</h1>
      }
    </>
  )
}

export default SetPriceOrders;
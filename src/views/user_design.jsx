import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from 'better-react-carousel';
import Select from "react-select";

import wspImage from '../images/wsp.png';
import './CSSforAll.css';
import axios from "axios";
import { getActualPrice, SET_DESIGN } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const {REACT_APP_FIREBASE_KEY} = process.env;

const Clasico_top = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FClasico_top.jpeg?alt=media&token=eb7365f4-bedf-4ae5-84e7-e76b285b3586";
const Cruzado_top = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FCruzado_topp.jpg?alt=media&token=05ba40f1-161d-4846-a544-2121691b4ce2";
const OY_top = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FOY_top.jpeg?alt=media&token=5f6b650f-ae94-461a-bac2-cee10d34e767";
const OV_top = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FOV_top.jpeg?alt=media&token=bda71fbd-469f-4a28-a61e-67f400cd5dbc";
const Simple_top = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FV_simple_top.jpeg?alt=media&token=d4334ef2-d11f-417a-b643-07437c131de1";
const V_ancho_top = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FV_ancho_top.jpeg?alt=media&token=485f3324-0018-4757-82f3-13f41da15a6b";

const Bolsillo_Clasico = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FClasico.jpeg?alt=media&token=7be5cf0f-f50e-46ee-8f7c-dc29158d0eaf";
const Bolsillos_Cruzados = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FBolsillos_Cruzados.jpeg?alt=media&token=9940bfd6-db9d-418a-9f76-f84945621103";
const Canguro_partido = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FCanguro_partido.jpeg?alt=media&token=7ca95722-221a-4916-8e6f-b0318bc14580";
const Bolsillo_Ceja = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FCeja.jpeg?alt=media&token=8120e007-dd38-46c1-9bc6-3ac25397f526";
const Bolsillo_Soft = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FSoft.jpeg?alt=media&token=bebab4f3-6540-4d41-9fff-273b1ca37bbe";
const Bolsillos_laterales = "https://firebasestorage.googleapis.com/v0/b/ambostafi.appspot.com/o/models%2FBolsillos_laterales.jpeg?alt=media&token=be3a8ced-a7b4-4216-ab89-a1872880801d";


function UserDesign() {
  const Actualuser = useSelector(state => state.Actualuser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selector, setSelector] = useState('Chaqueta');
  const [chaqueta, setChaqueta] = useState();
  const [vivo, setVivo] = useState();
  const [pantalon, setPantalon] = useState();
  const [modelTop, setModelTop] = useState();
  const [modelBott, setModelBott] = useState();
  const suppliers = [
    { label: 'Chaqueta', value: 'Chaqueta' },
    { label: 'Vivo', value: 'Vivo' },
    { label: 'Pantalon', value: 'Pantalon' }
  ];
  const [boton, setBoton] = useState(true);
  const [botonSave, setBotonSave] = useState(true);

  useEffect(() => {
    if (chaqueta && modelTop && modelBott) {
      setBoton(false);
      setBotonSave(false);
    } else {
      setBoton(true);

    }
  }, [chaqueta, modelTop, modelBott]);

  function nextConfigForPay() {
    const payload = { chaqueta, vivo, pantalon, modelTop, modelBott };
    dispatch({ type: SET_DESIGN, payload: payload })
    dispatch(getActualPrice())// hay q ver si queda aqui medio raro!!!!!!!
    return navigate('/talleForPay')
  }

  async function saveToMyDesigns() {
    const clientId = localStorage.getItem('id');
    try {
      await axios.post('/api/design/', { chaqueta, vivo, pantalon, modelTop, modelBott, clientId })
      setBotonSave(true);
      return;

    } catch (error) {
      alert('algo salio mal')
    }
  }

  function selectCatgorie({ value }) {
    setSelector(value)
  }

  function select(value) {
    if (selector === 'Chaqueta') {
      return setChaqueta(value)
    }
    if (selector === 'Vivo') {
      return setVivo(value)
    }
    if (selector === 'Pantalon') {
      return setPantalon(value)
    }
  }

  function selectModelTop(e, model) {
    e.preventDefault();
    setModelTop(model);
  }

  function selectModelBott(e, model0) {
    e.preventDefault();
    setModelBott(model0);
  }

  return (
    <>
      {Actualuser?.type !== 'bann' || REACT_APP_FIREBASE_KEY ?
        <div className="container">
          <h5 className="title">Personaliza tu Encargo</h5>
          <div className="rows">
            <div className="carrusel">
              <Carousel cols={1} rows={1} mobileBreakpoint={100} loop>
                <Carousel.Item>
                  <button onClick={(e) => selectModelTop(e, Clasico_top)}><img src={Clasico_top} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelTop(e, Cruzado_top)}><img src={Cruzado_top} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelTop(e, OY_top)}><img src={OY_top} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelTop(e, OV_top)}><img src={OV_top} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelTop(e, Simple_top)}><img src={Simple_top} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelTop(e, V_ancho_top)}><img src={V_ancho_top} /></button>
                </Carousel.Item>
              </Carousel>
              <Carousel cols={1} rows={1} mobileBreakpoint={100} loop>
                <Carousel.Item>
                  <button onClick={(e) => selectModelBott(e, Bolsillo_Clasico)}><img src={Bolsillo_Clasico} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelBott(e, Bolsillos_Cruzados)}><img src={Bolsillos_Cruzados} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelBott(e, Canguro_partido)}><img src={Canguro_partido} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelBott(e, Bolsillo_Ceja)}><img src={Bolsillo_Ceja} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelBott(e, Bolsillo_Soft)}><img src={Bolsillo_Soft} /></button>
                </Carousel.Item>
                <Carousel.Item>
                  <button onClick={(e) => selectModelBott(e, Bolsillos_laterales)}><img src={Bolsillos_laterales} /></button>
                </Carousel.Item>
              </Carousel>
              {modelTop && modelBott ?
                null
                :
                <h3 className='title'>selecciona el modelo con un click sobre la foto superior e inferior</h3>
              }
            </div>
            <div>
              <div className="check">
                <div>
                  <Select
                    options={suppliers}
                    onChange={selectCatgorie}
                    className='select'
                    autoFocus
                  />
                </div>
              </div>
              {pantalon ?
                <div >
                  <a>color de chaqueta: <h3>{chaqueta}</h3></a><a>color de vivo: <h3>{vivo}</h3></a><a>color de pantalon: <h3>{pantalon}</h3></a>
                </div>
                :
                <div className="showmodel">
                  <a>color de chaqueta: <h3>{chaqueta}</h3></a><a>color de vivo: <h3>{vivo}</h3></a>
                </div>
              }
              <table>
                <tbody>
                  <tr>
                    <th>
                      <button onClick={() => select('Azul Marino')} style={{ backgroundColor: "#003399" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Marron')} style={{ backgroundColor: "#784212" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Negro')} style={{ backgroundColor: "black" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Gris Topo')} style={{ backgroundColor: "grey" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Azul Francia')} style={{ backgroundColor: "#00f" }}></button>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <button onClick={() => select('Fucsia')} style={{ backgroundColor: "rgb(237, 38, 184)" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Verde Malva')} style={{ backgroundColor: "darkseagreen" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Salmon')} style={{ backgroundColor: "rgba(255, 118, 127, 0.857)" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Celeste')} style={{ backgroundColor: "#B3E5FC" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Petroleo')} style={{ backgroundColor: "#006064" }}></button>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <button onClick={() => select('Turquesa')} style={{ backgroundColor: "rgb(2, 231, 235)" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Gris Claro')} style={{ backgroundColor: "silver" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Blanco')} style={{ backgroundColor: "white" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Bordo')} style={{ backgroundColor: "rgb(126, 16, 49)" }}></button>
                    </th>
                    <th>
                      <button onClick={() => select('Rosa')} style={{ backgroundColor: "rgb(253, 175, 200)" }}></button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {
            chaqueta ?
              <div className="final_model">
                <img src={modelTop} />
                <img src={modelBott} />
                {pantalon ?
                  <h4>Vas a encargar un Ambo color: {chaqueta}{vivo ? `. Con Detalles en Color: ${vivo}` : ' liso'}. y Pantalon Color: {pantalon}.</h4>
                  :
                  <h4>Vas a encargar una Chaqueta color: {chaqueta}{vivo ? `. Con Detalles en Color: ${vivo}` : ' liso'}.</h4>
                }
                <button className="final_button" disabled={boton} onClick={nextConfigForPay}>Ver Talles</button>
                <button className="final_button" disabled={botonSave} onClick={saveToMyDesigns}>Guardar en Mis Diseños</button>
              </div>
              :
              <h1>comunicate con un vendedor: <a target="_blank" href='https://wa.me/543815565222'><img width='50px' src={wspImage} /></a></h1>
          }
        </div>
        :
        <h1>ocurrio un error, inicia sesion de nuevo</h1>
      }
    </>
  )
}

export default UserDesign;
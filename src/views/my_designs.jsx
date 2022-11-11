import React, { useEffect } from "react";
import { getActualPrice, getDesigns, SET_DESIGN } from "../redux/actions"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const {REACT_APP_FIREBASE_KEY} = process.env;

function MyDesigns() {
  const {Actualuser, user_designs} = useSelector(state => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId = localStorage.getItem('id');
 

  useEffect(() => {
    dispatch(getDesigns(clientId));
  }, [clientId, dispatch])

  function nextConfigForPay(design) {
    const { chaqueta, vivo, pantalon, modelTop, modelBott } = design;
    const payload = { chaqueta, vivo, pantalon, modelTop, modelBott };
    dispatch({type: SET_DESIGN, payload: payload})
    dispatch(getActualPrice())// hay q ver si queda aqui medio raro!!!!!!!
    return navigate('/talleForPay')
  }

  return (
    <div className="background-finalPayment">
      {Actualuser?.type !== 'bann' || REACT_APP_FIREBASE_KEY ? 
      <div>
        <h4>Mis Diseños</h4>
        {user_designs ?
          user_designs.map(design => 
            <div className="final_model" key={design.id}>
                <img src={design.modelTop}/>
                <img src={design.modelBott} />
                <h4>Ambo color: {design.chaqueta}{design.vivo ? `. Con Detalles en Color: ${design.vivo}` : ' liso'}. {design.pantalon ? `y Pantalon Color: ${design.pantalon}.` : null}</h4>
                <button className="final_button" onClick={() => nextConfigForPay(design)}>
                  Comprar de Nuevo
                </button>
                <div className="linea" />
            </div> 
            
          )
          :
          <h3>Aún no Tienes Diseños</h3>
        }
      </div>
      :
      <h3>Algo salio mal, inicia sesion para acceder.</h3>
      }
    </div>
  )
}

export default MyDesigns;






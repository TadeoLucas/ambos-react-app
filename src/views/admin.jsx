import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const { REACT_APP_FIREBASE_KEY } = process.env;

function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const Actualuser = useSelector(state => state.Actualuser);
  const [userSelected, setUserSelected] = useState();
  const [lisT, setLisT] = useState();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => { }, [users, lisT])

  function selector(user) {
    setUserSelected(user);
  }

  async function doBann(userSelectedtoModify) {
    const { localId, displayName, email, photoUrl } = userSelectedtoModify;
    let type = "bann";
    try {
      if (localId !== REACT_APP_FIREBASE_KEY) {
        await axios.put(`/api/user/${localId}`, { localId, displayName, email, photoUrl, type });
        alert('Se Modifico Con Exito!!');
      }
      return navigate("/")

    } catch (error) {
      alert('algo salio mal intentalo de nuevo')
    }
  }

  async function doAdmin(userSelectedtoModify) {
    const { localId, displayName, email, photoUrl } = userSelectedtoModify;
    let type = "admin";
    try {
      if (localId !== REACT_APP_FIREBASE_KEY) {
        await axios.put(`/api/user/${localId}`, { localId, displayName, email, photoUrl, type });
        alert('Se Modifico Con Exito!!');
      }
      return navigate("/")

    } catch (error) {
      alert('algo salio mal intentalo de nuevo')
    }
  }

  async function doGuest(userSelectedtoModify) {
    const { localId, displayName, email, photoUrl } = userSelectedtoModify;
    let type = "guest";
    try {
      if (localId !== REACT_APP_FIREBASE_KEY) {
        await axios.put(`/api/user/${localId}`, { localId, displayName, email, photoUrl, type });
        alert('Se Modifico Con Exito!!');
      }
      return navigate("/")

    } catch (error) {
      alert('algo salio mal intentalo de nuevo')
    }
  }
  // ----------------------AutoComplete--------------------//
  function onKeyUp(e) {
    e.preventDefault();
    let inputValue = e.target.value;

    if (inputValue.length > 2) {
      let find = users.filter((user) => user.displayName.includes(inputValue))
      setLisT(find.map((user) => user.displayName));
      return;

    } else {
      setLisT(undefined);
    }
  }

  function modifyToSet(user) {
    let toSelected = users.find((obj) => obj.displayName === user);
    return selector(toSelected);
  }

  return (
    <div className="adminCountain">
      {Actualuser?.type === 'admin' || REACT_APP_FIREBASE_KEY ?
        <>
          <div>
            {users ?
              <div>
                <button onKeyUp={onKeyUp} autoFocus >
                  <input type='text' placeholder='Busqueda por Nombre' id='autocomplete' />
                </button>
                <div className="autocomplete-results">
                  <ul>
                    {
                      lisT ?
                        lisT.map((user) => (
                          <button onClick={() => modifyToSet(user)} key={user}>{user}</button>
                        ))
                        : null
                    }
                  </ul>
                </div>
                {users.map((user) => (
                  <ul key={user.localId}>
                    <>{user.displayName}</>
                    <br />
                    <>{user.email}</>
                    <br />
                    <>{user.localId}</>
                    <br />
                    <>{user.type}</>
                    <br />
                    <button onClick={() => selector(user)}>Seleccionar</button>
                  </ul>))
                }
              </div>
              :
              <>No Hay Usuarios :( </>
            }
          </div>
          <div>
            {userSelected ?
              <div>
                <div className="userSelected_Admin">
                  <h5>Usuario Seleccionado:</h5>
                  <>{userSelected.displayName}</>
                  <br />
                  <>{userSelected.email}</>
                  <br />
                  <>{userSelected.localId}</>
                  <br />
                  <>{userSelected.type}</>
                </div>
                <div>
                  <button onClick={() => doBann(userSelected)}>bloquear usuario</button>
                  <button onClick={() => doAdmin(userSelected)}>hacer administrador</button>
                  <button onClick={() => doGuest(userSelected)}>quitar administracion</button>
                </div>
              </div>
              :
              <div>
                <h3>Selecciona un Usuario para modificar</h3>
                <h6>Luego Regres Para Continuar Con El Proceso.</h6>
              </div>
            }
          </div>
        </>
        :
        <h1>Lo sentimos ocurrio un error</h1>
      }
    </div>
  )
}

export default Admin;
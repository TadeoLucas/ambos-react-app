import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActualUser, clearUser } from "../redux/actions";

const {REACT_APP_FIREBASE_KEY} = process.env;


function Nav() {
  const user = useSelector(state => state.Actualuser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signOutUser() {
    dispatch(clearUser());
    localStorage.clear();
    return navigate('/');
  }
  
  function initAuth(){
    dispatch(setActualUser());
    setTimeout(signOutUser, 2400000);
  }

  return (
  <>
    {user?.type !== 'bann' ?
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top1">
        <div className="myfluid-container">
          <Link className="navbar-brand nav-butt" to="/products">Ambos Disponibles</Link>
          {
          localStorage.getItem('id') ?
          <>
            <button onClick={ signOutUser } className="my-button-nav-brand">cerrar sesion</button>
            <button className="navbar-toggler my-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
          </>
            : 
            <button onClick={ initAuth } className="my-button-nav-brand">iniciar sesion con google</button>
          }
          <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">other functions</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  {
                  localStorage.getItem('id') === REACT_APP_FIREBASE_KEY || user?.type === 'admin' ? 
                  <div className="my-list-nav-place">
                    <Link to="/see/sales/pending"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Pagos Pendientes/Restaurar Producto</button></Link>
                    <Link to="/product_loading"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Cargar Producto</button></Link>
                    <Link to="/remove_product"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Eliminar Producto</button></Link>
                    <Link to="/admin/set/price"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Actualizar PRECIOS</button></Link>
                    <Link to="/modify_product"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Modificar Producto</button></Link>
                    <Link to="/shopping/design/user"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Mis Diseños</button></Link>
                    <Link to="/admin/users/modifyca/state/type"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Bloquear/Hacer Administrador</button></Link>
                  </div>
                  : 
                  <>
                    <Link to="/user/design/factory"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Personalizar Encargo</button></Link>
                    <Link to="/shopping/design/user"><button className="my-button-nav-brand" data-bs-dismiss="offcanvas">Mis Diseños</button></Link>
                  </>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <section>
        <Outlet></Outlet>
      </section>
    </div>
    :
    <h1>Lo sentimos ocurrio un error</h1>}
  </>
  );
};

export default Nav;


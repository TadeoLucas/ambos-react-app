import { Route, Routes} from "react-router-dom";

import Nav from "./utils/Nav";
import UserDesign from "./views/user_design";
import ProductLoading from "./views/product_loading";
import Products from "./views/products";
import MyDesigns from './views/my_designs';
import RemoveProduct from './views/remove_product';
import ModifyProduct from './views/modify_product';
import Carrusel from './utils/Carousel';
import Admin from './views/admin';
import SetPriceOrders from './views/set_price_orders';
import TalleForPay from './views/talleForPay';
import Pendings from './views/pendingsOfPay';

function App() {
  return (
    <div className='app'>
      <>
        <Routes>
          <Route path="/" element={<Nav />} >
            <Route exact path='/' element={<Carrusel />}/>
            <Route path="/user/design/factory" element={<UserDesign />} />
            <Route path="/talleForPay" element={<TalleForPay />}/>
            <Route path="/shopping/design/user" element={<MyDesigns />} />
            <Route path="/product_loading" element={<ProductLoading />} />
            <Route path="/products" element={<Products />} />
            <Route path="/remove_product" element={<RemoveProduct />} />
            <Route path="/modify_product" element={<ModifyProduct />} />
            <Route path="/admin/users/modifyca/state/type" element={<Admin />} />
            <Route path="/admin/set/price" element={<SetPriceOrders />} />
            <Route path='/see/sales/pending' element={<Pendings />} />
          </Route>
        </Routes>
      </>
    </div>
  );
}

export default App;

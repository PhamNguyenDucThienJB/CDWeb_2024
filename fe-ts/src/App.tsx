
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import FormInformation from './pages/Register/FormInFor'
import PageRegister from './pages/Register/PageRegister'
import FormTypeEmail from './pages/Register/FormTypeEmail'
import PageForgetPass from './pages/ForgetPass/PageForget'
import FormTypeEmailOfPass from './pages/ForgetPass/FormTypePass'
import OTP from './pages/ForgetPass/OTP'
import PageCart from './pages/PageCart/PageCart'
import PageProfile from './pages/Profile/PageProfile'
import PageChangePassword from './pages/Profile/PageChangePass'
import HistoryOrder from './pages/Profile/HistoryOrder'
import Home from './pages/Home/Home'
import PageLogin from './pages/Login/PageLogin'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import PageShop from './pages/Shop/PageShop'
import PageContact from './pages/Contact/PageContact'
import Order from './pages/Order/Order'
import Detail from './pages/Detail/Detail'
import { AdminPage } from './pages/Admin'
import ProductList from './pages/Admin/Product/ProductList'
import ProductForm from './pages/Admin/Product/ProductForm'
import CustomerList from './pages/Admin/Customer/CustomerList'
import AddCustomer from './pages/Admin/Customer/AddCustomer'
import OrderList from './pages/Admin/Order/OrderList'
import OrderForm from './pages/Admin/Order/OrderForm'
import LayoutAdmin from './layout/LayoutAdmin'
import UpdateCustomer from './pages/Admin/Customer/UpdateCustomer'
import { UpdateProduct } from './pages/Admin/Product'
import UpdateOrder from './pages/Admin/Order/UpdateOrder'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" index element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />}>
          <Route index path="formInfor" element={<FormInformation />} />
          <Route path="formEmail" element={<FormTypeEmail />} />
        </Route>
        <Route path="/forgetpass" element={<PageForgetPass />}>
          <Route index path="typePass" element={<FormTypeEmailOfPass />} />
          <Route path="otp" element={<OTP />} />
        </Route>
        <Route path="/pagecart" element={<PageCart />} />
        <Route path="/shop" element={<PageShop list={[]} />} />
        <Route path="/contact" element={<PageContact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/pageprofile" element={<PageProfile />} />
        <Route path="/pagechangepass" element={<PageChangePassword />} />
        <Route path="/history-order" element={<HistoryOrder />}></Route>
        <Route path="/home" element={<Home />} />
        
      </Route>
      <Route element={<LayoutAdmin />}>
      <Route path="/admin/" element={<AdminPage />}/>
        <Route path="/admin/listProduct" element={<ProductList />}/>
        <Route path="/admin/listCustomer" element={<CustomerList />}/>
        <Route path="/admin/listOrder" element={<OrderList />}/>
        <Route path="/admin/addProduct" element={<ProductForm />}/>
        <Route path="/admin/addCustomer" element={<AddCustomer />}/>
        <Route path="/admin/addOrder" element={<OrderForm />} />
        <Route path="/admin/updateCustomer/:id" element={<UpdateCustomer />} />
        <Route path="/admin/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/admin/updateOrder/:id" element={<UpdateOrder />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App

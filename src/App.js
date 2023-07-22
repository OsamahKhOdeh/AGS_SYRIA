import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/pages/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Login from "./components/pages/Login/Login";
import Layout from "./components/Layout/Layout";
import { AddCase } from "./components/pages/Add-Case/AddCase";
import Cases from "./components/pages/Cases/Cases";
import { History } from "./components/pages/History/History";
import { UnderProcess } from "./components/pages/Under-Process/UnderProcess";
import RequireAuth from "./actions/RequireAuth";
// import axios from "axios";
import { Roles } from "./components/pages/Enum/Constants";
import LayoutAdmin from "./components/pages/LayoutAdmin/LayoutAdmin";
import ProductsStepper from "./components/pages/LayoutAdmin/Products/ProductsStepper";
import EditStock2 from "./components/pages/EditStock/EditStock2";
import Orders from "./components/pages/LayoutAdmin/Orders/Orders";
import EditItems from "./components/pages/LayoutAdmin/EditItems/EditItems";
import AllPIs from "./components/pages/LayoutAdmin/AllPIS/AllPIs";
import Finance from "./components/pages/LayoutAdmin/Finance/Finance";
import ExchangeRate from "./components/pages/LayoutAdmin/ExchangeRate/ExchangeRate";
// import { useEffect } from "react";
// import { loading } from "./actions";
// import { connect, useDispatch, useSelector } from "react-redux";

function App() {
  // const loader = useSelector((state) => state.loader);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const requestInterceptor = axios.interceptors.request.use(
  //     (config) => {
  //       // spinning start to show
  //       dispatch(loading(true));
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   const responseInterceptor = axios.interceptors.response.use(
  //     (response) => {
  //       // spinning hide
  //       dispatch(loading(false));
  //       return response;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );

  //   // Clean up the interceptors when the component is unmounted
  //   return () => {
  //     axios.interceptors.request.eject(requestInterceptor);
  //     axios.interceptors.response.eject(responseInterceptor);
  //   };
  // }, [dispatch]);
  return (
    <>
      {
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route element={<RequireAuth allowedRoles={[...Object.values(Roles)]} />}>
                <Route path="/" element={<Layout />}>
                  <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Logistic]} />}>
                    <Route path="/add-case" element={<AddCase />}></Route>
                  </Route>
                  <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Archiver]} />}>
                    <Route path="/cases" element={<Cases />}></Route>
                  </Route>
                  <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Archiver]} />}>
                    <Route path="/history" element={<History />}></Route>
                  </Route>
                  <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Accounter]} />}>
                    <Route path="/under-process" element={<UnderProcess />}></Route>
                  </Route>
                  <Route>
                    <Route path="/user" element={<LayoutAdmin />}>
                      <Route element={<RequireAuth allowedRoles={[...Object.values(Roles)]} />}>
                        <Route index path="makepo" element={<ProductsStepper />}></Route>
                        <Route path="orders" element={<Orders />}></Route>
                      </Route>
                      <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Financial, Roles.SalesManager]} />}>
                        <Route path="pis" element={<AllPIs />}></Route>
                      </Route>
                      <Route element={<RequireAuth allowedRoles={[Roles.Admin]} />}>
                        <Route path="editstock" element={<EditStock2 />}></Route>
                        <Route path="exchange" element={<ExchangeRate />}></Route>
                      </Route>
                      <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Sales]} />}>
                        <Route path="editItems" element={<EditItems />}></Route>
                      </Route>
                    </Route>
                  </Route>
                  {/* <Route element={<RequireAuth allowedRoles={[Roles.Admin, Roles.Financial]} />}>
                    <Route path="/admin" element={<LayoutAdmin />}>
                      <Route index path="makepo" allowedRoles={[...Object.values(Roles)]} element={<ProductsStepper />}></Route>
                      <Route path="editstock" element={<EditStock2 />}></Route>
                      <Route path="orders" element={<Orders />}></Route>
                      <Route path="editItems" element={<EditItems />}></Route>
                      <Route path="pis" element={<AllPIs />}></Route>
                      <Route path="finance" element={<AllPIs />}></Route>
                    </Route>
                  </Route> */}
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      }
    </>
  );
}

export default App;
// }
// const mapStateToProps = (state) => {
//   return {
//     loader: state.loader,
//   };
// };
// export default connect(mapStateToProps, {
//   loading,
// })(App);
// // export default App;

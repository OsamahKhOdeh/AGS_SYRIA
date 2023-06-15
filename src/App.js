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
import { Roles } from "./components/pages/Enum/Constants";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(Roles)]} />}
          >
            <Route path="/" element={<Layout />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[Roles.Admin, Roles.Logistic]} />
                }
              >
                <Route path="/add-case" element={<AddCase />}></Route>
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[Roles.Admin, Roles.Archiver]} />
                }
              >
                <Route path="/cases" element={<Cases />}></Route>
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[Roles.Admin, Roles.Archiver]} />
                }
              >
                <Route path="/history" element={<History />}></Route>
              </Route>
              <Route
                element={
                  <RequireAuth allowedRoles={[Roles.Admin, Roles.Accounter]} />
                }
              >
                <Route path="/under-process" element={<UnderProcess />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

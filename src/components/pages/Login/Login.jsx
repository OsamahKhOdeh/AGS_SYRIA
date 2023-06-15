import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { BASE_URL } from "../../../config/Config";
// import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../shared/Toaster/Toaster";
import { ToastType } from "../Enum/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import { ToastContainer } from "react-toastify";
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const psswd = useRef();
  const usernameD = useRef();
  const psswdD = useRef();
  const username = useRef();
  // const [isAutherized, setIsAutherized] = useState(true);
  // const authState = useSelector((state) => state.auth.autherized);
  // useEffect(() => {
  //   if (authState === false) {
  //     setIsAutherized(false);
  //   }
  // }, [authState]);
  const handleSubmit = (event) => {
    // console.log({ username: username.current.value, psswd: psswd.current.value });
    // handleLogin(username.current.value, psswd.current.value);
    try {
      const formData = {
        username: username.current.value,
        password: psswd.current.value,
      };
      // console.log({ username: username, psswd: psswd });
      dispatch(login(formData, navigate));
    } catch (error) {}
  };
  const handleSubmitD = (event) => {
    // console.log({
    //   username: usernameD.current.value,
    //   psswd: psswdD.current.value,
    // });
    // handleLogin(usernameD.current.value, psswdD.current.value);
    try {
      const formData = {
        username: usernameD.current.value,
        password: psswdD.current.value,
      };
      // console.log({ username: username, psswd: psswd });
      dispatch(login(formData, navigate));
    } catch (error) {}
  };
  // const handleLogin = (name, password) => {
  //   let model = {
  //     username: name,
  //     password: password,
  //   };
  //   axios
  //     .post(`${BASE_URL}/auth`, model)
  //     .then((response) => {
  //       console.log(response.data);
  //       showToastMessage("Logged In Successfuly", ToastType.Success);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.error(error);
  //     });
  // };
  return (
    <>
      <ToastContainer />;{/* // New Page to login  */}
      <div className="login-new desktop-design">
        <div class="container right-panel-active" id="container">
          <div class="form-container sign-up-container">
            <form>
              <h1>Login </h1>
              <br />
              <input type="text" placeholder="User Name" ref={usernameD} />
              <div className="form-group">
                <input type="password" placeholder="Password" ref={psswdD} />
              </div>
              <button type="button" onClick={handleSubmitD}>
                Login{" "}
              </button>
            </form>
          </div>
          <div class="form-container sign-in-container"></div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-right">
                <img src="/images/logo_nav.png" className="img-login" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* design mobile  */}
      <div className="login-new mobile-design">
        <div className="card card-login">
          <form>
            <div class="social-container">
              <img src="/images/logo_nav.png" className="img-login" alt="" />
            </div>
            <h1>Login </h1>
            <br />
            <input
              type="text"
              placeholder="User Name"
              ref={username}
              autocomplete="on"
            />
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                ref={psswd}
                autocomplete="on"
              />
            </div>
            <button type="button" onClick={handleSubmit}>
              Login{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;

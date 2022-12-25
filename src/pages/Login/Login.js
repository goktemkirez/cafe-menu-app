import React from "react";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth, provider } from "../../helpers/firebase";
import { login } from "../../slices/authSlice";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        dispatch(
          login({
            isLoggedIn: true,
            displayName: response.user.displayName,
            email: response.user.email,
            photoURL: response.user.photoURL,
            userId: response.user.uid,
            accessToken: response.user.accessToken,
          })
        );
        navigate(`/`)
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="container">
        <button onClick={signIn}>Google ile Giriş Yap</button>
      </div>
    </div>
  );
}

export default Login;

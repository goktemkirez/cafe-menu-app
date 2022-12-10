import React from "react";
import { signInWithPopup } from "firebase/auth";

import { auth, provider } from "../../helpers/firebase";
import "./Login.css";

function Login() {
  const login = () => {
    signInWithPopup(auth, provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="container">
        <button onClick={login}>Google ile Giriş Yap</button>
      </div>
    </div>
  );
}

export default Login;

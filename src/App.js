import React, { useEffect, useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { auth } from "./helpers/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return <div className="App">{user ? <Home user={user} /> : <Login />}</div>;
}

export default App;

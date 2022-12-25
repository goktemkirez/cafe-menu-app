import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import { routes } from "../routes";
import LeftDrawer from "../components/LeftDrawer";
import { selectAuth, login } from "../slices/authSlice";
import Login from "../pages/Login";
import { auth } from "../helpers/firebase";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            isLoggedIn: true,
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            userId: authUser.uid,
            accessToken: authUser.accessToken,
          })
        );
      } else {
        dispatch(
          login({
            isLoggedIn: false,
            displayName: "",
            email: "",
            photoURL: "",
            userId: "",
            accessToken: "",
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        {user.isLoggedIn ? (
          <LeftDrawer>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.component}>
                  {route.childRoute?.map((child, index) => (
                    <Route
                      key={index}
                      path={child.path}
                      element={child.component}
                    />
                  ))}
                </Route>
              ))}
            </Routes>
          </LeftDrawer>
        ) : (
          <Login />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

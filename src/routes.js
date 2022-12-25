import Login from "./pages/Login";
import Home from "./pages/Home";
import Counter from "./pages/Counter";
import NotFound from "./pages/NotFound";

export const ROUTES = {
    DASHBOARD: "/",
    LOGIN: "/login",
    HOME: "/home",
    COUNTER: "/counter",
    NOT_FOUND: "*",
  };
  
  export const routes = [
    {
      path: ROUTES.DASHBOARD,
      component: <Home/>,
      name: "Anasayfa",
      shonOnSidebar: false,
    },
    {
      path: ROUTES.LOGIN,
      component: <Login/>,
      name: "Login",
      shonOnSidebar: false,
    },
    {
      path: ROUTES.HOME,
      component: <Home/>,
      name: "Anasayfa",
      shonOnSidebar: true,
    },
    {
      path: ROUTES.COUNTER,
      component: <Counter/>,
      name: "Counter",
      shonOnSidebar: true,
      childRoute: [
        {
          path: ':id',
          component: <Counter/>
        }
      ]
    },
    {
      path: ROUTES.NOT_FOUND,
      component: <NotFound/>,
      name: "Not Found",
      shonOnSidebar: false,
    },
  ];
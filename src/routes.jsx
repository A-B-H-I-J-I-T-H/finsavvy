import App from "./App";
import Login from "./components/Login";
import SignUpPage from "./components/sign_up";

const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "SignUpPage",
    element: <SignUpPage />,
  },
  {
    path: "App",
    element: <App />
  },
];

export default routes;

//import logo from './logo.svg';
//import './App.css';
//import { Register } from "./pages/Register/register";
import  Login  from "./pages/Login/Login";
import  Register  from "./pages/Register/register";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
  ]);
  return (
    <>
     <RouterProvider router={router} />
     </>
  );
}

export default App;

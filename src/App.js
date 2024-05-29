import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";

import PrivateRoute from './route/PrivateRoute'
import api from './utils/api'

function App() {

  const [user, setUser] = useState(undefined);

  const getUser = async() => {
    try
    {
      const storedToken = sessionStorage.getItem("token");

      if(storedToken)
      {
        const response = await api.get("/user/info");
        setUser(response.data.user);
      }
    }catch(err)
    {
      setUser(undefined);
    }
  }

  useEffect(()=>{
    getUser();
  },[])

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute user={user}><TodoPage setUser={setUser}/></PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;

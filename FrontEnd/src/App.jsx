import Login from "./components/pages/Login";
import {Routes, Route} from "react-router-dom";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/user-dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default app;
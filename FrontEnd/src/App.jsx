import Login from "./components/pages/Login";
import {Routes, Route} from "react-router-dom";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import ApiDashboard from "./components/pages/APIs";
const app = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/user-dashboard" element={<Dashboard/>}/>
      <Route path="/my-apis" element={<ApiDashboard/>}/>
    </Routes>
  )
}

export default app;
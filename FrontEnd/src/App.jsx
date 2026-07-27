import Login from "./components/pages/Login";
import {Routes, Route} from "react-router-dom";

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
    </Routes>
  )
}

export default app;
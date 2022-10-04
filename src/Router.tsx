import { Link, Route, Routes } from "react-router-dom";
import { Register } from "./component/Register";

export const RouterSetup = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
      </Routes>
    </>
  )
}
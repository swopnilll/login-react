import { Link, Route, Routes } from "react-router-dom";
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import { AllergiesPageWrapper } from "./pages/AllergiesPageWrapper";
import { LandingAuthPageWrapper } from "./pages/LandingAuthPageWrapper";

export const RouterSetup = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingAuthPageWrapper />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/allergy" element={<AllergiesPageWrapper />} />
      </Routes>
    </>
  );
};

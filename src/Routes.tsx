import { Link, Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import { Login } from "./component/Login";
import { Register } from "./component/Register";
import RequiredAuth from "./component/RequireAuth";
import { AllergiesPageWrapper } from "./pages/AllergiesPageWrapper";
import AllergyDetail from "./pages/AllergyDetail";
import { LandingAuthPageWrapper } from "./pages/LandingAuthPageWrapper";

export const RouterSetup = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<LandingAuthPageWrapper />}>
            <Route index element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
          <Route path="/allergy" element={<RequiredAuth />} >
            <Route index element={<AllergiesPageWrapper />} />
            <Route path="/allergy/:id" element={<AllergyDetail />} />
          </Route>
        </ Route>
      </Routes>
    </>
  );
};

import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import RegisterAndLogin from "./components/Register";
import Knowledge from "./components/knowledge";
import KnowledgeInput from "./components/KnowledgeInput";
import KnowledgeImport from "./components/KnowledgeImport";
import KnowledgeRoute from "./components/KnowledgeRoute";
import Interview from "./components/interview";
import KnowledgeManage from "./components/KnowledgeManage";
import Homepage from "./components/Homepage";
import "animate.css";
import "./css/Register.css";
import "./App.css";
import { CookiesProvider, useCookies } from "react-cookie";
import Dashboard from "./components/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { TySubmitButton } from "./components/TyButton";
import { TyInputText } from "./components/TyInput";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

const Tail = () => <h1 className="text-style font-ty">欢迎光临</h1>;

function App() {
  return (
    <React.Fragment>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </React.Fragment>
  );
}

function Root() {
  return (
    <Routes>
      <Route
        path="/button"
        element={<TySubmitButton className="">提交提价提交</TySubmitButton>}
      />
      <Route
        path="/input"
        element={<TyInputText name="lastname" id="lastname" placeholder="姓" />}
      />
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<RegisterAndLogin />} />
      <Route path="/knowledge" element={<Knowledge />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/KnowledgeInput" element={<KnowledgeInput />} />
      <Route path="/knowledgeInput/:guid" element={<KnowledgeInput />} />
      <Route path="/KnowledgeImport" element={<KnowledgeImport />} />
      <Route path="/KnowledgeManage" element={<KnowledgeManage />} />
      <Route path="/knowledgeRoute" element={<KnowledgeRoute />} />
    </Routes>
  );
}

export default App;

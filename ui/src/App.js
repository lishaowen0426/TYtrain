import React, { useEffect } from "react";
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
import { TySubmitButton, TyIconButton, TyNavi } from "./components/TyButton";
import { TyInputTextBorderNone } from "./components/TyInput";
import { TyFormCheckBox } from "./components/TyCheckbox";
import { TyFormInputBox } from "./components/TyInputBox";
import { TyFormSelectBox } from "./components/TySelectBox";
import { TyLayoutDashboardSidebar } from "./components/TySideBar";
import { TyContainer } from "./components/TyContainer";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

const Tail = () => <h1 className="text-style font-ty">欢迎光临</h1>;

const validateInput = value => {
  if (!value) return "This field is required";
  // Add more validation logic as needed
  return "";
};

const menuItems = [
  {
    name: "Dashboard",
    href: "#dashboard",
    children: [
      { name: "Submenu 1", href: "#submenu1" },
      { name: "Submenu 2", href: "#submenu2" },
    ],
  },
  {
    name: "Reports",
    href: "#reports",
    children: [
      { name: "Report 1", href: "#report1" },
      { name: "Report 2", href: "#report2" },
    ],
  },
  // More menus...
];

function App() {
  useEffect = () => {
    document.body.style.background = "#e6e6e7";
  };

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
      <Route path="/c" element={<TyContainer />} />
      <Route
        path="/input"
        element={
          <TyInputTextBorderNone
            name="lastname"
            id="lastname"
            placeholder="姓"
          />
        }
      />
      <Route
        path="/Sidebar"
        element={
          <TyLayoutDashboardSidebar
            menus={menuItems}
          ></TyLayoutDashboardSidebar>
        }
      />
      <Route path="/button" element={<TySubmitButton>提交</TySubmitButton>} />
      <Route path="/icon" element={<TyIconButton />} />
      <Route path="/CheckBox" element={<TyFormCheckBox></TyFormCheckBox>} />
      <Route
        path="/InputBox"
        element={
          <TyFormInputBox
            id="myInput"
            label="test"
            placeholder=" "
            layout="horizontal"
            validate={validateInput}
          />
        }
      />
      <Route
        path="/SelectBox"
        element={
          <TyFormSelectBox
            id="mySelect"
            label="SelectOption"
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              // ... more options
            ]}
            layout="horizontal"
          />
        }
      />

      <Route path="/" element={<Homepage />} />
      <Route path="/navi" element={<TyNavi />} />
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

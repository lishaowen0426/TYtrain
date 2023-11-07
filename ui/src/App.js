import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Knowledge from "./components/knowledge";
import KnowledgeInput from "./components/KnowledgeInput";
import KnowledgeImport from "./components/KnowledgeImport";
import Interview from "./components/interview";
import KnowledgeManage from "./components/KnowledgeManage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Homepage from "./components/Homepage";
import Theme from "./theme/theme";
import "animate.css";
import "./css/Register.css";
import "./App.css";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.Fragment>
  );
}

function Root() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/knowledge" element={<Knowledge />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/KnowledgeInput" element={<KnowledgeInput />} />
      <Route path="/knowledgeInput/:guid" element={<KnowledgeInput />} />
      <Route path="/KnowledgeImport" element={<KnowledgeImport />} />
      <Route path="/KnowledgeManage" element={<KnowledgeManage />} />
    </Routes>
  );
}

export default App;

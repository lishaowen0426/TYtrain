
import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Knowledge from './components/knowledge';
import KnowledgeInput from './components/KnowledgeInput';
import KnowledgeImport from './components/KnowledgeImport';
import Interview from './components/interview';
import KnowledgeManage from './components/KnowledgeManage';

const router = createBrowserRouter([
    { path: "*", Component: Root }
]);

function App() {
    return (
        <RouterProvider router={router} />
    )
}

function Root() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/KnowledgeInput" element={<KnowledgeInput />} />
            <Route path="/knowledgeInput/:guid" element={<KnowledgeInput />} />
            <Route path="/KnowledgeImport" element={<KnowledgeImport />} />
            <Route path="/KnowledgeManage" element={<KnowledgeManage />} />
        </Routes>
    )
}



export default App;

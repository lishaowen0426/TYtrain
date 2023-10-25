// import logo from './logo.svg';
// import React from 'react';
// import Login from './components/Login';
// import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }
// function App() {
//   return (
//     <div className="App">
//       <Login />
//     </div>
//   );
// }
// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Knowledge from './components/knowledge';
import KnowledgeInput from './components/KnowledgeInput';
import KnowledgeImport from './components/KnowledgeImport';
import Interview from './components/interview';
import KnowledgeManage from './components/KnowledgeManage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/KnowledgeInput" element={<KnowledgeInput />} />
        <Route path="/knowledgeInput/:guid" element={<KnowledgeInput />} />
        <Route path="/KnowledgeImport" element={<KnowledgeImport />} />
        <Route path="/KnowledgeManage" element={<KnowledgeManage />} />
      
      </Routes>
    </Router>
  );
}

export default App;

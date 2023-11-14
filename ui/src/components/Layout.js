import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import '../css/Layout.css';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState('Knowledge');
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    try {
      // 获取存储在cookie中的token
      const tokenCookie = localStorage.getItem('token');
      if (tokenCookie) {
        // 使用jwt-decode库解码token
        const decodedToken = jwtDecode(tokenCookie);
        // 假设token中的role字段包含用户角色
        setUserRole(decodedToken.role);
      }
    } catch (error) {
      console.error("Error decoding the token", error);
    }
  }, []);

  const navigateTo = (path) => {
    handleMenuClick(path.split('/').pop());
    navigate(path);
  };

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="layout-container">
          <div className="sidebar">
            {userRole && (
              <>
                {userRole === '1' && (
                  <button 
                    className={`menu-btn ${selectedMenu === 'report' ? 'active' : ''}`}
                    onClick={() => navigateTo('/report')}
                  >
                    report
                  </button>
                )}
                <button 
                    className={`menu-btn ${selectedMenu === 'knowledge' ? 'active' : ''}`}
                    onClick={() => navigateTo('/knowledge')}
                  >
                    knowledge
                  </button>
                <button 
                    className={`menu-btn ${selectedMenu === 'knowledgeRoute' ? 'active' : ''}`}
                    onClick={() => navigateTo('/knowledgeRoute')}
                  >
                    knowledgeRoute
                  </button>
                  <button 
                    className={`menu-btn ${selectedMenu === 'interview' ? 'active' : ''}`}
                    onClick={() => navigateTo('/interview')}
                  >
                    Interview
                  </button>
                <button 
                  className={`menu-btn ${selectedMenu === 'KnowledgeInput' ? 'active' : ''}`}
                  onClick={() => navigateTo('/KnowledgeInput')}
                >
                  Input
                </button>
                <button 
                  className={`menu-btn ${selectedMenu === 'KnowledgeImport' ? 'active' : ''}`}
                  onClick={() => navigateTo('/KnowledgeImport')}
                >
                  knowledgeimport
                </button>
                <button 
                  className={`menu-btn ${selectedMenu === 'KnowledgeManage' ? 'active' : ''}`}
                  onClick={() => navigateTo('/KnowledgeManage')}
                >
                  KnowledgeManage
                </button>
              </>
            )}
          </div>
          <div className="main-content">{children}</div>
        </div>
      </div>
      <div className="footer d-flex justify-content-center align-items-center">
        <p className="mb-0">Copyright &copy; 2023　 東陽ソフト株式会社　 All rights reserved.</p>
      </div>
    </div>
  );
}

export default Layout;
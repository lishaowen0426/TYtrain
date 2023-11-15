import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const TyLayoutDashboardSidebar = ({ menus }) => {
  // State to track the open status of submenu
  const [openMenu, setOpenMenu] = useState({});

  // Function to handle clicking on a parent menu item to toggle its submenu
  const handleMenuClick = (menuName) => {
    setOpenMenu((prevOpenMenu) => ({
      ...prevOpenMenu,
      [menuName]: !prevOpenMenu[menuName],
    }));
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-sky-500" style={{ width: "240px"}}>
      <ul className="nav nav-pills flex-column mb-auto">
        {menus.map((menu) => (
          <React.Fragment key={menu.name}>
            <li className="nav-item">
              <a href={menu.href} className="nav-link text-dark" aria-current="page" onClick={() => handleMenuClick(menu.name)}>
                {menu.name}
              </a>
            </li>
            {menu.children && openMenu[menu.name] && (
              <ul className="nav flex-column ms-3">
                {menu.children.map((subMenu) => (
                  <li className="nav-item" key={subMenu.name}>
                    <a href={subMenu.href} className="nav-link text-dark">
                      {subMenu.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

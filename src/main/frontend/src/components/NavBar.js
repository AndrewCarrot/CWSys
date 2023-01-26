import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "../styles/NavBar.css";
import logo from "../images/spider_logo.png"


const NavBar = ({ menu, drawerOpen, setDrawerOpen }) => {
  
  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setDrawerOpen(true)}
      />
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      > 
        {menu}
     </Drawer>
    <img src={logo} alt="tutaj powinno byc widoczne logo" className="logo" />
    </nav>
  );
};
export default NavBar;
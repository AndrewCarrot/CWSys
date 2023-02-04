import React from "react"
import {Layout} from "antd"

import "../styles/SideBar.css"

const SideBar = ({ menu }) => {
    return (
      <Layout.Sider
        className="sidebar"
        breakpoint={"xl"}
        theme="light"
        collapsedWidth={0}
        trigger={null}
      >
        {menu}
     </Layout.Sider>
     );
  };
  export default SideBar;
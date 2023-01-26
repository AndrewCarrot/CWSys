
import './styles/App.css';
import React, {useEffect, useState} from "react"
import {
  Outlet,
  useNavigate
} from "react-router-dom";
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import TopicMenu from './components/TopicMenu';
import ReadPage from './components/ReadPage'
import ErrorPage from './components/ErrorPage';

import { Layout } from 'antd';
import {
  SearchOutlined,
  CreditCardOutlined,
  UserOutlined
} from '@ant-design/icons';
import RouterTestComponent from './components/RouterTestComponent';
const { Header, Content, Sider } = Layout;



function App() {
 
  const topics = [
    [<SearchOutlined />, " Odczyt"],
    [<CreditCardOutlined/>, " Sekcje"],
    [<UserOutlined />, " Klienci"]
  ];
 
  const [selectedKey, setSelectedKey] = useState("0");

  const [drawerOpen, setDrawerOpen] = useState(false)

  const navigate = useNavigate()


  const routes = topics.map(
    element => element[1].trim()==='Odczyt' ? '' : element[1].trim()
  )

  const selectMenuItem = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setDrawerOpen(false);

    navigate(`/${routes[key]}`)
  };
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      selectMenuItem={selectMenuItem}
    />
  );
  return (
    <div className="App">
      <NavBar menu={Menu} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      <Layout>
        <SideBar menu={Menu} />
        <Content className="content">
          <Outlet/>
        </Content>
      </Layout>
    </div>
  );
  
}

export default App;

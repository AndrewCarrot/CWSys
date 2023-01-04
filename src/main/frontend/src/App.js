
import './styles/App.css';
import React, {useState} from "react"
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import TopicMenu from './components/TopicMenu';

import { Layout } from 'antd';
const { Header, Content, Sider } = Layout;


function App() {
 
  const topics = ["Odczyt", "Second topic", "Third topic"];
 
  const [selectedKey, setSelectedKey] = useState("0");

  const [drawerOpen, setDrawerOpen] = useState(false)

  const selectMenuItem = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setDrawerOpen(false);
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
          
        </Content>
      </Layout>
    </div>
  );
  
}

export default App;

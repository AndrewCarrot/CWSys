import React from "react";
import {Menu} from "antd";

const TopicMenu = ({ topics, selectedKey,  selectMenuItem }) => {
  const styledTopics = [];
  topics.forEach((topic, index) =>
    styledTopics.push(
      {
        key: index,
        onClick: selectMenuItem,
        label: topic
      }
    )
  );
  
  return (
    <Menu  items={styledTopics} mode="inline" selectedKeys={[selectedKey]} />
  );
}
export default TopicMenu;
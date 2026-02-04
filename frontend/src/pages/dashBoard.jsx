import { Layout, Button, Drawer, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState, useRef } from "react";

import Sidebar from "../components/sideBar";
import GroupHeader from "../components/groupHeader";
import GroupContent from "../components/groupContent";
import CreateGroupModal from "../components/createGroupModal";

const { Sider, Header, Content } = Layout;
const { useBreakpoint } = Grid;

const Dashboard = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const sidebarRef = useRef();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider width="auto" theme="light">
          <Sidebar
            ref={sidebarRef}
            onSelectGroup={setActiveGroup}
          />
        </Sider>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          placement="left"
          width="100%"
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar
            ref={sidebarRef}
            onSelectGroup={(g) => {
              setActiveGroup(g);
              setDrawerOpen(false);
            }}
          />
        </Drawer>
      )}

      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 16px"
          }}
        >
          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
            />
          )}

          <GroupHeader group={activeGroup} />
        </Header>

        {/* Content */}
        <Content style={{ margin: 16 }}>
          <GroupContent group={activeGroup} />
        </Content>
      </Layout>

      {/* Create Group Modal */}
      <CreateGroupModal
        open={groupModalOpen}
        onClose={() => setGroupModalOpen(false)}
        onCreated={() => sidebarRef.current?.reload()}
      />
    </Layout>
  );
};

export default Dashboard;


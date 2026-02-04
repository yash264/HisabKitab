import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Menu, Spin, Empty, Button } from "antd";
import { TeamOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../externalAPI/api";
import CreateGroupModal from "./createGroupModal";


const Sidebar = forwardRef(({ onSelectGroup }, ref) => {
  const [collapsed, setCollapsed] = useState(false);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const res = await api.get("/groups");
      setGroups(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    reload: loadGroups
  }));

  useEffect(() => {
    loadGroups();
  }, []);

  const menuItems = groups.map((g) => ({
    key: g._id,
    icon: <TeamOutlined />,
    label: collapsed ? null : g.name
  }));

  return (
    <>
      <div
        style={{
          width: collapsed ? 72 : 260,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
          transition: "width 0.2s ease"
        }}
      >
        {/* Branding */}
        <div
          style={{
            height: 64,
            background: "linear-gradient(135deg, #fbbf24, #f97316)",
            color: "#fff",
            fontSize: collapsed ? 16 : 20,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {collapsed ? "HK" : "HisabKisab"}
        </div>

        {/* Create Group */}
        {!collapsed && (
          <div style={{ padding: 12 }}>
            <Button
              block
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateOpen(true)}
            >
              Create Group
            </Button>
          </div>
        )}

        {/* Groups */}
        <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
          {loading ? (
            <Spin style={{ marginTop: 40 }} />
          ) : groups.length === 0 ? (
            <Empty description={!collapsed && "No groups yet"} />
          ) : (
            <Menu
              mode="inline"
              selectedKeys={[]}
              items={menuItems}
              onClick={({ key }) => {
                const group = groups.find((g) => g._id === key);
                if (group) onSelectGroup(group);
              }}
              style={{ borderRight: "none" }}
            />
          )}
        </div>

        <div
          onClick={() => setCollapsed((c) => !c)}
          style={{
            height: 48,
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            boxShadow: "0 -2px 6px rgba(0,0,0,0.08)"
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
              userSelect: "none"
            }}
          >
            {collapsed ? "›" : "‹"}
          </span>
        </div>

      </div>

      <CreateGroupModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={loadGroups}
      />
    </>
  );
});

export default Sidebar;

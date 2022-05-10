import { Layout } from "antd";
import React from "react";
import styled from "styled-components";
import AppHeader from "./AppHeader";

const { Content } = Layout;

function AppLayout({ children }) {
  return (
    <Layout style={{ height: "100%" }}>
      <AppHeader />
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380 }}>{children}</div>
      </Content>
    </Layout>
  );
}

export default AppLayout;

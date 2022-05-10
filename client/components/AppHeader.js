import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import styled from "styled-components";
const { Header } = Layout;

function AppHeader() {
  const routes = [
    {
      label: <Link href="/">Home</Link>,
      key: "/",
    },
    {
      label: <Link href="/create">Create contact</Link>,
      key: "/create",
    },
    {
      label: <Link href="/check">Check contact</Link>,
      key: "/check",
    },
  ];

  const menuItems = routes.map(({ link, title }) => (
    <Menu.Item key={link}>
      <Link href={link}>{title}</Link>
    </Menu.Item>
  ));

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <Menu items={routes} theme="dark" mode="horizontal" />
    </Header>
  );
}

export default AppHeader;

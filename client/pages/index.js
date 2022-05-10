import React from "react";
import { Typography } from "antd";

import AppLayout from "../components/AppLayout";

function Index() {
  return (
    <AppLayout>
      <Typography.Title>CryptoBook</Typography.Title>

      <Typography.Title level={5}>
        You can create and check contanct on rinkeby blockchain
      </Typography.Title>
    </AppLayout>
  );
}

export default Index;

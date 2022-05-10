import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";

import AppLayout from "../components/AppLayout";
import { getContactByAddress } from "../utils/getContactByAddress";

const initialContactsState = {
  contactTelegram: "",
  contactDiscord: "",
};

const CheckContact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [contacts, setContacts] = useState(initialContactsState);

  const { contactTelegram, contactDiscord } = contacts;

  const onFinish = async (data) => {
    try {
      setContacts(initialContactsState);
      setIsLoading(true);
      const { telegram, discord } = await getContactByAddress(data.address);

      setContacts({
        contactTelegram: telegram,
        contactDiscord: discord,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    console.log("finishFailed");
  };
  return (
    <AppLayout>
      <Form
        name="check-contract"
        initialValues={{
          address: "0xE8B1abE18cd9177B7C9F29bba6886233f41478A1",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "600px" }}
      >
        <Form.Item
          label="Address of contract owner"
          name="address"
          rules={[{ required: true, message: "Please input an address!" }]}
        >
          <Input placeholder="0x0000000000000000000000000000000000000000" />
        </Form.Item>

        <Form.Item>
          <Button disabled={isLoading} type="primary" htmlType="submit">
            Find a contract
          </Button>
        </Form.Item>
      </Form>
      {contactTelegram && (
        <Typography.Title level={4}>
          Telegram: {contactTelegram}
        </Typography.Title>
      )}
      {contactDiscord && (
        <Typography.Title level={4}>Discord: {contactDiscord}</Typography.Title>
      )}
    </AppLayout>
  );
};

export default CheckContact;

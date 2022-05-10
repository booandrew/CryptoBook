import React, { useState } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import AppLayout from "../components/AppLayout";
import ethersProvider from "../provider";
import { contactFactory } from "../contactFactory";

function CreateContact() {
  const [transactionHash, setTransactionHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async ({ telegram, discord }) => {
    await window.ethereum.enable();
    const signer = ethersProvider.getSigner();
    const contactFactoryWithSigner = contactFactory.connect(signer);
    console.log({ contactFactoryWithSigner, signer });

    try {
      setIsLoading(true);
      setTransactionHash("");

      // need to call a contract function by this way bc we have orevloaded function in a contract
      const createContact =
        contactFactoryWithSigner["createContact(string,string)"];
      const response = await createContact(telegram, discord);

      message.success(`Transaction hash: ${response.hash}`);
      setTransactionHash(response.hash);
    } catch (error) {
      message.error(error.error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <Form
        onFinish={onFinish}
        layout="vertical"
        name="create-contact"
        style={{ width: "600px" }}
      >
        <Form.Item label="Telegram" name="telegram">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Discord" name="discord">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button disabled={isLoading} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
      {transactionHash && (
        <>
          <Typography.Title level={5}>
            Transaction hash: {transactionHash}
          </Typography.Title>
          <Button type="default">
            <Typography.Link
              href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}
              target="_blank"
            >
              View on Etherscan
            </Typography.Link>
          </Button>
        </>
      )}
    </AppLayout>
  );
}

export default CreateContact;

// accessList: null
// blockHash: null
// blockNumber: null
// chainId: 0
// confirmations: 0
// creates: null
// data: "0x3dce492000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000b746573742074656c652032000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b7465737420646973632032000000000000000000000000000000000000000000"
// from: "0xD0367ce119FEc5249105A9C8652e1eAd9460c2A9"
// gasLimit: BigNumber {_hex: '0x09831c', _isBigNumber: true}
// gasPrice: BigNumber {_hex: '0x06c56b976a', _isBigNumber: true}
// hash: "0x9bc98970426f6efd0c46fe8e912122f6d004b2d0aa4b49965b7626d1c4aa778d"
// maxFeePerGas: BigNumber {_hex: '0x06c56b976a', _isBigNumber: true}
// maxPriorityFeePerGas: BigNumber {_hex: '0x59682f00', _isBigNumber: true}
// nonce: 0
// r: "0xdcb195d53529543740f4e55431efcd805e858c339ead7e96127ea5b6614a40ce"
// s: "0x652d7b94469d575fec1aa308d2f11d6e094fa2be6a3d64b756ce3b65349b7053"
// to: "0xabdBb6bD301181F8594d50295bAb0826981eF223"
// transactionIndex: null
// type: 2
// v: 1
// value: BigNumber {_hex: '0x00', _isBigNumber: true}
// wait: (confirmations) => {…}

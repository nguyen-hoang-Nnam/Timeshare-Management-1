import { CloseCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space } from "antd";
import React, { useState, useEffect } from "react";
import UserService from "../../../../services/UserService";
import Notice from "../../../../Components/Notice";

const ModalUpdate = ({ open, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isUpdate = open.isUpdate;

  useEffect(() => {
    if (isUpdate) handleGetDetail();
  }, [isUpdate]);

  const handleGetDetail = async () => {
    try {
      setLoading(true);
      const res = await UserService.getUserById(open.id);
      if (!res.isSucceed) return;
      form.setFieldsValue({
        name: res.result?.name,
        email: res.result?.email,
        phoneNumber: res.result?.phoneNumber,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const res = await UserService[isUpdate ? "updateUser" : ""]({
        ...values,
        id: open.id,
      });
      if (!res.isSucceed) return;
      onCancel();
      onOk();
      Notice({
        msg: isUpdate ? "Update User Success!" : "Add User Success!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title={isUpdate ? "Update User" : "Add User"}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={700}
      footer={
        <Space size={12}>
          <Button icon={<CloseCircleOutlined />} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
            onClick={handleSave}
          >
            Save
          </Button>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="FullName"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your FullName!",
            },
          ]}
        >
          <Input placeholder="input name..." />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="input email..." />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input placeholder="input phone number..." />
        </Form.Item>
        {/* <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="input password..." />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ModalUpdate;

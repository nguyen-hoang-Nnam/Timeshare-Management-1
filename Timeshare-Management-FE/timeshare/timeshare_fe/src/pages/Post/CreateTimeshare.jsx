import React from "react";
import { Button, Form, Input, InputNumber, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import "./CreateTimeshare.css";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 6 },
  },
};

const CreateTimeshare = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("/api/timeshare/CreateTimeshare", values);
      console.log("Response:", response.data);
      message.success("Timeshare created successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error creating timeshare:", error);
      message.error("Failed to create timeshare. Please try again.");
    }
  };

  return (
    <div className="timeshare-form-container">
      <h3 className="form-title">POST YOUR TIMESHARE</h3>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="timeshareId"
          label="Timeshare ID"
          rules={[
            {
              required: true,
              message: "Please input Timeshare ID!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="timeshareName"
          label="Timeshare Name"
          rules={[
            {
              required: true,
              message: "Please input Timeshare Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
          rules={[
            {
              required: true,
              message: "Please upload Image!",
            },
            {
              validator: (_, fileList) => {
                const isJpgOrPng = fileList.every((file) => {
                  return (
                    file.type === "image/jpeg" || file.type === "image/png"
                  );
                });
                if (!isJpgOrPng) {
                  return Promise.reject("You can only upload JPG/PNG file!");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload
            name="logo"
            action="/api/timeshare/uploadImage" // Change the action to your API endpoint for uploading images                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            listType="picture"
            accept=".jpg,.png"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="Price"
          label="Price"
          rules={[
            {
              required: true,
              message: "Please input Price!",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="Address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Please input Address!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="timeshareStatusId"
          label="Timeshare Status ID"
          rules={[
            {
              required: true,
              message: "Please input Timeshare Status ID!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="placeId"
          label="Place ID"
          rules={[
            {
              required: true,
              message: "Please input Place ID!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="placeName"
          label="Place Name"
          rules={[
            {
              required: true,
              message: "Please input Place Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTimeshare;

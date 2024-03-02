import { CloseCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Upload } from "antd";
import React, { useState, useEffect } from "react";
import Notice from "../../../../Components/Notice";
import TimeShareService from "../../../../services/TimeShareService";
import { getBase64, normFile } from "../../../../lib/utils";

const ModalUpdate = ({ open, onOk, onCancel }) => {
  console.log("open: ", open);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const isUpdate = open.isUpdate;

  useEffect(() => {
    if (isUpdate) handleGetDetail();
  }, [isUpdate]);

  const handleGetDetail = async () => {
    try {
      setLoading(true);
      const res = await TimeShareService.getTimeshareById(open.timeshareId);
      if (!res.isSucceed) return;
      form.setFieldsValue({
        address: res.result?.address,
        price: res.result?.price,
        timeshareName: res.result?.timeshareName,
        ListImg: [
          {
            url: res.result?.image,
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      let resFile;
      if (values?.ListImg?.length > 0) {
        resFile = await getBase64(values?.ListImg[0]?.originFileObj);
      }
      const res = await TimeShareService[
        isUpdate ? "updateTimeshare" : "createTimeshare"
      ]({
        ...values,
        image: resFile ? resFile : open?.image,
        ListImg: undefined,
        id: open.timeshareId,
      });
      if (!res.isSucceed) return;
      onCancel();
      onOk();
      Notice({
        msg: isUpdate ? "Update Timeshare Success!" : "Add Timeshare Success!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title={isUpdate ? "Update Timeshare" : "Add Timeshare"}
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
          label="TimeShare Name"
          name="timeshareName"
          rules={[
            {
              required: true,
              message: "Please input your TimeShare Name!",
            },
          ]}
        >
          <Input placeholder="input name..." />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
        >
          <Input placeholder="input price..." />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input placeholder="input price..." />
        </Form.Item>
        <Form.Item
          label="Image"
          name="ListImg"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            accept="image/*"
            multiple={false}
            listType="picture-card"
            beforeUpload={() => false}
            // fileList={fileList}
            // onChange={onChange}
          >
            Upload
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdate;

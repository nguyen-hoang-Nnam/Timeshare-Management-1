import { CloseCircleOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Space } from "antd";
import React, { useState, useEffect } from "react";
import RoomService from "../../../../services/RoomService";
import Notice from "../../../../Components/Notice";
import moment from "moment";
import dayjs from "dayjs";

const ModalUpdate = ({ open, onOk, onCancel }) => {
  console.log("open: ", open);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isUpdate = open.isUpdate;

  useEffect(() => {
    if (isUpdate) handleGetDetail();
  }, [isUpdate]);

  const handleGetDetail = async () => {
    try {
      setLoading(true);
      const res = await RoomService.getRoomById(open.roomID);
      if (!res.isSucceed) return;
      form.setFieldsValue({
        checkin: res.result?.checkin ? dayjs(res.result?.checkin) : null,
        checkout: res.result?.checkout ? dayjs(res.result?.checkout) : null,
        nights: res.result?.nights,
        price: res.result?.price,
        rooms: res.result?.rooms,
        sleeps: res.result?.sleeps,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const res = await RoomService[isUpdate ? "updateRoom" : "createRoom"]({
        ...values,
        checkin: values.checkin.format(),
        checkout: values.checkout.format(),
        nights: +values?.nights,
        price: +values?.price,
        rooms: +values?.rooms,
        sleeps: +values?.sleeps,
        id: open.roomID,
      });
      if (!res.isSucceed) return;
      onCancel();
      onOk();
      Notice({
        msg: isUpdate ? "Update Room Success!" : "Add Room Success!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title={isUpdate ? "Update Room" : "Add Room"}
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Form Date"
              name="checkin"
              rules={[
                {
                  required: true,
                  message: "Please select date!",
                },
              ]}
            >
              <DatePicker
                placeholder="select date..."
                style={{ width: "100%" }}
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="To Date"
              name="checkout"
              rules={[
                {
                  required: true,
                  message: "Please select date!",
                },
              ]}
            >
              <DatePicker
                placeholder="select date..."
                style={{ width: "100%" }}
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nights"
              name="nights"
              rules={[
                {
                  required: true,
                  message: "Please input your nights!",
                },
              ]}
            >
              <Input placeholder="input nights..." />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Rooms"
              name="rooms"
              rules={[
                {
                  required: true,
                  message: "Please input your rooms!",
                },
              ]}
            >
              <Input placeholder="input rooms..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Sleeps"
              name="sleeps"
              rules={[
                {
                  required: true,
                  message: "Please input your sleeps!",
                },
              ]}
            >
              <Input placeholder="input sleeps..." />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalUpdate;

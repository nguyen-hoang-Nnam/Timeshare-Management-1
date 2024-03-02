import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Input, Menu, Row, Spin, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../Components/Layouts/LayoutAdmin";
import Notice from "../../../Components/Notice";
import RoomService from "../../../services/RoomService";
import "../UserManager/styles.css";
import ModalUpdate from "./components/ModalUpdate";
import { formatMoney } from "../../../lib/utils";
const { Search } = Input;
const RoomManager = () => {
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [listData, setListData] = useState([]);
  const handleGetList = async () => {
    try {
      setLoading(true);
      const res = await RoomService.getAllRoom();
      if (!res.isSucceed) return;
      setListData(res.result);
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteRoom = async (id) => {
    try {
      setLoading(true);
      const res = await RoomService.deleteRoom(id);
      if (!res.isSucceed) return;
      handleGetList();
      Notice({
        msg: "Delete Room Success!",
      });
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setLoading(false);
    }
  };
  const onSearch = (textSearch) => {};

  useEffect(() => {
    handleGetList();
  }, []);

  const columns = [
    {
      title: "order",
      dataIndex: "order",
      key: "order",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Dates",
      dataIndex: "checkin",
      key: "checkin",
      render: (val, record) => (
        <div>
          {val ? moment(val).format("DD/MM/YY") : ""} -{" "}
          {record?.checkout ? moment(record?.checkout).format("DD/MM/YY") : ""}
        </div>
      ),
    },
    {
      title: "Nights",
      dataIndex: "nights",
      key: "nights",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (val) => (val ? formatMoney(val) : 0),
    },
    {
      title: "Room",
      dataIndex: "rooms",
      key: "rooms",
    },
    {
      title: "Sleeps",
      dataIndex: "sleeps",
      key: "sleeps",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => {
                  setOpenModalUpdate({
                    ...record,
                    isUpdate: true,
                  });
                }}
              >
                <EditOutlined />
                <span style={{ marginLeft: 8 }}>Update Room</span>
              </Menu.Item>
              <Menu.Item
                key="5"
                style={{ color: "#ED1117" }}
                onClick={() => {
                  handleDeleteRoom(record.roomID);
                }}
              >
                <DeleteOutlined />
                <span style={{ marginLeft: 8 }}>Delete Room</span>
              </Menu.Item>
            </Menu>
          }
          trigger={["click", "contextMenu"]}
        >
          <div style={{ cursor: "pointer" }}>...</div>
        </Dropdown>
      ),
    },
  ];

  return (
    <LayoutAdmin>
      <Spin spinning={loading}>
        <div className="wrap-page">
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <div className="title">Room Manager</div>
            </Col>
            <Col flex={"auto"} style={{ width: 0 }}>
              <Search
                placeholder="search by..."
                allowClear
                onSearch={onSearch}
                style={{ width: "100%" }}
              />
            </Col>
            <Col style={{ width: 100 }}>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                size={"middle"}
                onClick={() => {
                  setOpenModalUpdate(true);
                }}
              >
                Add Room
              </Button>
            </Col>
            <Col span={24}>
              <Table columns={columns} dataSource={listData} />
            </Col>
          </Row>
        </div>
      </Spin>
      {openModalUpdate && (
        <ModalUpdate
          open={openModalUpdate}
          onCancel={() => setOpenModalUpdate(false)}
          onOk={() => {
            handleGetList();
          }}
        />
      )}
    </LayoutAdmin>
  );
};

export default RoomManager;

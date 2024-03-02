import React, { useState, useEffect } from "react";
import "./styles.css";
import LayoutAdmin from "../../../Components/Layouts/LayoutAdmin";
import { Button, Col, Dropdown, Input, Menu, Row, Spin, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import UserService from "../../../services/UserService";
import ModalUpdate from "./components/ModalUpdate";
import Notice from "../../../Components/Notice";
const { Search } = Input;
const UserManager = () => {
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [listUser, setListUser] = useState([]);
  const handleGetList = async () => {
    try {
      setLoading(true);
      const res = await UserService.getAllUser();
      if (!res.isSucceed) return;
      setListUser(res.result);
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      setLoading(true);
      const res = await UserService.deleteUser(id);
      if (!res.isSucceed) return;
      handleGetList();
      Notice({
        msg: "Delete User Success!",
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
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "FullName",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
                <span style={{ marginLeft: 8 }}>Update User</span>
              </Menu.Item>
              <Menu.Item
                key="5"
                style={{ color: "#ED1117" }}
                onClick={() => {
                  handleDeleteUser(record.id);
                }}
              >
                <DeleteOutlined />
                <span style={{ marginLeft: 8 }}>Delete User</span>
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
              <div className="title">User Management</div>
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
                Add User
              </Button>
            </Col>
            <Col span={24}>
              <Table columns={columns} dataSource={listUser} />
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

export default UserManager;

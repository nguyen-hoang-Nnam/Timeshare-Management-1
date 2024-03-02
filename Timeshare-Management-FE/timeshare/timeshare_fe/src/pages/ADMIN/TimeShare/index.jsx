import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Image,
  Input,
  Menu,
  Row,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../../Components/Layouts/LayoutAdmin";
import Notice from "../../../Components/Notice";
import "../UserManager/styles.css";
import ModalUpdate from "./components/ModalUpdate";
import TimeShareService from "../../../services/TimeShareService";
import { FAILBACK } from "../../../constants/constants";
const { Search } = Input;
const TimeShare = () => {
  const [loading, setLoading] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [listUser, setListUser] = useState([]);
  const handleGetList = async () => {
    try {
      setLoading(true);
      const res = await TimeShareService.getAllTimeshare();
      if (!res.isSucceed) return;
      setListUser(res.result);
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteTimeShare = async (id) => {
    try {
      setLoading(true);
      const res = await TimeShareService.deleteUser(id);
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
      title: "TimeShare Name",
      dataIndex: "timeshareName",
      key: "timeshareName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (val) => (
        <Image src={val} alt="" fallback={FAILBACK} style={{ width: 80 }} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
                <span style={{ marginLeft: 8 }}>Update TimeShare</span>
              </Menu.Item>
              <Menu.Item
                key="5"
                style={{ color: "#ED1117" }}
                onClick={() => {
                  handleDeleteTimeShare(record.timeshareId);
                }}
              >
                <DeleteOutlined />
                <span style={{ marginLeft: 8 }}>Delete TimeShare</span>
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
            <Col style={{ width: 160 }}>
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                size={"middle"}
                onClick={() => {
                  setOpenModalUpdate(true);
                }}
              >
                Add TimeShare
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

export default TimeShare;

import { Col, Menu, Row } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItems from "./MenuItems";
import "./styles.css";
const LayoutAdmin = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, [location?.pathname]);
  const onClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };
  return (
    <div className="sidebar-wrap">
      <Row gutter={20} style={{ flexWrap: "nowrap" }}>
        <Col style={{ marginLeft: -20 }}>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={[location?.pathname]}
            mode="inline"
            items={MenuItems}
          />
        </Col>
        <Col
          flex="auto"
          style={{
            width: 0,
            height: "calc(100vh - 50px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Col>
      </Row>
    </div>
  );
};

export default LayoutAdmin;

import React, { FC } from "react";
import { Col, Form, Row, Typography } from "antd";

const { Item } = Form;
const { Text } = Typography;

interface ScreenValue {
  nameItem: string;
  title: string;
  current: any;
}

const StaticScreenValue: FC<ScreenValue> = (props: ScreenValue) => {
  const { nameItem, current, title } = props;
  return (
    <>
      <Item name={nameItem}>
        <Row gutter={[16, 8]}>
          <Col span={8}>
            <Text type="secondary" italic>{`${title}: `}</Text>
          </Col>
          <Col span={16}>
            <Text keyboard>{current}</Text>
          </Col>
        </Row>
      </Item>
    </>
  );
};

export default StaticScreenValue;

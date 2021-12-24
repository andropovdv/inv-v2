/* eslint-disable react-hooks/exhaustive-deps */
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Form,
  Select,
  Skeleton,
  Input,
  Button,
  Space,
  Typography,
  Spin,
  Row,
  Col,
} from "antd";
import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IDevice } from "../../models/IDevice";
import { rules } from "../../utils/rules";

const { Text } = Typography;

interface DeviceProps {
  visibly: boolean;
  title: any;
  setVisibly: (v: boolean) => void;
  submit: (device: IDevice) => void;
}

const DeviceModal: FC<DeviceProps> = (props: DeviceProps) => {
  const { getValue } = useActions();
  const { values, isLoading, valuesField } = useTypedSelector(
    (state) => state.values
  );

  const { visibly, title, setVisibly, submit } = props;
  const [form] = Form.useForm();

  // start test array form
  const [arrayField, setArrayField] = React.useState<any[]>([]);
  const [val, setVal] = React.useState();

  React.useEffect(() => {
    // getValue();
    // getType();
    getVendor();
  }, []);

  React.useEffect(() => {
    getValue(undefined, undefined, val);
    // createFieldsForm();
  }, [val]);

  const createFieldsForm = () => {
    console.log("end isLoading:", isLoading);
    const map = valuesField.reduce((acc: any, cur: any) => {
      acc[cur.typeInfoId] = acc[cur.typeInfoId] || {
        id: cur.typeInfoId,
        propOne: "",
        propType: "",
        val: [],
      };
      acc[cur.typeInfoId].propOne = cur.type_info.preferense;
      acc[cur.typeInfoId].propType = cur.type_info.type_preferense;
      acc[cur.typeInfoId].val.push(cur.value);
      return acc;
    }, {});
    const result = Object.values(map);
    console.log("Result: ", result);
    setArrayField(result);
    console.log("finish isLoading:", isLoading);
  };

  // let arrayField: any[] = [];
  const getPrefById = (val: any) => {
    setVal(val);
  };

  // end test array form

  const { getType, getVendor } = useActions();

  const { types, isLoading: isLoadingTypes } = useTypedSelector(
    (state) => state.types
  );
  const { vendors, isLoading: isLoadingVendor } = useTypedSelector(
    (state) => state.vendors
  );

  // get Types

  const exitBtn = () => {
    setVisibly(false);
  };

  const submitBtn = () => {
    form.validateFields().then((values) => {
      // submit(values);
      console.log("values:", values);
      form.resetFields();
    });
  };

  return (
    <div>
      <Modal
        visible={visibly}
        title={title}
        onCancel={exitBtn}
        onOk={submitBtn}
        forceRender
        destroyOnClose={true}
      >
        <Form form={form} preserve={false}>
          <Form.Item name="type" rules={[rules.required()]}>
            {isLoadingTypes ? (
              <Skeleton.Input
                style={{ width: 472 }}
                active={true}
                size="small"
              />
            ) : (
              <Select
                placeholder="Тип оборудования"
                onSelect={(val) => getPrefById(val)}
                // onChange={(val) => getPrefById(val)}
              >
                {types.map((el) => (
                  <Select.Option key={el.id} value={el.id ? el.id : ""}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item name="vendor" rules={[rules.required()]}>
            {isLoadingVendor ? (
              <Skeleton.Input
                style={{ width: 472 }}
                active={true}
                size="small"
              />
            ) : (
              <Select placeholder="Производитель">
                {vendors.map((el) => (
                  <Select.Option key={el.id} value={el.id ? el.id : ""}>
                    {el.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item name="name" rules={[rules.required()]}>
            <Input placeholder="Модель" />
          </Form.Item>
          {isLoading ? (
            <Space size="large">
              <Text type="secondary">Loading</Text>
              <Spin size="large" />
            </Space>
          ) : (
            <>
              {valuesField.map((el: any, index) => (
                <Row key={el.id}>
                  <Col span={6}>
                    <Form.Item
                      name={["info", index, "title"]}
                      initialValue={el.propOne}
                    >
                      <Text>{`${el.propOne}:`}</Text>
                      {/* <Input disabled bordered={false} /> */}
                    </Form.Item>
                  </Col>
                  <Col span={18}>
                    <Form.Item name={["info", index, "desc"]}>
                      {el.propType === "STRING" ? (
                        <Input />
                      ) : (
                        <Select placeholder="Choose">
                          {el.val.map((e: any, index: any) => (
                            <Select.Option key={index} value={e ? e : "not"}>
                              {e}
                            </Select.Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              ))}
            </>
          )}
          {/* {arrayField.map((el, index) => (
            <Space>
              <Form.Item
                name={["info", index, "title"]}
                initialValue={el.propOne}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item name={["info", index, "desc"]}>
                {el.propType === "STRING" ? (
                  <Input />
                ) : (
                  <div style={{ width: 175 }}>
                    <Select placeholder="Choose">
                      {el.val.map((el: any) => (
                        <Select.Option value={el}>{el}</Select.Option>
                      ))}
                    </Select>
                  </div>
                )}
              </Form.Item>
            </Space>
          ))} */}
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceModal;

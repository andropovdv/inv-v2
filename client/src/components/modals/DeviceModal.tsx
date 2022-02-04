/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Form, Select, Input, Typography, Row, Col } from "antd";
import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CurrentDevice, IDevice } from "../../models/IDevice";
import { rules } from "../../utils/rules";
import TypesDropDown from "../dropdown/TypesDropDown";
import VendorsDropDown from "../dropdown/VendorsDropDown";
import StaticScreenValue from "./StaticScreenValue";

const { Text } = Typography;
const { Item } = Form;

interface DeviceProps {
  visibly: boolean;
  title: any;
  current?: CurrentDevice;
  mode: boolean;
  setVisibly: (v: boolean) => void;
  submit: (device: IDevice) => void;
}

const DeviceModal: FC<DeviceProps> = (props: DeviceProps) => {
  const { visibly, title, setVisibly, submit, current, mode } = props;

  const { getValue, setFieldValue } = useActions();
  const { valuesField } = useTypedSelector((state) => state.values);

  const [form] = Form.useForm();

  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    getValue(undefined, undefined, val);
  }, [val]);

  React.useEffect(() => {
    form.resetFields();
    if (mode) {
      form.setFieldsValue(current);
    } else {
      form.setFieldsValue({
        name: current?.name,
        value: current?.name,
        id: current?.id,
      });
      getValue(undefined, undefined, current?.typeId);
    }
    // form.setFieldsValue(current);
  }, [form, current]);

  const getPrefById = (val: any) => {
    console.log("Val:", val);
    setVal(val);
  };

  const exitBtn = () => {
    setVisibly(false);
    form.resetFields();
    // setFieldValue([]);
  };

  const submitBtn = () => {
    form.validateFields().then((values) => {
      submit(values);
      form.resetFields();
    });
  };

  return (
    <>
      <Modal
        visible={visibly}
        title={title}
        onCancel={exitBtn}
        onOk={submitBtn}
        forceRender
        destroyOnClose={true}
      >
        <Form form={form} preserve={false}>
          {mode ? (
            <>
              <TypesDropDown onSelect={getPrefById} />
              <VendorsDropDown />
            </>
          ) : (
            <>
              <StaticScreenValue
                nameItem="typeId"
                title="Тип оборудования"
                current={current?.nType}
              />
              <StaticScreenValue
                nameItem="vendorId"
                title="Производитель"
                current={current?.nVendor}
              />
            </>
          )}
          <Item hidden name="id">
            <Input type="hidden" />
          </Item>
          <Item name="name" rules={[rules.required()]}>
            <Input placeholder="Модель" />
          </Item>

          <Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.typeId !== currentValues.typeId
            }
          >
            {() => {
              if (!mode) {
                return current?.info.map((el, index) => (
                  <Row key={index}>
                    <Col span={6}>
                      <Item
                        name={["info", index, "title"]}
                        initialValue={el.title}
                      >
                        <Text>{`${el.title}:`}</Text>
                      </Item>
                    </Col>
                    <Col span={18}>
                      {/* <pre style={{ color: "red" }}> */}
                      <Item
                        name={["info", index, "desc"]}
                        initialValue={el.description}
                      >
                        {valuesField.find((e: any) => el.title === e.propOne)
                          ?.propType === "STRING" ? (
                          <Input
                            suffix={
                              valuesField.find(
                                (e: any) => el.title === e.propOne
                              )?.unit
                            }
                          />
                        ) : (
                          <Select>
                            {valuesField
                              .find((e: any) => el.title === e.propOne)
                              ?.val?.map((z, idx) => (
                                <Select.Option key={idx} value={z}>
                                  {z}
                                </Select.Option>
                              ))}
                          </Select>
                        )}
                      </Item>
                      {/* </pre> */}
                      {/* {el.description} */}
                    </Col>
                  </Row>
                ));
              }
              return (
                <>
                  {valuesField.map((el: any, index: any) => (
                    <Row key={el.id}>
                      <Col span={6}>
                        <Form.Item
                          name={["info", index, "title"]}
                          initialValue={el.propOne}
                        >
                          <Text>{`${el.propOne}:`}</Text>
                        </Form.Item>
                      </Col>
                      <Col span={18}>
                        <Form.Item name={["info", index, "desc"]}>
                          {el.propType === "STRING" ? (
                            <Input suffix={el.unit} />
                          ) : (
                            <Select placeholder="Choose">
                              {el.val.map((e: any, index: any) => (
                                <Select.Option
                                  key={index}
                                  value={e ? e : "not"}
                                >
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
              );
            }}
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default DeviceModal;

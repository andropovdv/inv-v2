/* eslint-disable react-hooks/exhaustive-deps */
import { MoreOutlined } from "@ant-design/icons";
import { Divider, Form, Select } from "antd";
import React, { FC } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { pagination } from "../../utils/consts";
import { rules } from "../../utils/rules";

const { Option } = Select;
const { Item } = Form;

const TypesDropDown: FC = () => {
  const { typesDropdown, isLoading, count } = useTypedSelector(
    (state) => state.types
  );
  const { getTypeDropdown, removeTypeDropDown } = useActions();

  const [isOpen, setIsOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const pageCount = Math.ceil(count / pagination.pageSize);

  const onFocus = () => {
    if (typesDropdown.length > 0) removeTypeDropDown([]);
    setPage(1);
    getTypeDropdown();
    if (!isLoading) {
      setIsOpen(true);
    }
  };

  const onBlur = () => {
    setIsOpen(false);
    removeTypeDropDown([]);
  };

  const nextPage = (e: any) => {
    e.persist();
    const { target } = e;
    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      page < pageCount
    ) {
      const nextPage = page + 1;
      getTypeDropdown(nextPage, pagination.pageSize);
      setPage(nextPage);
    }
  };

  const showMore = (menu: any) => (
    <>
      {menu}
      <Divider style={{ margin: "4px 0" }} />
      <div style={{ padding: "8px", textAlign: "center" }}>
        <MoreOutlined rotate={90} />
      </div>
    </>
  );

  return (
    <div>
      <Item name="typeId" style={{ width: "100%" }} rules={[rules.required()]}>
        <Select
          open={isOpen}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={() => setIsOpen(false)}
          listHeight={150}
          loading={isLoading}
          onPopupScroll={nextPage}
          dropdownRender={page < pageCount ? showMore : undefined}
          placeholder="Тип оборудования"
        >
          {typesDropdown.map((el) => (
            <Option key={el.id} value={el.id}>
              {el.name}
            </Option>
          ))}
        </Select>
      </Item>
    </div>
  );
};

export default TypesDropDown;

import React, { FC } from "react";
import { Select, Form, Divider } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { pagination } from "../../utils/consts";
import { MoreOutlined } from "@ant-design/icons";
import { rules } from "../../utils/rules";

const { Option } = Select;
const { Item } = Form;

const PropertyDropDown: FC = () => {
  const { isLoading, count, propertisDropDown } = useTypedSelector(
    (state) => state.propertis
  );
  const { getPropertyDropdown, removePropertyDropdown } = useActions();

  const [isOpen, setIsOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const pageCount = Math.ceil(count / pagination.pageSize);

  const onFocus = () => {
    setPage(1);
    getPropertyDropdown();
    if (!isLoading) {
      setIsOpen(true);
    }
  };

  const onBlur = () => {
    setIsOpen(false);
    removePropertyDropdown([]);
  };

  const nextPage = (e: any) => {
    e.persist();
    const { target } = e;
    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      page < pageCount
    ) {
      const nextPage = page + 1;
      getPropertyDropdown(nextPage, pagination.pageSize);
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
      <Item
        name="typeInfoId"
        style={{ width: "100%" }}
        rules={[rules.required()]}
      >
        <Select
          placeholder="Характеристика"
          open={isOpen}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={() => setIsOpen(false)}
          loading={isLoading}
          listHeight={150}
          onPopupScroll={nextPage}
          dropdownRender={page < pageCount ? showMore : undefined}
        >
          {propertisDropDown.map((el) => (
            <Option key={el.id} value={el.id}>
              {el.preferense}
            </Option>
          ))}
        </Select>
      </Item>
    </div>
  );
};

export default PropertyDropDown;

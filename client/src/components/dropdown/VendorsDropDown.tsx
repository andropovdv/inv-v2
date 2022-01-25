import React, { FC } from "react";
import { Divider, Form, Select } from "antd";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { pagination } from "../../utils/consts";
import { rules } from "../../utils/rules";
import { MoreOutlined } from "@ant-design/icons";

const { Option } = Select;
const { Item } = Form;

const VendorsDropDown: FC = () => {
  const { vendorsDropDown, isLoading, count } = useTypedSelector(
    (state) => state.vendors
  );
  const { getVendorDropdown, removeVendorDropDown } = useActions();

  const [isOpen, setIsOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const pageCount = Math.ceil(count / pagination.pageSize);

  const onFocus = () => {
    if (vendorsDropDown.length > 0) removeVendorDropDown([]);
    setPage(1);
    getVendorDropdown();
    if (!isLoading) {
      setIsOpen(true);
    }
  };

  const onBlur = () => {
    setIsOpen(false);
  };

  const nextPage = (e: any) => {
    e.persist();
    const { target } = e;
    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      page < pageCount
    ) {
      const nextPage = page + 1;
      getVendorDropdown(nextPage, pagination.pageSize);
      setPage(nextPage);
    }
  };

  const showMore = (menu: any) => (
    <>
      {menu}
      <Divider style={{ margin: "4px 0 " }} />
      <div style={{ padding: "8px", textAlign: "center" }}>
        <MoreOutlined rotate={90} />
      </div>
    </>
  );

  return (
    <>
      <Item
        name="vendorId"
        style={{ width: "100%" }}
        rules={[rules.required()]}
      >
        <Select
          open={isOpen}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={() => setIsOpen(false)}
          listHeight={150}
          loading={isLoading}
          onPopupScroll={nextPage}
          dropdownRender={page < pageCount ? showMore : undefined}
          placeholder="Призводитель"
        >
          {vendorsDropDown.map((el) => (
            <Option key={el.id} value={el.id}>
              {el.name}
            </Option>
          ))}
        </Select>
      </Item>
    </>
  );
};

export default VendorsDropDown;

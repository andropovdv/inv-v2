import { Input } from "antd";
import React, { FC } from "react";

interface InProps {
  value: any;
  // onChange: () => void;
}

const NumberInput: FC<InProps> = ({ value = {} }) => {
  // const { value, onChange } = props;
  const [number, setNumber] = React.useState(0);

  const onNumberChange = (e: any) => {
    const newNumber = parseInt(e.target.value || "0", 10);

    if (Number.isNaN(number)) {
      return;
    }

    if (!("number" in value)) {
      setNumber(newNumber);
    }
  };

  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: "100%" }}
      />
    </span>
  );
};

export default NumberInput;

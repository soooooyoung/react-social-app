import { SearchOutlined } from "@ant-design/icons";
import { Input, InputProps } from "antd";
import { useState } from "react";
import "./SearchInput.css";

interface Props extends InputProps {
  onSearch?: (value?: string) => void;
}

export const SearchInput = (props: Props) => {
  const [value, setValue] = useState<string>();

  const handleSubmit = () => {
    const str = value?.replaceAll(" ", "");
    if (props.onSearch && str) props.onSearch(value);
  };

  return (
    <Input
      className="searchInput"
      placeholder="Search SNSUS"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
      prefix={<SearchOutlined />}
      {...props}
      onPressEnter={handleSubmit}
      onSubmit={handleSubmit}
    />
  );
};

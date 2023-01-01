import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./SearchInput.css";

export const SearchInput = () => {
  return (
    <Input
      className="searchInput"
      placeholder="Search SNSUS"
      prefix={<SearchOutlined />}
    />
  );
};

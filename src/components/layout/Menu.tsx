import { Dropdown, MenuProps } from "antd";
import "./Menu.scss";

interface Props {
  icon: React.ReactNode;
  items?: MenuProps["items"];
}

export const Menu = ({ items, icon }: Props) => {
  return (
    <div className="menu-wrapper">
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        overlayClassName="menu"
        overlayStyle={{ position: "fixed" }}
      >
        {icon}
      </Dropdown>
    </div>
  );
};

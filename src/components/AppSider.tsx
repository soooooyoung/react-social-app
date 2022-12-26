import Sider, { SiderProps } from "antd/es/layout/Sider";

export const AppSider = (
  props: SiderProps & React.RefAttributes<HTMLDivElement>
) => {
  return <Sider {...props}>sider</Sider>;
};

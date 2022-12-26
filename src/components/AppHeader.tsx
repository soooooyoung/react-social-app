import { Button } from "antd";
import { BasicProps, Header } from "antd/es/layout/layout";

export const AppHeader = (
  props: BasicProps & React.RefAttributes<HTMLElement>
) => {
  return (
    <Header {...props}>
      <span>SNSUS</span>
      <Button>Log Out</Button>
    </Header>
  );
};

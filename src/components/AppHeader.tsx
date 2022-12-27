import { Button } from "antd";
import { BasicProps, Header } from "antd/es/layout/layout";
import Cookies from "js-cookie";
import { reset } from "../app/authSlice";
import { useAppDispatch } from "../app/hooks";

export const AppHeader = (
  props: BasicProps & React.RefAttributes<HTMLElement>
) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(reset());
  };

  return (
    <Header {...props}>
      <span>SNSUS</span>
      <Button onClick={handleLogout}>Log Out</Button>
    </Header>
  );
};

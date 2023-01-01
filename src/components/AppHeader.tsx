import { Button } from "antd";
import { reset } from "../app/authSlice";
import { useAppDispatch } from "../app/hooks";
import { SearchInput } from "./SearchInput";

export const AppHeader = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // TODO: remove cookie server request
    dispatch(reset());
  };

  return (
    <div {...props}>
      <span className="logo-symbol noselect">S</span>
      <SearchInput />
      <div className="flex-space" />
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
};

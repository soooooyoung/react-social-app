import { BasicProps, Footer } from "antd/es/layout/layout";

export const AppFooter = (
  props: BasicProps & React.RefAttributes<HTMLElement>
) => {
  return <Footer {...props}>footer</Footer>;
};

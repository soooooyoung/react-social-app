import { Space } from "antd";
import { BasicProps, Footer } from "antd/es/layout/layout";

export const AppFooter = (
  props: BasicProps & React.RefAttributes<HTMLElement>
) => {
  return (
    <Footer {...props}>
      <div>
        <a>English</a> <a>한국어</a>
      </div>
      <div className="separator" />
      <span>Shanabunny © 2023</span>
    </Footer>
  );
};

import { Anchor } from "antd";
import { BasicProps, Footer } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";

export const AppFooter = (
  props: BasicProps & React.RefAttributes<HTMLElement>
) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: "ko" | "en") => {
    i18n.changeLanguage(lang);
  };

  return (
    <Footer {...props}>
      <div>
        <a onClick={() => changeLanguage("en")}>English</a>{" "}
        <a onClick={() => changeLanguage("ko")}>한국어</a>
      </div>
      <div className="separator" />
      <span>Shanabunny © 2023</span>
    </Footer>
  );
};

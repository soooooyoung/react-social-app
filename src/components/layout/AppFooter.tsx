import { BasicProps, Footer } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";

export const AppFooter = (
  props: BasicProps & React.RefAttributes<HTMLElement>
) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage("ko");
  };

  return (
    <Footer {...props}>
      <div>
        {t("Hello")}
        <a>English</a> <a onClick={changeLanguage}>한국어</a>
      </div>
      <div className="separator" />
      <span>Shanabunny © 2023</span>
    </Footer>
  );
};

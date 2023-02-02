import { useTranslation } from "react-i18next";
import "../../style/RecentLogins.scss";

interface Props {
  className?: string;
}

export const RecentLogins = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={`recentlogins ${className}`}>
      <span className="logo">snsus</span>
      <span className="title">{t("Recent Logins")}</span>
      <span className="description">
        {t("Click your picture or add an account")}
      </span>
    </div>
  );
};

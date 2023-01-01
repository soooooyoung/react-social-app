import "./RecentLogins.css";

interface Props {
  className?: string;
}

export const RecentLogins = ({ className }: Props) => {
  return (
    <div className={`recentlogins ${className}`}>
      <span className="logo">snsus</span>
      <span className="title">Recent Logins</span>
      <span className="description">Click your picture or add an account</span>
    </div>
  );
};

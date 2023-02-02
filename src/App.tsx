import { Layout, theme } from "antd";
import { AppHeader } from "./components/layout/AppHeader";
import { selectAuth } from "./app/redux/authSlice";
import { useAppSelector } from "./app/hooks";
import { Router } from "./components/routing/Router";
import { AppFooter } from "./components/layout/AppFooter";
import { withTranslation } from "react-i18next";

const { Content } = Layout;
const { useToken } = theme;

function App() {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { token } = useToken();

  return (
    <Layout className="wrapper">
      {isAuthenticated && (
        <AppHeader className="header" style={{ color: token.colorPrimary }} />
      )}
      <Layout>
        <Content className="content">
          <Router />
        </Content>
      </Layout>
      {!isAuthenticated && <AppFooter className="footer" />}
    </Layout>
  );
}

export default withTranslation()(App);

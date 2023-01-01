import { Layout, theme } from "antd";
import { AppHeader } from "./components/AppHeader";
import { selectAuth } from "./app/authSlice";
import { useAppSelector } from "./app/hooks";
import { Router } from "./components/Router";
import { AppFooter } from "./components/AppFooter";

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
      <AppFooter className="footer" />
    </Layout>
  );
}

export default App;

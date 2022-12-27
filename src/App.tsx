import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { selectAuth } from "./app/authSlice";
import { useAppSelector } from "./app/hooks";
import { AppHeader } from "./components/AppHeader";
import { Router } from "./components/Router";

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
    </Layout>
  );
}

export default App;

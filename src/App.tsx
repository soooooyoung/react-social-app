import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useCheckAuthentication } from "./api/auth";
import { selectAuth, setIsAuthenticated } from "./app/authSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AppHeader } from "./components/AppHeader";
import { AppSider } from "./components/AppSider";
import { Router } from "./components/Router";
import { showErrorModal } from "./utils/responseUtils";

const { useToken } = theme;

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, authToken } = useAppSelector(selectAuth);
  const {
    data: checkAccessToken,
    status,
    error,
  } = useCheckAuthentication(authToken, {
    enabled: isAuthenticated,
  });
  const { token } = useToken();

  useEffect(() => {
    if (!checkAccessToken) {
      dispatch(setIsAuthenticated(false));
    }
  }, [checkAccessToken, dispatch]);

  useEffect(() => {
    if (status === "error") {
      showErrorModal(error);
      dispatch(setIsAuthenticated(false));
    }
  }, [status, error, dispatch]);

  return (
    <Layout className="wrapper">
      {isAuthenticated && (
        <AppHeader className="header" style={{ color: token.colorPrimary }} />
      )}
      <Layout>
        {/* {isAuthenticated && <AppSider className="sider" />} */}
        <Content className="content">
          <Router />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

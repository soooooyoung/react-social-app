import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useCheckAuth } from "./api/auth";
import { selectAuth } from "./app/authSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { AppHeader } from "./components/AppHeader";
import { Router } from "./components/Router";
import { persistStore } from "redux-persist";
import { useEffect } from "react";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import Cookies from "js-cookie";

const { useToken } = theme;

function App() {
  const dispatch = useAppDispatch();
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

import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Spin } from "antd";
import { showErrorModal } from "../utils/responseUtils";
import { AuthResponse, LoginParams } from "../models";
import { useAppDispatch } from "../app/hooks";
import { setAuth } from "../app/redux/authSlice";
import { useTranslation } from "react-i18next";
import { useLogin } from "../api/auth";
import { RecentLogins } from "../components/layout/RecentLogins";
import "../style/SigninPage.scss";

export const SigninPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useLogin();
  const { t } = useTranslation();

  const onFinish = async (values: LoginParams) => {
    await mutateAsync(values, {
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: (data) => {
        const response = data as AxiosResponse<AuthResponse>;
        if (response.data.success) {
          dispatch(setAuth(response.data));
          navigate("/");
        } else {
          showErrorModal(`${t("Wrong Password or Username")}`);
        }
        return data;
      },
    });
  };

  const onFinishFailed = () => {
    showErrorModal();
  };

  return (
    <div className="container">
      <RecentLogins className="signin-content-wrapper" />
      <div className="signin-content-wrapper">
        <Spin spinning={isLoading}>
          <Form
            className="form"
            name="login"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
            colon={false}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your username!")}`,
                },
              ]}
            >
              <Input
                maxLength={100}
                placeholder={`${t("Enter your username")}`}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your password!")}`,
                },
              ]}
            >
              <Input.Password
                maxLength={100}
                placeholder={`${t("Enter your password")}`}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <div className="ui-button">
              <Button type="primary" htmlType="submit">
                {t("Log In")}
              </Button>
              <a>{t("Forgot password?")}</a>
              <div className="separator"></div>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                {t("Create new account")}
              </Button>
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

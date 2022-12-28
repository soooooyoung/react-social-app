import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Space, Spin } from "antd";
import { redirect } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useAppDispatch } from "../app/hooks";
import { useLogin } from "../api/auth";
import { setAuth } from "../app/authSlice";
import { showErrorModal } from "../utils/responseUtils";
import { AuthResponse, LoginParams } from "../models";
import "./SigninPage.css";

export const SigninPage = () => {
  const dispatch = useAppDispatch();
  const { mutateAsync, isLoading } = useLogin();

  const onFinish = async (values: LoginParams) => {
    await mutateAsync(values, {
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: (data) => {
        const response = data as AxiosResponse<AuthResponse>;
        if (response.data.success) {
          dispatch(setAuth(response.data));
          redirect("/");
        } else {
          showErrorModal("Wrong Password or Email");
        }
        return data;
      },
    });
  };

  const onFinishFailed = () => {
    showErrorModal();
  };

  return (
    <div className="signin-container">
      <div className="login-form-wrapper">
        <Spin spinning={isLoading}>
          <Form
            className="form"
            name="login"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            requiredMark={false}
            colon={false}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input maxLength={100} placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                maxLength={100}
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Space direction="horizontal">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <Form.Item>
                <Button disabled>Join</Button>
              </Form.Item>
            </Space>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

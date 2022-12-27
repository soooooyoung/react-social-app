import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Space, Spin } from "antd";
import { useLogin } from "../api/auth";
import { LoginParams } from "../models";
import "./SigninPage.css";

export const SigninPage = () => {
  const { mutateAsync, isLoading } = useLogin();

  const onFinish = async (values: LoginParams) => {
    const response = await mutateAsync(values);
    console.log(response);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Space direction="horizontal">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              <Form.Item>
                <Button>Join</Button>
              </Form.Item>
            </Space>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

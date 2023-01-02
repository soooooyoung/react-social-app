import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Skeleton, Spin } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectLoading, setLoading } from "../app/loadingSlice";
import { ReCaptcha } from "../components/ReCaptcha";
import welcome from "../img/welcome.png";
import { showErrorModal } from "../utils/responseUtils";
import "./SignupPage.css";

export const SignupPage = () => {
  const [recaptchaStatus, setRecaptchaStatus] = useState<boolean>(false);
  const loading = useAppSelector(selectLoading);

  const onFinish = () => {
    showErrorModal("Sign up Service Not Available. Please check back later.");
  };

  const onFinishFailed = () => {};

  const onChangeReCaptchaStatus = (verified: boolean) => {
    setRecaptchaStatus(verified);
  };

  return (
    <div className="signup-container">
      <div className="logo-mobile">
        <span className="logo">snsus</span>
      </div>
      <div className="signup-content welcome">
        <span className="signup-title">Welcome to SNSUS! </span>
        <div className="separator" />
        <img src={welcome} alt="" />
      </div>
      <Spin spinning={loading}>
        <div className="signup-content">
          <span className="signup-title">Sign Up with E-mail</span>
          <div className="separator" />
          <Form
            className="signup-form"
            name="login"
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            requiredMark={false}
            colon={false}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter valid E-mail!",
                  type: "email",
                },
              ]}
            >
              <Input
                type="E-mail"
                maxLength={150}
                placeholder="Enter your E-mail"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please  enter valid username!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("value")) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input maxLength={100} placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please   enter valid password!" },
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

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
            <div className="ui-button">
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </div>
            <Form.Item
              name="recaptcha"
              style={{ textAlign: "center" }}
              rules={[
                {
                  required: true,
                  message: "@$#!@@#!!!",
                },
                () => ({
                  validator(_) {
                    if (!recaptchaStatus) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <ReCaptcha onChange={onChangeReCaptchaStatus} />
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  );
};

import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  HeartOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useCheckIsSafe, useSendSignupEmail } from "../api/signup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectLoading, setLoading } from "../app/redux/loadingSlice";
import { ReCaptcha } from "../components/ReCaptcha";
import { Response, User } from "../models";
import { showErrorModal } from "../utils/responseUtils";
import welcome from "../img/welcome.png";
import "../style/SignupPage.scss";

export const SignupPage = () => {
  const [recaptchaStatus, setRecaptchaStatus] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutateAsync: checkIsSafe } = useCheckIsSafe();
  const { mutateAsync: sendSignupEmail } = useSendSignupEmail();

  const onFinish = async (values: any) => {
    dispatch(setLoading(true));
    await checkIsSafe(
      { ...values, type: "EMAIL" },
      {
        onError: (e) => {
          showErrorModal(e.message);
          dispatch(setLoading(false));
        },
        onSuccess: async (data) => {
          const isSafe = (data as AxiosResponse<Response>).data.success;
          if (isSafe) {
            await onSendConfimationEMail(values);
          }
        },
      }
    );
  };

  const onSendConfimationEMail = async (user: User) => {
    await sendSignupEmail(user, {
      onError: (e) => showErrorModal(e.message),
      onSuccess: (data) => {
        dispatch(setLoading(false));
        setModalVisible(true);
      },
    });
  };

  const onModalOk = () => {
    navigate("/login");
  };

  const onFinishFailed = () => {};

  const onChangeReCaptchaStatus = (verified: boolean) => {
    setRecaptchaStatus(verified);
  };

  return (
    <>
      <Modal
        title={
          <>
            <span>Confirmation Email Sent</span> <HeartOutlined />
          </>
        }
        open={modalVisible}
        onOk={onModalOk}
        cancelButtonProps={{ style: { display: "none" } }}
        closable={false}
        destroyOnClose
      >
        <span> Please check your email to complete your sign up process.</span>
      </Modal>
      <div className="signup-container">
        <div className="logo-mobile">
          <span className="logo">snsus</span>
        </div>
        <div className="signup-content welcome">
          <span className="signup-title">Welcome to SNSUS! </span>
          <div className="separator" />
          <img src={welcome} alt="" />
        </div>
        <Spin spinning={loading} indicator={<LoadingOutlined />}>
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
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("Please accept agreement")),
                  },
                ]}
              >
                <Checkbox>
                  I Agree to{" "}
                  <a href="/terms" target="_blank">
                    Terms & Service
                  </a>
                </Checkbox>
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
    </>
  );
};

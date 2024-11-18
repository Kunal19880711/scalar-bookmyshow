import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";
import strings from "../constants/l10n";
import { ResetPassword } from "../api/user";
import { extractErrorMsg } from "../utils";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await ResetPassword(values);
      if (response?.success) {
        message.success(response?.message);
        navigate(Paths.Login);
      }
    } catch (err) {
      message.error(extractErrorMsg(err));
    }
  };
  return (
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section>
          <h1>{strings.RESET_PASSWORD_HEADING}</h1>
        </section>
        <section className="right-section">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={strings.RESET_PASSWORD_FORM_OTP_LABEL}
              htmlFor="otp"
              name="otp"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: strings.RESET_PASSWORD_FORM_OTP_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input
                id="otp"
                type="text"
                placeholder={strings.RESET_PASSWORD_FORM_OTP_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              label={strings.RESET_PASSWORD_FORM_NEW_PASSWORD_LABEL}
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[
                {
                  required: true,
                  message:
                    strings.RESET_PASSWORD_FORM_NEW_PASSWORD_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input.Password
                id="password"
                type="password"
                placeholder={
                  strings.RESET_PASSWORD_FORM_NEW_PASSWORD_PLACEHOLDER
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                {strings.RESET_PASSWORD_FORM_SUBMIT_BUTTON}
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section>
          <p>
            {strings.RESET_PASSWORD_GENERATE_NEW_OTP}
            &nbsp;
            <Link to={Paths.ForgotPassword}>
              {strings.RESET_PASSWORD_GENERATE_OTP_AGAIN}
            </Link>
          </p>
        </section>
      </main>
    </header>
  );
};

export default ResetPasswordPage;

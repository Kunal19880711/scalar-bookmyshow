import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";
import strings from "../constants/l10n";
import { ForgotPassword } from "../api/user";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await ForgotPassword(values);
      if (response.success) {
        message.success(response.message);
        navigate(Paths.ResetPassword);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section>
          <h1>{strings.FORGOT_PASSWORD_HEADING}</h1>
        </section>
        <section className="right-section">
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label={strings.LOGIN_FORM_EMAIL_LABEL}
              name="email"
              rules={[
                {
                  required: true,
                  message: strings.LOGIN_FORM_EMAIL_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input placeholder={strings.LOGIN_FORM_EMAIL_PLACEHOLDER} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                {strings.FORGOT_PASSWORD_FORM_SUBMIT_BUTTON}
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section>
          <p>
            {strings.FORGOT_PASSWORD_GO_TO_LOGIN}
            &nbsp;
            <Link to={Paths.Login}>{strings.FORGOT_PASSWORD_LOGIN_HERE}</Link>
          </p>
        </section>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;

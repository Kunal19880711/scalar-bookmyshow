import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";
import strings from "../constants/l10n";
import { RegisterUser } from "../api/user";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response?.success) {
        message.success(response?.message);
        navigate(Paths.Login);
      }
    } catch (error) {
      message.error(error?.message);
      console.log(error);
    }
  };
  return (
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section>
          <h1>{strings.PAGES_REGISTER_HEADING}</h1>
        </section>
        <section>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={strings.PAGES_REGISTER_FORM_NAME_LABEL}
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: strings.PAGES_REGISTER_FORM_NAME_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input
                id="name"
                type="text"
                placeholder={strings.PAGES_REGISTER_FORM_NAME_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              label={strings.PAGES_REGISTER_FORM_EMAIL_LABEL}
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: strings.PAGES_REGISTER_FORM_EMAIL_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input
                id="email"
                type="email"
                placeholder={strings.PAGES_REGISTER_FORM_EMAIL_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              label={strings.PAGES_REGISTER_FORM_PASSWORD_LABEL}
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[
                {
                  required: true,
                  message:
                    strings.PAGES_REGISTER_FORM_PASSWORD_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input.Password
                id="password"
                type="password"
                placeholder={
                  strings.PAGES_REGISTER_FORM_PASSWORD_PLACEHOLDER
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
                {strings.PAGES_REGISTER_FORM_SUBMIT}
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section>
          <p>
            {strings.PAGES_REGISTER_ALREADY_A_USER}{" "}
            <Link to={Paths.Login}>{strings.PAGES_REGISTER_LOGIN_NOW}</Link>
          </p>
        </section>
      </main>
    </header>
  );
};

export default Register;


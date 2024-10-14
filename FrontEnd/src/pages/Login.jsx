import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { LoginUser } from "../api/user";
import Paths from "../constants/Paths";
import strings from "../constants/l10n";
import { setToken } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response?.success) {
        message.success(response?.message);
        dispatch(setToken(response?.data));
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
          <h1>{strings.PAGES_LOGIN_HEADING}</h1>
        </section>
        <section>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={strings.PAGES_LOGIN_FORM_EMAIL_LABEL}
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: strings.PAGES_LOGIN_FORM_EMAIL_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input
                id="email"
                type="email"
                placeholder={strings.PAGES_LOGIN_FORM_EMAIL_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              label={strings.PAGES_LOGIN_FORM_PASSWORD_LABEL}
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: strings.PAGES_LOGIN_FORM_PASSWORD_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input.Password
                id="password"
                type="password"
                placeholder={strings.PAGES_LOGIN_FORM_PASSWORD_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                {strings.PAGES_LOGIN_FORM_SUBMIT}
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section>
          <p>
            {strings.PAGES_LOGIN_NEW_USER}{" "}
            <Link to={Paths.Register}>{strings.PAGES_LOGIN_REGISTER_NOW}</Link>
          </p>
        </section>
      </main>
    </header>
  );
};

export default Login;

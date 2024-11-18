import React from "react";
import { Form, Input, Button, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Paths from "../constants/Paths";
import strings from "../constants/l10n";
import { RegisterUser } from "../api/user";
import { extractErrorMsg } from "../utils";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
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
          <h1>{strings.REGISTER_HEADING}</h1>
        </section>
        <section className="right-section">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={strings.REGISTER_FORM_NAME_LABEL}
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: strings.REGISTER_FORM_NAME_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input
                id="name"
                type="text"
                placeholder={strings.REGISTER_FORM_NAME_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              label={strings.REGISTER_FORM_EMAIL_LABEL}
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: strings.REGISTER_FORM_EMAIL_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input
                id="email"
                type="email"
                placeholder={strings.REGISTER_FORM_EMAIL_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              label={strings.REGISTER_FORM_PASSWORD_LABEL}
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: strings.REGISTER_FORM_PASSWORD_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input.Password
                id="password"
                type="password"
                placeholder={strings.REGISTER_FORM_PASSWORD_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              label={strings.REGISTER_FORM_REGISTER_AS_PARTNER_LABEL}
              htmlFor="role"
              name="role"
              className="d-block text-center"
              initialValue={"user"}
              rules={[
                {
                  required: true,
                  message:
                    strings.REGISTER_FORM_REGISTER_AS_PARTNER_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Radio.Group>
                <Radio value={"user"}>
                  {strings.REGISTER_FORM_REGISTER_AS_PARTNER_OPTION_NO}
                </Radio>
                <Radio value={"partner"}>
                  {strings.REGISTER_FORM_REGISTER_AS_PARTNER_OPTION_YES}
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                {strings.REGISTER_FORM_SUBMIT_BUTTON}
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section>
          <p>
            {strings.REGISTER_ALREADY_A_USER}
            &nbsp;
            <Link to={Paths.Login}>{strings.REGISTER_LOGIN_NOW}</Link>
          </p>
        </section>
      </main>
    </header>
  );
};

export default Register;

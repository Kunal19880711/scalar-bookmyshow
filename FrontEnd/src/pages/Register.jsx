import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../constants/Paths";
import { RegisterUser } from "../api/user";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log("Success:", values);
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
          <h1>Register to Bookmyshow</h1>
        </section>
        <section>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input id="name" type="text" placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input id="email" type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section>
          <p>
            Already a user ? <Link to={Paths.Login}>Login Now</Link>
          </p>
        </section>
      </main>
    </header>
  );
};

export default Register;


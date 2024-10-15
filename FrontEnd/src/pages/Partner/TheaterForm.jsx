import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import React from "react";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { UpdateTheater, AddTheater } from "../../api/theater";
import strings from "../../constants/l10n";

const TheaterForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheater,
  setSelectedTheater,
  getData,
  formType,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const formTitle =
    formType === "edit"
      ? strings.PAGES_PARTNER_THEATERFORM_HEADING_EDIT_THEATER
      : strings.PAGES_PARTNER_THEATERFORM_HEADING_ADD_THEATER;

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheater(null);
  };

  const theaterCreateOrEdit = async (values) => {
    if (formType === "add") {
      return await AddTheater({ ...values, owner: user._id });
    }
    return await UpdateTheater({
      ...values,
      theaterId: selectedTheater._id,
    });
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await theaterCreateOrEdit(values);
      if (response.success) {
        message.success(response.message);
        getData();
        handleCancel();
      } else {
        message.error(response?.message);
      }
    } catch (err) {
      message.error(err?.message);
    } finally {
      dispatch(hideLoading());
    }
  };
  return (
    <Modal
      centered
      title={formTitle}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        initialValues={selectedTheater}
        onFinish={onFinish}
      >
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item
              label={strings.PAGES_PARTNER_THEATERFORM_FORM_THEATER_NAME_LABEL}
              name="name"
              rules={[
                {
                  required: true,
                  message:
                    strings.PAGES_PARTNER_THEATERFORM_FORM_THEATER_NAME_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input
                placeholder={
                  strings.PAGES_PARTNER_THEATERFORM_FORM_THEATER_NAME_PLACEHOLDER
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                strings.PAGES_PARTNER_THEATERFORM_FORM_THEATER_ADDRESS_LABEL
              }
              name="address"
              rules={[
                {
                  required: true,
                  message:
                    strings.PAGES_PARTNER_THEATERFORM_FORM_THEATER_ADDRESS_REQUIRED_MESSAGE,
                },
              ]}
            >
              <TextArea
                rows="4"
                placeholder={
                  strings.PAGES_PARTNER_THEATERFORM_FORM_THEATER_ADDRESS_PLACEHOLDER
                }
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={12}>
                <Form.Item
                  label={strings.PAGES_PARTNER_THEATERFORM_FORM_EMAIL_LABEL}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message:
                        strings.PAGES_PARTNER_THEATERFORM_FORM_EMAIL_REQUIRED_MESSAGE,
                    },
                    {
                      type: "email",
                      message:
                        strings.PAGES_PARTNER_THEATERFORM_FORM_EMAIL_INVALID_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      strings.PAGES_PARTNER_THEATERFORM_FORM_EMAIL_PLACEHOLDER
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={strings.PAGES_PARTNER_THEATERFORM_FORM_PHONE_LABEL}
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message:
                        strings.PAGES_PARTNER_THEATERFORM_FORM_PHONE_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      strings.PAGES_PARTNER_THEATERFORM_FORM_PHONE_PLACEHOLDER
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            {strings.PAGES_PARTNER_THEATERFORM_FORM_SUBMIT_BUTTON}
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            {strings.PAGES_PARTNER_THEATERFORM_FORM_CANCEL_BUTTON}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TheaterForm;

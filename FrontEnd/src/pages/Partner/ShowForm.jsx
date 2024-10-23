import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { UpdateShow, AddShow } from "../../api/show";
import strings from "../../constants/l10n";

const ShowForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedShow,
  setSelectedShow,
  getData,
  formType,
  theater,
  movies,
}) => {
  const dispatch = useDispatch();
  const formTitle =
    formType === "edit"
      ? strings.SHOWFORM_HEADING_EDIT_SHOW
      : strings.SHOWFORM_HEADING_ADD_SHOW;

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedShow(null);
  };

  const showCreateOrEdit = async (values) => {
    if (formType === "add") {
      return await AddShow({ ...values, theater: theater._id });
    }
    return await UpdateShow({
      ...values,
      showId: selectedShow._id,
    });
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await showCreateOrEdit(values);
      if (response.success) {
        message.success(response.message);
        getData();
        handleCancel();
      } else {
        message.error(response?.message);
      }
    } catch (err) {
      message.error(err?.response?.data?.message || err?.message);
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
      <Form layout="vertical" initialValues={selectedShow} onFinish={onFinish}>
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label={strings.SHOWFORM_FORM_NAME_LABEL}
                  htmlFor="name"
                  name="name"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: strings.SHOWFORM_FORM_NAME_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    id="name"
                    type="text"
                    placeholder={strings.SHOWFORM_FORM_NAME_PLACEHOLDER}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={strings.SHOWFORM_FORM_DATE_LABEL}
                  htmlFor="date"
                  name="date"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: strings.SHOWFORM_FORM_DATE_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    id="date"
                    type="date"
                    placeholder={strings.SHOWFORM_FORM_DATE_PLACEHOLDER}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={strings.SHOWFORM_FORM_TIME_LABEL}
                  htmlFor="time"
                  name="time"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: strings.SHOWFORM_FORM_TIME_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    id="time"
                    type="time"
                    step={300}
                    placeholder={strings.SHOWFORM_FORM_TIME_PLACEHOLDER}
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label={strings.SHOWFORM_FORM_MOVIE_LABEL}
                  htmlFor="movie"
                  name="movie"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: strings.SHOWFORM_FORM_MOVIE_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Select
                    id="movie"
                    name="movie"
                    placeholder={strings.SHOWFORM_FORM_MOVIE_PLACEHOLDER}
                    options={movies.map((movie) => ({
                      key: movie._id,
                      value: movie._id,
                      label: movie.movieName,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={strings.SHOWFORM_FORM_TICKET_PRICE_LABEL}
                  htmlFor="ticketPrice"
                  name="ticketPrice"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message:
                        strings.SHOWFORM_FORM_TICKET_PRICE_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    id="ticketPrice"
                    type="number"
                    placeholder={strings.SHOWFORM_FORM_TICKET_PRICE_PLACEHOLDER}
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={strings.SHOWFORM_FORM_TOTAL_SEATS_LABEL}
                  htmlFor="totalSeats"
                  name="totalSeats"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message:
                        strings.SHOWFORM_FORM_TOTAL_SEATS_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    id="totalSeats"
                    type="number"
                    placeholder={strings.SHOWFORM_FORM_TOTAL_SEATS_PLACEHOLDER}
                  ></Input>
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
            {strings.SHOWFORM_FORM_SUBMIT_BUTTON}
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            {strings.SHOWFORM_FORM_CANCEL_BUTTON}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShowForm;

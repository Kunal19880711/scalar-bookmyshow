import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import React from "react";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { UpdateMovie, AddMovie } from "../../api/movie";
import strings from "../../constants/l10n";

const MovieForm = ({
  isModalOpen,
  setIsModalOpen,
  selectedMovie,
  setSelectedMovie,
  getData,
  formType,
}) => {
  const dispatch = useDispatch();
  const formTitle =
    formType === "edit"
      ? strings.MOVIEFORM_HEADING_EDIT_MOVIE
      : strings.MOVIEFORM_HEADING_ADD_MOVIE;

  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const movieCreateOrEdit = async (values) => {
    if (formType === "add") {
      return await AddMovie(values);
    }
    return await UpdateMovie({
      ...values,
      movieId: selectedMovie._id,
    });
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await movieCreateOrEdit(values);
      if (response.success) {
        message.success(response.message);
        getData();
        handleCancel();
      } else {
        message.error(response.message);
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
      <Form layout="vertical" initialValues={selectedMovie} onFinish={onFinish}>
        <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
          <Col span={24}>
            <Form.Item
              label={strings.MOVIEFORM_FORM_MOVIE_NAME_LABEL}
              name="movieName"
              rules={[
                {
                  required: true,
                  message: strings.MOVIEFORM_FORM_MOVIE_NAME_REQUIRED_MESSAGE,
                },
              ]}
            >
              <Input
                placeholder={strings.MOVIEFORM_FORM_MOVIE_NAME_PLACEHOLDER}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={strings.MOVIEFORM_FORM_DESCRIPTION_LABEL}
              name="description"
              rules={[
                {
                  required: true,
                  message: strings.MOVIEFORM_FORM_DESCRIPTION_REQUIRED_MESSAGE,
                },
              ]}
            >
              <TextArea
                rows="4"
                placeholder={strings.MOVIEFORM_FORM_DESCRIPTION_PLACEHOLDER}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={8}>
                <Form.Item
                  label={strings.MOVIEFORM_FORM_MOVIE_DURATION_LABEL}
                  name="duration"
                  rules={[
                    {
                      required: true,
                      message:
                        strings.MOVIEFORM_FORM_MOVIE_DURATION_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder={
                      strings.MOVIEFORM_FORM_MOVIE_DURATION_PLACEHOLDER
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={strings.MOVIEFORM_FORM_LANGUAGE_LABEL}
                  name="language"
                  rules={[
                    {
                      required: true,
                      message: strings.MOVIEFORM_FORM_LANGUAGE_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Select
                    placeholder={strings.MOVIEFORM_FORM_LANGUAGE_PLACEHOLDER}
                    options={[
                      { value: "English", label: "English" },
                      { value: "Hindi", label: "Hindi" },
                      { value: "Punjabi", label: "Punjabi" },
                      { value: "Telugu", label: "Telugu" },
                      { value: "Bengali", label: "Bengali" },
                      { value: "German", label: "German" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={strings.MOVIEFORM_FORM_RELEASE_DATE_LABEL}
                  name="releaseDate"
                  rules={[
                    {
                      required: true,
                      message:
                        strings.MOVIEFORM_FORM_RELEASE_DATE_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 6, sm: 10, md: 12, lg: 16 }}>
              <Col span={8}>
                <Form.Item
                  label={strings.MOVIEFORM_FORM_GENRE_LABEL}
                  name="genre"
                  rules={[
                    {
                      required: true,
                      message: strings.MOVIEFORM_FORM_GENRE_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Select
                    placeholder={strings.MOVIEFORM_FORM_GENRE_PLACEHOLDER}
                    options={[
                      { value: "Action", label: "Action" },
                      { value: "Comedy", label: "Comedy" },
                      { value: "Horror", label: "Horror" },
                      { value: "Love", label: "Love" },
                      { value: "Patriot", label: "Patriot" },
                      { value: "Bhakti", label: "Bhakti" },
                      { value: "Thriller", label: "Thriller" },
                      { value: "Mystery", label: "Mystery" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label={strings.MOVIEFORM_FORM_POSTER_LABEL}
                  name="poster"
                  rules={[
                    {
                      required: true,
                      message: strings.MOVIEFORM_FORM_POSTER_REQUIRED_MESSAGE,
                    },
                  ]}
                >
                  <Input
                    placeholder={strings.MOVIEFORM_FORM_POSTER_PLACEHOLDER}
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
            {strings.MOVIEFORM_FORM_SUBMIT_BUTTON}
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            {strings.MOVIEFORM_FORM_CANCEL_BUTTON}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MovieForm;

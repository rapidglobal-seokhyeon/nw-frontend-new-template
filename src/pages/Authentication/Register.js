import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// action
import { registerUser, apiError, resetRegisterFlag } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const validation = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required("아이디를 입력해주세요"),
      name: Yup.string().required("이름을 입력해주세요"),
      email: Yup.string().required("이메일을 입력해주세요"),
      password: Yup.string().required("비밀번호를 입력해주세요"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다")
        .required("비밀번호를 다시 입력해주세요"),
    }),
    onSubmit: values => {
      dispatch(registerUser(values));
    },
  });

  const selectLayoutState = state => state.Account;
  const registerdatatype = createSelector(selectLayoutState, account => ({
    success: account.success,
    error: account.error,
  }));
  // Inside your component
  const { error, success } = useSelector(registerdatatype);

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => history("/login"), 3000);
    }

    setTimeout(() => {
      dispatch(resetRegisterFlag());
    }, 3000);
  }, [dispatch, success, error, history]);

  document.title = "낭만웨딩 회원가입 페이지 | Nangman Wedding - SignUp Page";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo">
                      <img src={logoLight} alt="" height="20" />
                    </Link>
                  </div>
                  <p className="mt-3 fs-15 fw-medium">낭만웨딩 회원가입</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">계정 생성</h5>
                      <p className="text-muted">행복을 찾는 낭만웨딩에 가입하세요</p>
                    </div>
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        className="needs-validation"
                        action="#"
                      >
                        {success && success ? (
                          <>
                            {toast("로그인 페이지로 이동됩니다...", {
                              position: "top-right",
                              hideProgressBar: false,
                              className: "bg-success text-white",
                              progress: undefined,
                              toastId: "",
                            })}
                            <ToastContainer autoClose={2000} limit={1} />
                            <Alert color="success">회원가입 완료! 로그인 페이지로 이동됩니다...</Alert>
                          </>
                        ) : null}

                        {/* {error && error ? <Alert color="danger"> {error} </Alert> : null} */}
                        {error && error ? (
                          <Alert color="danger">
                            <div>중복된 가입정보가 있습니다. 관리자에게 문의해주세요...</div>
                          </Alert>
                        ) : null}

                        <div className="mb-3">
                          <Label htmlFor="userid" className="form-label">
                            아이디 <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="id"
                            type="text"
                            placeholder="아이디 입력"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.id || ""}
                            invalid={validation.touched.id && validation.errors.id ? true : false}
                          />
                          {validation.touched.id && validation.errors.id ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.id}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            이름 <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="name"
                            type="text"
                            placeholder="이름 입력"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.name || ""}
                            invalid={validation.touched.name && validation.errors.name ? true : false}
                          />
                          {validation.touched.name && validation.errors.name ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.name}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="useremail" className="form-label">
                            이메일 <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="이메일 입력"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={validation.touched.email && validation.errors.email ? true : false}
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="userpassword" className="form-label">
                            비밀번호 <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="비밀번호 입력"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={validation.touched.password && validation.errors.password ? true : false}
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-2">
                          <Label htmlFor="confirmPassword" className="form-label">
                            비밀번호 확인 <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="confirm_password"
                            type="password"
                            placeholder="비밀번호 확인"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.confirm_password || ""}
                            invalid={validation.touched.confirm_password && validation.errors.confirm_password ? true : false}
                          />
                          {validation.touched.confirm_password && validation.errors.confirm_password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.confirm_password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-4">
                          <p className="mb-0 fs-12 text-muted fst-italic">
                            <br />
                            <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">
                              개인정보 처리방침
                            </Link>
                          </p>
                        </div>

                        <div className="mt-4">
                          <button className="btn btn-success w-100" type="submit">
                            회원가입
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    가입 정보가 있으신가요 ?{" "}
                    <Link to="/login" className="fw-semibold text-primary text-decoration-underline">
                      {" "}
                      로그인{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default Register;

import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © 낭만웨딩.</Col>
            <Col sm={6}>
              <div className="text-sm-end d-none d-sm-block">
                <p>
                  신랑 <i className="mdi mdi-heart text-danger"></i> 신부
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

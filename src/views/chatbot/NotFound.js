import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import notfound from "assets/img/notfound404.png";
const NotFound = () => (
<div className="content">
    <Row className="justify-content-center">
        <Col md="12 text-center">
            <div className="justify-content-center">
                <img src={notfound} alt="nodata" width={500} height={500} />
            </div>
        </Col>
    </Row>
</div>
);

export default NotFound;

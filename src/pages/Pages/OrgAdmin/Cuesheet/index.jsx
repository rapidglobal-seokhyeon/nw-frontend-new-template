import React from 'react';
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { Container } from 'reactstrap';

import List from './Cuesheet';

const QsheetList = () => {

    document.title = "Qsheet | 큐시트 사용자 목록";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Qsheet User List" pageTitle="Qsheet User List" />
                    <List />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default QsheetList;
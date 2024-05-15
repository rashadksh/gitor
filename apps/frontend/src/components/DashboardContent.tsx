/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Typography, Row, Col } from 'antd';
import { StarFilled, AppstoreFilled, TeamOutlined } from '@ant-design/icons';

import AppWidgetSummary from "./AppWidgetSummary";
import LastRepo from './LastRepo';
import RepositoriesTable from './RepositoriesTable';

const { Title } = Typography;

const AppView = () =>
{
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Title level={3} style={{ marginBottom: '20px' }}>
                Hi, Welcome back 👋
            </Title>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <AppWidgetSummary
                        title="Repositories"
                        total={15}
                        color="success"
                        icon={<AppstoreFilled style={{ fontSize: '50px', color: 'white' }} />}
                    />
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <AppWidgetSummary
                        title="Stars"
                        total={50}
                        color="success"
                        icon={<StarFilled style={{ fontSize: '50px', color: 'yellow' }} />}
                    />
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <AppWidgetSummary
                        title="Followers"
                        total={10}
                        color="success"
                        icon={<TeamOutlined style={{ fontSize: '50px', color: 'blue' }} />}
                    />
                </Col>
                <Title level={3} style={{ marginBottom: '20px', paddingLeft: "20px" }}>
                    Last Repo :
                </Title>
                <Col xs={24} md={24} lg={24}>
                    <LastRepo />
                </Col>

                <Col xs={24} md={24} lg={24}>
                    <RepositoriesTable />
                </Col>

                <Col xs={12} md={6} lg={8}>
                </Col>

                <Col xs={12} md={6} lg={4}>
                </Col>

                <Col xs={12} md={6} lg={8}>
                </Col>

                <Col xs={12} md={6} lg={4}>
                </Col>

                <Col xs={12} md={6} lg={4}>
                </Col>

                <Col xs={12} md={6} lg={8}>
                </Col>
            </Row>
        </div>
    );
};

export default AppView;
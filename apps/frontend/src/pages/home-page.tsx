import { Col, Row } from 'antd';
import { ProConfigProvider } from '@ant-design/pro-components';


import HomeLayout from '../layouts/home-layout';
import AppView from "../components/DashboardContent";

const Dashboard = () =>
{
    return (
        <HomeLayout>
            < AppView />
        </HomeLayout>
    );
};

export default () =>
{
    return (
        <ProConfigProvider >
            <Dashboard />
        </ProConfigProvider>
    );
};

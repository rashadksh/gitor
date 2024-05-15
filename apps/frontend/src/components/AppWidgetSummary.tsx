import React from 'react';
import { Card, Typography } from 'antd';
import PropTypes from 'prop-types';

const { Text } = Typography;

interface AppWidgetSummaryProps
{
    color?: string;
    icon?: React.ReactNode | string;
    sx?: React.CSSProperties;
    title?: string;
    total?: number;
}

const AppWidgetSummary: React.FC<AppWidgetSummaryProps> = ({ title, total, icon, color = 'primary', sx, ...other }) =>
{
    return (
        <Card
            {...other}
            style={{
                padding: '24px',
                borderRadius: '2px',
                ...sx,
                width: 'autox',
                height: '200px',
                background: "#001529"
            }}
        >
            {icon && <div style={{ width: '64px', height: '64px', margin: '0px auto' }}>{icon}</div>}
            <div>
                <Text strong style={{ color: "wheat", fontSize: '24px', marginBottom: '8px', paddingRight: "8px" }}>
                    {total}
                </Text>
                <Text style={{ color: "wheat" }}>{title}</Text>
            </div>
        </Card>
    );
};

AppWidgetSummary.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
    title: PropTypes.string,
    total: PropTypes.number,
};

export default AppWidgetSummary;

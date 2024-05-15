import React from 'react';
import { Card, Typography, Tag, Divider, Dropdown, Menu, Space } from 'antd';

const { Text, Title } = Typography;

interface Repository
{
    name: string;
    stars: number;
    pullRequests: number;
    contributors: string[];
    lastPullRequestDate: string;
    description: string;
    language: string;
    commits: string[];
    createdAt: string;
}

interface ModernCardProps
{
    repository?: Repository;
}

const defaultRepository: Repository = {
    name: 'My App',
    stars: 10,
    pullRequests: 5,
    contributors: ['John', 'Doe'],
    lastPullRequestDate: '2023-04-20',
    description: 'A sample app description',
    language: 'JavaScript',
    commits: ['Initial commit', 'Fix typo in README', 'Add feature X'],
    createdAt: '2023-04-01',
};

const LastRepo: React.FC<ModernCardProps> = ({ repository = defaultRepository }) =>
{

    const commitMenu = (
        <Menu>
            {repository.commits.map((commit, index) => (
                <Menu.Item key={index}>
                    <Text>{commit}</Text>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Card
            style={{
                borderRadius: '8px',
                margin: '0 auto',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                width: '90%',
            }}
        >
            <div style={{ padding: '24px' }}>
                <Title level={3} style={{ color: '#001529' }}>{repository.name}</Title>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                    {repository.description}
                </Text>
                <Divider style={{ margin: '16px 0' }} />
                <Space direction="vertical">
                    <Text type="secondary">Created At: {repository.createdAt}</Text>
                    <Text type="secondary">Pull Requests: {repository.pullRequests}</Text>
                    <Text type="secondary">Stars: {repository.stars}</Text>
                    <div>
                        <Text type="secondary">Commits:</Text>
                        <Dropdown overlay={commitMenu} trigger={['click']} >
                            <a className="ant-dropdown-link" style={{ marginLeft: '8px' }} onClick={e => e.preventDefault()} >
                                View Commits
                            </a>
                        </Dropdown>
                    </div>

                    <Text type="secondary">Contributors: {repository.contributors.join(', ')}</Text>
                    <Text type="secondary">Language: {repository.language}</Text>
                    <Text type="secondary">Last Pull Request Date: {repository.lastPullRequestDate}</Text>
                    <Text type="secondary">Status: <Tag color="green">Active</Tag></Text>
                </Space>
            </div >
        </Card>
    );
};

export default LastRepo;

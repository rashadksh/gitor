import React, { useEffect, useState } from 'react';
import { Table, Tag, Space } from 'antd';
import axios from 'axios';

interface Repository
{
    name: string;
    pullRequests: PullRequest[];
}

interface PullRequest
{
    id: number;
    title: string;
    isOpen: boolean;
    openedAt: string;
    closedAt?: string;
    duration?: string;
}


const RepositoriesTable: React.FC = () =>
{
    const [repositories, setRepositories] = useState<Repository[]>([]);

    useEffect(() =>
    {
        const fetchRepositories = async () =>
        {
            try {
                const response = await axios.get('http://localhost:3000/api/auth/github/');
                console.log(response.data);
                setRepositories(response.data);
            } catch (error) {
                console.error('Error fetching repositories:', error);
            }
        };

        fetchRepositories();
    }, []);

    const columns = [
        {
            title: 'Repository',
            dataIndex: 'name',
            key: 'name',
            width: 'auto'
        },
        {
            title: 'Pull Requests',
            dataIndex: 'pullRequests',
            key: 'pullRequests',
            render: (pullRequests: PullRequest[]) => (
                <>
                    {pullRequests.map((pullRequest, index) => (
                        <div key={pullRequest.id} >
                            <Space direction="vertical" >
                                <p>{pullRequest.title}</p>
                                <Space>
                                    <Tag color={pullRequest.isOpen ? 'blue' : 'green'}>{pullRequest.isOpen ? 'Open' : 'Closed'}</Tag>
                                    <Tag>{pullRequest.openedAt}</Tag>
                                    {pullRequest.closedAt && <Tag>{pullRequest.closedAt}</Tag>}
                                    {pullRequest.duration && <Tag>{pullRequest.duration}</Tag>}
                                </Space>
                            </Space>
                            {index === 0 && (
                                <div style={{ color: 'red', fontWeight: 'bold' }}>This pull request took the longest time</div>
                            )}
                        </div>
                    ))}
                </>
            ),
        },
    ];

    return (
        <Table
            dataSource={repositories}
            columns={columns}
            pagination={false}
            scroll={{ y: 400 }} // Adjust height as needed
        />
    );
};

export default RepositoriesTable;

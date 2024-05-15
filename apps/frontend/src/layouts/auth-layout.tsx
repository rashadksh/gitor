import React from 'react';
import { Button, Typography } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';

import * as styles from '../styles/auth-layout.style';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <video
        src='/background.mp4'
        autoPlay
        loop
        muted
        playsInline
        css={styles.videoStyles}
      ></video>
      <div css={styles.container}>
        <Typography.Title css={styles.titleStyles} level={2}>
          Devhub Monitor{' '}
        </Typography.Title>
        {children}
        <div style={{ textAlign: 'center' }}>
          <Button
            type='primary'
            style={{ background: '#333', borderColor: '#333' }}
            icon={<GithubOutlined />}
          ></Button>
          <Button
            type='primary'
            style={{
              background: '#D14836',
              borderColor: '#D14836',
              marginLeft: 10,
            }}
            icon={<GoogleOutlined />}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

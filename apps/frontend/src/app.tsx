import { StrictMode } from 'react';
import { ConfigProvider } from 'antd';

import Routes from './routes';

export function App() {
  return (
    <StrictMode>
      <ConfigProvider>
        <Routes />
      </ConfigProvider>
    </StrictMode>
  );
}

export default App;

import React from 'react';
import { Layout, Typography, Card } from 'antd';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const EncryptedFilePage = () => (
  <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0d1b2a, #1b263b)' }}>
    <Header style={{ color: '#40a9ff', fontSize: '20px' }}>📦 Encrypted Journal</Header>
    <Content style={{ padding: '24px' }}>
      <Card style={{ background: '#112d4e', color: '#dbe2ef' }}>
        <Title level={4} style={{ color: '#dbe2ef' }}>Legacy Encrypted Journal</Title>
        <Paragraph>Decrypt to reveal the final payload.</Paragraph>
        <div dangerouslySetInnerHTML={{ __html: '<!-- final password: finalpayload -->' }} />
      </Card>
    </Content>
  </Layout>
);

export default EncryptedFilePage;

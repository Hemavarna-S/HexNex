import React from 'react';
import { Layout, Typography, Card } from 'antd';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const HiddenAdminPage = () => (
  <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0d1b2a, #1b263b)' }}>
    <Header style={{ color: '#40a9ff', fontSize: '20px' }}>👁️ Hidden Admin Page</Header>
    <Content style={{ padding: '24px' }}>
      <Card style={{ background: '#112d4e', color: '#dbe2ef' }}>
        <Title level={4} style={{ color: '#dbe2ef' }}>Secret Admin Console</Title>
        <Paragraph>Use carefully. Only authorized admins know the password.</Paragraph>
        <div dangerouslySetInnerHTML={{ __html: '<!-- hidden password: h1dden -->' }} />
      </Card>
    </Content>
  </Layout>
);

export default HiddenAdminPage;

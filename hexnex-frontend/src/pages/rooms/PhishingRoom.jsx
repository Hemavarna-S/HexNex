import React, { useState } from 'react';
import { Layout, Menu, List, Avatar, Modal, Input, Button, Typography, message } from 'antd';
import {
  InboxOutlined,
  StarOutlined,
  SendOutlined,
  FileTextOutlined,
  SearchOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Paragraph } = Typography;

const emails = [
  { id: 1, sender: 'Facebook', subject: 'You have 5 new notifications', date: 'Jul 20' },
  { id: 2, sender: 'Hexnex Rewards Team', subject: '🎉 Congratulations! You won a million dollar Amazon gift card.', date: 'Jul 19', phishing: true },
  { id: 3, sender: 'Netflix', subject: 'Your subscription is about to renew', date: 'Jul 18' },
  { id: 4, sender: 'GitHub', subject: 'New login from unknown device', date: 'Jul 17' },
  { id: 5, sender: 'Support', subject: 'Your monthly statement is ready', date: 'Jul 16' },
  { id: 6, sender: 'Google', subject: 'Security alert: new device login', date: 'Jul 15' },
  { id: 7, sender: 'LinkedIn', subject: '3 people viewed your profile this week', date: 'Jul 14' },
  { id: 8, sender: 'Admin', subject: 'Scheduled maintenance on Sunday', date: 'Jul 13' },
];

const PhishingRoom = () => {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [formValues, setFormValues] = useState({ username: '', password: '' });

  const handleEmailClick = (email) => {
    if (email.phishing) {
      setVisible(true);
      setSubmitted(false);
      setFormValues({ username: '', password: '' });
    } else {
      message.info('This email is safe.');
    }
  };

  const handleSubmit = () => {
    if (!formValues.username || !formValues.password) {
      message.error('Please enter both username and password.');
      return;
    }
    setCredentials(formValues);
    setSubmitted(true);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} style={{ background: '#0d1b2a', color: '#fff' }}>
        <div style={{ color: '#40a9ff', fontSize: '22px', textAlign: 'center', margin: '16px 0' }}>
          ✉ Hexnex Mail
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ background: '#0d1b2a', borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<InboxOutlined />}>Inbox</Menu.Item>
          <Menu.Item key="2" icon={<StarOutlined />}>Starred</Menu.Item>
          <Menu.Item key="3" icon={<SendOutlined />}>Sent</Menu.Item>
          <Menu.Item key="4" icon={<FileTextOutlined />}>Drafts</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#112d4e', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px' }}>
          <SearchOutlined style={{ fontSize: '18px', marginRight: '10px' }} />
          <Input placeholder="Search mail" style={{ width: 300 }} />
        </Header>
        <Content style={{ padding: '24px' }}>
          <List
            itemLayout="horizontal"
            dataSource={emails}
            bordered
            style={{ background: '#1b263b', borderRadius: '8px' }}
            renderItem={item => (
              <List.Item
                style={{
                  cursor: 'pointer',
                  padding: '12px 24px',
                  borderBottom: '1px solid #32475b',
                  transition: 'background 0.2s',
                }}
                onClick={() => handleEmailClick(item)}
                hoverable="true"
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<MailOutlined />} style={{ backgroundColor: '#3a506b' }} />}
                  title={<span style={{ color: '#ffffff', fontWeight: '500' }}>{item.sender}</span>}
                  description={<span style={{ color: '#dbe2ef' }}>{item.subject}</span>}
                />
                <div style={{ color: '#dbe2ef', fontSize: '12px' }}>{item.date}</div>
              </List.Item>
            )}
          />
        </Content>
      </Layout>

      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
        style={{ top: 50, padding: 0 }}
        bodyStyle={{ padding: 0, background: '#ffffffff', borderRadius: 12 }}
        width={370}
      >
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          padding: 0,
          minWidth: 340,
          maxWidth: 400,
          border: '1px solid #e3e3e3',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '32px 32px 16px 32px',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            background: '#fff',
            borderBottom: '1px solid #e3e3e3',
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style={{ width: 120, marginBottom: 16 }} />
            <Typography style={{ color: '#232f3e', fontWeight: 700, fontSize: 22, marginBottom: 0 }}>Sign-In</Typography>
          </div>
          <div style={{ padding: 32, paddingTop: 24 }}>
            {!submitted ? (
              <>
                <Input
                  placeholder="Email or mobile phone number"
                  value={formValues.username}
                  onChange={e => setFormValues({ ...formValues, username: e.target.value })}
                  style={{ marginBottom: 16, height: 40, fontSize: 16 }}
                />
                <Input.Password
                  placeholder="Amazon password"
                  value={formValues.password}
                  onChange={e => setFormValues({ ...formValues, password: e.target.value })}
                  style={{ marginBottom: 16, height: 40, fontSize: 16 }}
                />
                <Button type="primary" block style={{ background: '#ff9900', borderColor: '#ff9900', fontWeight: 700, fontSize: 16, height: 40 }} onClick={handleSubmit}>
                  Sign-In
                </Button>
                <div style={{ marginTop: 16, color: '#767676', fontSize: 13, textAlign: 'center' }}>
                  By continuing, you agree to Amazon's <a href="#" style={{ color: '#0066c0' }}>Conditions of Use</a> and <a href="#" style={{ color: '#0066c0' }}>Privacy Notice</a>.
                </div>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <Typography style={{ color: '#232f3e', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>You entered:</Typography>
                  <Typography style={{ color: '#232f3e', fontFamily: 'monospace', marginBottom: 4 }}>Username: {credentials.username}</Typography>
                  <Typography style={{ color: '#232f3e', fontFamily: 'monospace', marginBottom: 12 }}>Password: {credentials.password}</Typography>
                  <Typography style={{ color: '#d32f2f', fontWeight: 600, fontSize: 15, background: '#fff3e0', borderRadius: 6, padding: 8, marginBottom: 12 }}>
                    ⚠️ This is a phishing simulation! Never enter your credentials on unknown sites.
                  </Typography>
                  <Button block style={{ borderColor: '#232f3e', color: '#232f3e', fontWeight: 700 }} onClick={() => setVisible(false)}>
                    Close
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default PhishingRoom;

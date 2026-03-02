import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [flagInput, setFlagInput] = useState('');
  const [flagSubmitted, setFlagSubmitted] = useState(false);
  const [roomCompleted, setRoomCompleted] = useState(false);
  const confettiRef = useRef(null);
  const [showFlag, setShowFlag] = useState(false);

  const EXPECTED_FLAG = 'HEXNEX{phishing-flag}';

  const navigate = useNavigate();

  const handleEmailClick = (email) => {
    // Navigate to mail view for all emails
    navigate(`/mail/${email.id}`);
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
      <Sider width={260} style={{ background: '#fff' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#202124' }}>Hexnex Mail</div>
        </div>
        <div style={{ padding: 12 }}>
          <Button type="primary" block style={{ background: '#1a73e8', borderColor: '#1a73e8', marginBottom: 12 }}>Compose</Button>
          <Menu mode="vertical" selectable={false} style={{ borderRight: 'none' }}>
            <Menu.Item key="inbox" icon={<InboxOutlined />}>Inbox</Menu.Item>
            <Menu.Item key="starred" icon={<StarOutlined />}>Starred</Menu.Item>
            <Menu.Item key="sent" icon={<SendOutlined />}>Sent</Menu.Item>
            <Menu.Item key="drafts" icon={<FileTextOutlined />}>Drafts</Menu.Item>
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <SearchOutlined style={{ fontSize: 18, color: '#5f6368' }} />
            <Input placeholder="Search mail" style={{ width: 420 }} />
          </div>
          <div style={{ marginLeft: 'auto', color: '#5f6368', fontSize: 14 }}>user@example.com</div>
        </Header>
        <Content style={{ padding: '24px' }}>
          <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e6e6e6' }}>
            {emails.map((item) => (
              <div
                key={item.id}
                onClick={() => handleEmailClick(item)}
                style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #f1f3f4', cursor: 'pointer', background: '#fff' }}
              >
                <Avatar size={36} style={{ backgroundColor: '#c7d2fe', color: '#1f2937', marginRight: 12 }}>{item.sender.charAt(0)}</Avatar>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 600, color: '#202124', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: 8 }}>{item.sender}</div>
                    <div style={{ color: '#5f6368', fontSize: 12 }}>{item.date}</div>
                  </div>
                  <div style={{ color: '#3c4043', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.subject}</div>
                </div>
              </div>
            ))}
          </div>
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
        <div ref={confettiRef} style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 12px 40px rgba(0,0,0,0.20)',
          padding: 0,
          minWidth: 340,
          maxWidth: 520,
          border: '1px solid #e9eef6',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '28px 32px 12px 32px',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            background: '#f6f9ff',
            borderBottom: '1px solid #eef3ff',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" style={{ width: 110, marginBottom: 8 }} />
              {roomCompleted ? (
                <div style={{ textAlign: 'left' }}>
                  <Typography style={{ color: '#1b5e20', fontWeight: 800, fontSize: 20, marginBottom: 0 }}>Room Completed 🎉</Typography>
                  <Typography style={{ color: '#2e7d32', fontSize: 13 }}>Great job — flag accepted.</Typography>
                </div>
              ) : (
                <Typography style={{ color: '#232f3e', fontWeight: 700, fontSize: 22, marginBottom: 0 }}>Sign-In</Typography>
              )}
            </div>
          </div>
          <div style={{ padding: 28, paddingTop: 18 }}>
            {!submitted ? (
              <>
                <Input
                  placeholder="Email or mobile phone number"
                  value={formValues.username}
                  onChange={e => setFormValues({ ...formValues, username: e.target.value })}
                  style={{ marginBottom: 14, height: 44, fontSize: 15 }}
                />
                <Input.Password
                  placeholder="Amazon password"
                  value={formValues.password}
                  onChange={e => setFormValues({ ...formValues, password: e.target.value })}
                  style={{ marginBottom: 14, height: 44, fontSize: 15 }}
                />
                <Button type="primary" block style={{ background: '#ff9900', borderColor: '#ff9900', fontWeight: 800, fontSize: 15, height: 44 }} onClick={handleSubmit}>
                  Sign-In
                </Button>
                <div style={{ marginTop: 12, color: '#6b7280', fontSize: 13, textAlign: 'center' }}>
                  By continuing, you agree to Amazon's <a href="#" style={{ color: '#0b67d0' }}>Conditions of Use</a> and <a href="#" style={{ color: '#0b67d0' }}>Privacy Notice</a>.
                </div>
              </>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <Typography style={{ color: '#111827', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>You entered:</Typography>
                  <Typography style={{ color: '#111827', fontFamily: 'monospace', marginBottom: 4 }}>Username: {credentials.username}</Typography>
                  <Typography style={{ color: '#111827', fontFamily: 'monospace', marginBottom: 12 }}>Password: {credentials.password}</Typography>
                  <Typography style={{ color: '#b91c1c', fontWeight: 700, fontSize: 14, background: '#fff7ed', borderRadius: 8, padding: '8px 10px', marginBottom: 12 }}>
                    ⚠️ This is a phishing simulation! Never enter your credentials on unknown sites.
                  </Typography>
                </div>

                {!roomCompleted ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Input
                        placeholder="Enter flag (e.g. HEXNEX{...})"
                        value={flagInput}
                        onChange={e => setFlagInput(e.target.value)}
                        style={{ width: 220, height: 40 }}
                      />
                      <Button type="primary" onClick={() => {
                        setFlagSubmitted(true);
                        if (flagInput.trim() === EXPECTED_FLAG) {
                          setRoomCompleted(true);
                          message.success('Flag accepted — Room completed!');
                          // fire confetti
                          launchConfetti();
                          // persist completion locally and on backend
                          const completed = JSON.parse(localStorage.getItem('completedRooms') || '[]');
                          if (!completed.includes('phishing')) completed.push('phishing');
                          localStorage.setItem('completedRooms', JSON.stringify(completed));
                          (async () => {
                            try {
                              const token = localStorage.getItem('token');
                              await (await import('../../utils/api')).default.post('/api/progress/complete-room', { room: 'phishing', points: 20 }, { headers: { Authorization: `Bearer ${token}` } });
                            } catch (e) {
                              message.error('Progress update failed (network or auth).');
                              console.error('Phishing progress error', e);
                            }
                          })();
                        } else {
                          message.error('Incorrect flag — try again.');
                        }
                      }} style={{ background: '#10b981', borderColor: '#10b981' }}>
                        Submit Flag
                      </Button>
                    </div>

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Button onClick={() => {
                        setShowFlag(true);
                        setFlagInput(EXPECTED_FLAG);
                        message.info('Flag revealed and filled in.');
                      }}>
                        Reveal Flag
                      </Button>
                      {showFlag && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Typography style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '6px 8px', borderRadius: 6 }}>{EXPECTED_FLAG}</Typography>
                          <Button onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(EXPECTED_FLAG);
                              message.success('Flag copied to clipboard');
                            }
                          }}>Copy</Button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: 6 }}>
                    <Typography style={{ color: '#065f46', fontWeight: 700 }}>✅ Flag verified</Typography>
                    <div style={{ marginTop: 10 }}>
                      <Button onClick={() => setVisible(false)}>Close</Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

// Confetti implementation (DOM-based) — simple and self-contained
function launchConfetti() {
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'];
  const count = 60;
  const root = document.body;

  const styleId = 'hexnex-confetti-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
      @keyframes hexnexConfettiFall { to { transform: translateY(700px) rotate(720deg); opacity: 0; } }
      .hexnex-confetti-piece { position: fixed; top: 0; left: 0; width: 10px; height: 14px; opacity: 1; z-index: 9999; pointer-events: none; transform-origin: center; }
    `;
    document.head.appendChild(style);
  }

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'hexnex-confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.style.background = color;
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.opacity = String(0.9 - Math.random() * 0.5);
    const delay = Math.random() * 0.2;
    el.style.transition = `transform 1s ease-out ${delay}s, opacity 1s linear ${delay}s`;
    root.appendChild(el);

    // trigger fall
    requestAnimationFrame(() => {
      el.style.transform = `translateY(${700 + Math.random() * 200}px) rotate(${720 + Math.random() * 360}deg)`;
      el.style.opacity = '0';
    });

    // remove after animation
    setTimeout(() => {
      el.remove();
    }, 1400 + Math.random() * 600);
  }
}

export default PhishingRoom;

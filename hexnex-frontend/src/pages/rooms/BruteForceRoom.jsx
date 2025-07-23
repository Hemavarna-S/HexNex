import React, { useState } from 'react';
import { Layout, Steps, Card, Input, Button, Typography, message, Spin, Divider } from 'antd';
import { KeyOutlined, LockOutlined, ApiOutlined, EyeInvisibleOutlined, FileZipOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Confetti from 'react-confetti';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const BruteForceRoom = () => {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState({
    username: '',
    portalPass: '',
    sshPass: '',
    hiddenPass: '',
    finalPass: '',
    flag: ''
  });
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [flagVisible, setFlagVisible] = useState(false);
  const [roomCompleted, setRoomCompleted] = useState(false);

  const nextStep = () => { setStep(prev => prev + 1); setAttempts(0); };

  const handleInputChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  const simulateBruteForce = async (callback) => {
    setLoading(true);
    let fakeAttempts = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < fakeAttempts; i++) {
      setAttempts(prev => prev + 1);
      await new Promise(res => setTimeout(res, 200));
    }
    setLoading(false);
    callback();
  };

  const handleSubmit = () => {
    simulateBruteForce(() => {
      switch (step) {
        case 0:
          inputs.username === 'vault_keeper' ? (message.success('✅ Username accepted!'), nextStep())
            : message.error('❌ Invalid username! Hint: check vault login page source.');
          break;
        case 1:
          inputs.portalPass === 'password' ? (message.success('🔓 Portal cracked!'), nextStep())
            : message.error('Wrong password! Check portal source.');
          break;
        case 2:
          inputs.sshPass === 'vault123' ? (message.success('🛡️ SSH access granted!'), nextStep())
            : message.error('Wrong SSH password! Check SSH info page.');
          break;
        case 3:
          inputs.hiddenPass === 'h1dden' ? (message.success('👁️ Hidden login bypassed!'), nextStep())
            : message.error('Wrong! Inspect hidden admin page.');
          break;
        case 4:
          inputs.finalPass === 'finalpayload' ? (message.success('📦 Encrypted journal unlocked!'), setFlagVisible(true))
            : message.error('Wrong password! Check encrypted file page.');
          break;
        default: break;
      }
    });
  };

  const handleFlagSubmit = () => {
    if (inputs.flag === 'HEXNEX{Brut3_F0rc3_Atta)k}') {
      message.success('🏁 Correct! You completed the room!');
      setRoomCompleted(true);
    } else {
      message.error('❌ Incorrect flag.');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0f2027, #0a023aff, #0e052eff)' }}>
      <Header style={{ background: 'rgba(0,0,0,0.7)', textAlign: 'center', padding: '20px 0' }}>
        <Title level={2} style={{ color: '#ffffff', margin: 0 }}>
          <ThunderboltOutlined style={{ marginRight: 10 }} />
          Vault of Forgotten Credentials
        </Title>
      </Header>

      <Content style={{ padding: '40px 20px' }}>
        <Card
          style={{
            maxWidth: 800,
            margin: '0 auto',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 20,
            padding: '40px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <Steps
            current={step}
            size="default"
            style={{ marginBottom: 40 }}
            items={[
              { title: <span style={{ color: '#fff' }}>Username</span>, icon: <KeyOutlined style={{ color: '#fff' }} /> },
              { title: <span style={{ color: '#fff' }}>Portal</span>, icon: <LockOutlined style={{ color: '#fff' }} /> },
              { title: <span style={{ color: '#fff' }}>SSH</span>, icon: <ApiOutlined style={{ color: '#fff' }} /> },
              { title: <span style={{ color: '#fff' }}>Hidden</span>, icon: <EyeInvisibleOutlined style={{ color: '#fff' }} /> },
              { title: <span style={{ color: '#fff' }}>Journal</span>, icon: <FileZipOutlined style={{ color: '#fff' }} /> }
            ]}
          />

          {loading && <Spin tip="Brute forcing..." style={{ display: 'block', margin: '0 auto 20px' }} />}

          {!loading && !roomCompleted && (
            <>
              {step === 0 && (
                <>
                  <Title level={3} style={{ color: '#ffffff' }}>🎲 Username Roulette</Title>
                  <Paragraph style={{ color: '#dfe6e9' }}>
                    Find the correct username hidden in the vault login page.
                  </Paragraph>
                  <Input
                    size="large"
                    placeholder="Username"
                    value={inputs.username}
                    onChange={e => handleInputChange('username', e.target.value)}
                    style={{ marginBottom: 15 }}
                  />
                  <Button type="primary" block size="large" onClick={handleSubmit}>
                    Try Username
                  </Button>
                  <Paragraph><a href="/vault-login.html" target="_blank" style={{ color: '#40a9ff' }}>🔍 View vault login page</a></Paragraph>
                </>
              )}

              {step === 1 && (
                <>
                  <Title level={3} style={{ color: '#ffffff' }}>🔐 Crack the Portal</Title>
                  <Input.Password
                    size="large"
                    placeholder="Enter portal password"
                    value={inputs.portalPass}
                    onChange={e => handleInputChange('portalPass', e.target.value)}
                    style={{ marginBottom: 15 }}
                  />
                  <Button type="primary" block size="large" onClick={handleSubmit}>
                    Crack Password
                  </Button>
                  <Paragraph><a href="/portal.html" target="_blank" style={{ color: '#40a9ff' }}>🔍 View portal page</a></Paragraph>
                </>
              )}

              {step === 2 && (
                <>
                  <Title level={3} style={{ color: '#ffffff' }}>🛡️ SSH Brute-force</Title>
                  <Input.Password
                    size="large"
                    placeholder="Enter SSH password"
                    value={inputs.sshPass}
                    onChange={e => handleInputChange('sshPass', e.target.value)}
                    style={{ marginBottom: 15 }}
                  />
                  <Button type="primary" block size="large" onClick={handleSubmit}>
                    Brute Force SSH
                  </Button>
                  <Paragraph><a href="/ssh-info.html" target="_blank" style={{ color: '#40a9ff' }}>🔍 View SSH info page</a></Paragraph>
                </>
              )}

              {step === 3 && (
                <>
                  <Title level={3} style={{ color: '#ffffff' }}>👁️ Hidden Login</Title>
                  <Input.Password
                    size="large"
                    placeholder="Enter hidden login password"
                    value={inputs.hiddenPass}
                    onChange={e => handleInputChange('hiddenPass', e.target.value)}
                    style={{ marginBottom: 15 }}
                  />
                  <Button type="primary" block size="large" onClick={handleSubmit}>
                    Submit Password
                  </Button>
                  <Paragraph><a href="/hidden-admin.html" target="_blank" style={{ color: '#40a9ff' }}>🔍 View hidden admin page</a></Paragraph>
                </>
              )}

              {step === 4 && !flagVisible && (
                <>
                  <Title level={3} style={{ color: '#ffffff' }}>📦 Encrypted Journal</Title>
                  <Input.Password
                    size="large"
                    placeholder="Enter final password"
                    value={inputs.finalPass}
                    onChange={e => handleInputChange('finalPass', e.target.value)}
                    style={{ marginBottom: 15 }}
                  />
                  <Button type="primary" block size="large" onClick={handleSubmit}>
                    Decrypt File
                  </Button>
                  <Paragraph><a href="/encrypted-file.html" target="_blank" style={{ color: '#40a9ff' }}>🔍 View encrypted file page</a></Paragraph>
                </>
              )}

              {flagVisible && (
                <>
                  <Divider style={{ background: '#40a9ff' }} />
                  <Paragraph style={{ color: '#ffffff' }}>🎉 Final payload found:</Paragraph>
                  <Paragraph copyable code style={{ color: '#ffffff', fontSize: '18px' }}>
                    HEXNEX{'{Brut3_F0rc3_Atta)k}'}
                  </Paragraph>
                  <Title level={4} style={{ color: '#ffffff' }}>🏁 Submit your flag</Title>
                  <Input
                    size="large"
                    placeholder="HEXNEX{...}"
                    value={inputs.flag}
                    onChange={e => handleInputChange('flag', e.target.value)}
                    style={{ marginBottom: 15 }}
                  />
                  <Button type="primary" block size="large" onClick={handleFlagSubmit}>
                    Submit Flag
                  </Button>
                </>
              )}

              <Text style={{ color: '#b2bec3' }}>Attempts: {attempts}</Text>
            </>
          )}

          {roomCompleted && (
            <>
              <Confetti />
              <Title level={2} style={{ color: '#40a9ff', marginTop: 20, textAlign: 'center' }}>
                🎉 Congratulations! Room Completed!
              </Title>
              <Paragraph style={{ color: '#ffffff', textAlign: 'center' }}>
                You have completed the <i>Vault of Forgotten Credentials</i> room.
              </Paragraph>
              <Button type="primary" size="large" block style={{ marginTop: 20 }} onClick={() => window.location.href = '/rooms'}>
                Done & Return to Rooms
              </Button>
            </>
          )}
        </Card>
      </Content>

      <Footer style={{ textAlign: 'center', color: '#8aa9c2', background: 'rgba(0,0,0,0.5)' }}>
         HexNex Brute Force Room ©2025
      </Footer>
    </Layout>
  );
};

export default BruteForceRoom;

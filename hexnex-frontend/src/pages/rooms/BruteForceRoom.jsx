import React, { useState } from 'react';
import { Layout, Steps, Card, Input, Button, Typography, message, Spin } from 'antd';
import { KeyOutlined, LockOutlined, ApiOutlined, EyeInvisibleOutlined, FileZipOutlined, FlagOutlined, ThunderboltOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Paragraph, Title, Text } = Typography;

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
          if (inputs.username === 'vault_keeper') {
            message.success('✅ Username accepted!');
            nextStep();
          } else {
            message.error('❌ Invalid username! Hint: check vault login page source.');
          }
          break;
        case 1:
          if (inputs.portalPass === 'password') {
            message.success('🔓 Portal cracked!');
            nextStep();
          } else {
            message.error('Wrong password! Check portal source.');
          }
          break;
        case 2:
          if (inputs.sshPass === 'vault123') {
            message.success('🛡️ SSH access granted!');
            nextStep();
          } else {
            message.error('Wrong SSH password! Check SSH info page.');
          }
          break;
        case 3:
          if (inputs.hiddenPass === 'h1dden') {
            message.success('👁️ Hidden login bypassed!');
            nextStep();
          } else {
            message.error('Wrong! Inspect hidden admin page.');
          }
          break;
        case 4:
          if (inputs.finalPass === 'finalpayload') {
            message.success('📦 Encrypted journal unlocked!');
            setFlagVisible(true);
          } else {
            message.error('Wrong password! Check encrypted file page.');
          }
          break;
        default:
          break;
      }
    });
  };

  const handleFlagSubmit = () => {
    if (inputs.flag === 'HEXNEX{Brut3_F0rc3_Atta)k}') {
      message.success('🏁 Correct! You completed the room!');
    } else {
      message.error('❌ Incorrect flag.');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0d1b2a, #1b263b)' }}>
      <Header style={{ color: '#40a9ff', fontSize: '20px' }}>
        <ThunderboltOutlined /> The Vault of Forgotten Credentials
      </Header>
      <Content style={{ padding: '24px' }}>
        <Card style={{ background: '#112d4e', borderRadius: '12px' }}>
          <Steps current={step} size="small" style={{ marginBottom: '24px' }}>
            <Steps.Step title="Username" icon={<KeyOutlined />} />
            <Steps.Step title="Portal" icon={<LockOutlined />} />
            <Steps.Step title="SSH" icon={<ApiOutlined />} />
            <Steps.Step title="Hidden" icon={<EyeInvisibleOutlined />} />
            <Steps.Step title="Journal" icon={<FileZipOutlined />} />
          </Steps>

          {loading && <Spin tip="Brute forcing..." style={{ marginBottom: '20px' }} />}

          {!loading && step === 0 && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>🎲 Username Roulette</Title>
              <Paragraph style={{ color: '#dbe2ef' }}>
                Find the correct username hidden in the vault login page.
              </Paragraph>
              <Input
                placeholder="vault_keeper"
                value={inputs.username}
                onChange={e => handleInputChange('username', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Try</Button>
              <Paragraph><a href="/vault-login.html" target="_blank">🔍 View vault login page</a></Paragraph>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {!loading && step === 1 && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>🔐 Crack the Portal</Title>
              <Input.Password
                placeholder="Enter portal password"
                value={inputs.portalPass}
                onChange={e => handleInputChange('portalPass', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Crack</Button>
              <Paragraph><a href="/portal.html" target="_blank">🔍 View portal page</a></Paragraph>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {!loading && step === 2 && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>🛡️ SSH Brute-force</Title>
              <Input.Password
                placeholder="Enter SSH password"
                value={inputs.sshPass}
                onChange={e => handleInputChange('sshPass', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Brute Force</Button>
              <Paragraph><a href="/ssh-info.html" target="_blank">🔍 View SSH info page</a></Paragraph>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {!loading && step === 3 && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>👁️ Hidden Login</Title>
              <Input.Password
                placeholder="Enter hidden login password"
                value={inputs.hiddenPass}
                onChange={e => handleInputChange('hiddenPass', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Submit</Button>
              <Paragraph><a href="/hidden-admin.html" target="_blank">🔍 View hidden admin page</a></Paragraph>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {!loading && step === 4 && !flagVisible && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>📦 Encrypted Journal</Title>
              <Input.Password
                placeholder="Enter final password"
                value={inputs.finalPass}
                onChange={e => handleInputChange('finalPass', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Decrypt</Button>
              <Paragraph><a href="/encrypted-file.html" target="_blank">🔍 View encrypted file page</a></Paragraph>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {flagVisible && (
            <>
              <Paragraph style={{ color: '#dbe2ef', marginTop: '10px' }}>
                🎉 You found the final payload:
              </Paragraph>
              <Paragraph copyable code style={{ color: '#fff', fontSize: '18px' }}>
                HEXNEX{'{Brut3_F0rc3_Atta)k}'}
              </Paragraph>
              <Title level={4} style={{ color: '#dbe2ef' }}>🏁 Submit your flag</Title>
              <Input
                placeholder="HEXNEX{...}"
                value={inputs.flag}
                onChange={e => handleInputChange('flag', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleFlagSubmit}>Submit Flag</Button>
            </>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default BruteForceRoom;

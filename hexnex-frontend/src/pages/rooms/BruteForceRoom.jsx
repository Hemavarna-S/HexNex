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
    let fakeAttempts = Math.floor(Math.random() * 4) + 2;
    for (let i = 1; i <= fakeAttempts; i++) {
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
            message.error('❌ Invalid username! Hint: check vault login clue in source.');
          }
          break;
        case 1:
          if (inputs.portalPass === 'password') {
            message.success('🔓 Portal cracked!');
            nextStep();
          } else {
            message.error('Wrong password! Hint: check portal clue in source.');
          }
          break;
        case 2:
          if (inputs.sshPass === 'vault123') {
            message.success('🛡️ SSH access granted!');
            nextStep();
          } else {
            message.error('Wrong SSH password! Check ssh clue in source.');
          }
          break;
        case 3:
          if (inputs.hiddenPass === 'h1dden') {
            message.success('👁️ Hidden login bypassed!');
            nextStep();
          } else {
            message.error('Wrong! Check hidden login clue in source.');
          }
          break;
        case 4:
          if (inputs.finalPass === 'finalpayload') {
            message.success('📦 Encrypted journal unlocked!');
            setFlagVisible(true);
          } else {
            message.error('Wrong password! Check encrypted journal clue in source.');
          }
          break;
        default:
          break;
      }
    });
  };

  const handleFlagSubmit = () => {
    if (inputs.flag === 'HEXNEX{Brut3_F0rc3_Atta)k}') {
      message.success('🏁 Flag correct! You completed the room!');
    } else {
      message.error('❌ Incorrect flag. Try again!');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0d1b2a, #1b263b)' }}>
      <Header style={{ color: '#40a9ff', fontSize: '20px' }}>
        <ThunderboltOutlined /> The Vault of Forgotten Credentials
      </Header>
      <Content style={{ padding: '24px' }}>
        <Card style={{ background: '#112d4e', borderRadius: '12px', position: 'relative' }}>
          {/* 👀 HIDDEN CLUES - VIEW PAGE SOURCE TO SEE ANSWERS */}
          {/* ✅ vault login username: vault_keeper */}
          {/* 🔐 portal password: password */}
          {/* 🛡️ ssh password: vault123 */}
          {/* 👁️ hidden login password: h1dden */}
          {/* 📦 final encrypted journal password: finalpayload */}
          {/* 🏁 final flag: HEXNEX{Brut3_F0rc3_Atta)k} */}

          <Steps current={step} size="small" style={{ marginBottom: '24px' }}>
            <Steps.Step title="Username Roulette" icon={<KeyOutlined />} />
            <Steps.Step title="Cracked Portal" icon={<LockOutlined />} />
            <Steps.Step title="SSH Brute" icon={<ApiOutlined />} />
            <Steps.Step title="Hidden Login" icon={<EyeInvisibleOutlined />} />
            <Steps.Step title="Encrypted Journal" icon={<FileZipOutlined />} />
          </Steps>

          {loading && <Spin tip="Brute forcing..." style={{ marginBottom: '20px' }} />}

          {step === 0 && !loading && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>🎲 Username Roulette</Title>
              <Paragraph style={{ color: '#dbe2ef' }}>
                Find the correct vault username hidden in this page source.
              </Paragraph>
              <Input
                placeholder="e.g., vault_keeper"
                value={inputs.username}
                onChange={e => handleInputChange('username', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Try</Button>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {step === 1 && !loading && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>🔐 Crack the Portal</Title>
              <Paragraph style={{ color: '#dbe2ef' }}>
                Password clue hidden in this page source.
              </Paragraph>
              <Input.Password
                placeholder="Enter portal password"
                value={inputs.portalPass}
                onChange={e => handleInputChange('portalPass', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Crack</Button>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {step === 2 && !loading && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>🛡️ SSH Brute-force</Title>
              <Paragraph style={{ color: '#dbe2ef' }}>
                Weak SSH password clue hidden in this page source.
              </Paragraph>
              <Input.Password
                placeholder="Enter SSH password"
                value={inputs.sshPass}
                onChange={e => handleInputChange('sshPass', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Brute Force</Button>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {step === 3 && !loading && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>👁️ Hidden Login</Title>
              <Paragraph style={{ color: '#dbe2ef' }}>
                Hidden login password clue in this page source.
              </Paragraph>
              <Input.Password
                placeholder="Enter hidden login password"
                value={inputs.hiddenPass}
                onChange={e => handleInputChange('hiddenPass', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Submit</Button>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {step === 4 && !flagVisible && !loading && (
            <>
              <Title level={4} style={{ color: '#dbe2ef' }}>📦 Encrypted Journal</Title>
              <Paragraph style={{ color: '#dbe2ef' }}>
                Final password clue hidden in this page source.
              </Paragraph>
              <Input.Password
                placeholder="Enter final password"
                value={inputs.finalPass}
                onChange={e => handleInputChange('finalPass', e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <Button type="primary" onClick={handleSubmit}>Decrypt</Button>
              <Text style={{ color: '#dbe2ef' }}>Attempts: {attempts}</Text>
            </>
          )}

          {flagVisible && (
            <>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <FlagOutlined style={{ fontSize: '40px', color: '#40a9ff' }} />
                <Paragraph style={{ color: '#dbe2ef', marginTop: '10px' }}>
                  🎉 Congratulations! You found the final payload:
                </Paragraph>
                <Paragraph copyable code style={{ color: '#fff', fontSize: '18px' }}>
                  HEXNEX{'{Brut3_F0rc3_Atta)k}'}
                </Paragraph>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Title level={4} style={{ color: '#dbe2ef' }}>🏁 Submit your flag</Title>
                <Input
                  placeholder="HEXNEX{...}"
                  value={inputs.flag}
                  onChange={e => handleInputChange('flag', e.target.value)}
                  style={{ marginBottom: '10px' }}
                />
                <Button type="primary" onClick={handleFlagSubmit}>Submit Flag</Button>
              </div>
            </>
          )}
        </Card>
      </Content>
    </Layout>
  );
};

export default BruteForceRoom;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Button,
  Card,
  Row,
  Col,
  Tag,
  Progress,
  Space,
} from "antd";
import {
  BookOutlined,
  SafetyOutlined,
  PlayCircleOutlined,
  ArrowLeftOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const contentData = {
  phishing: {
    title: "Phishing",
    difficulty: "Easy",
    progress: 45,
    overview:
      "Phishing attacks trick users into revealing sensitive information via deceptive emails, messages, or fake websites.",
    bullets: [
      "Recognize suspicious links and sender addresses.",
      "Verify URLs before entering credentials.",
      "Enable Multi-Factor Authentication (MFA).",
      "Report phishing attempts immediately.",
    ],
  },
};

const WalkthroughTopics = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState("concepts");

  // If no topic param, show the topics index
  if (!topic) {
    const topics = Object.keys(contentData);
    return (
      <Layout style={{ background: 'transparent', minHeight: '100vh', padding: '60px 0' }}>
        <Content>
          <Row justify="center">
            <Col xs={22} md={16} lg={14}>
              <Card bordered={false} style={{ marginBottom: 24 }}>
                <Title level={2}>General Walkthrough Topics</Title>
                <Paragraph>Choose a topic to view its walkthrough and resources.</Paragraph>
              </Card>

              <Row gutter={[16, 16]}>
                {topics.map((t) => (
                  <Col key={t} xs={24} sm={12} md={8}>
                    <Card>
                      <Card.Content style={{ padding: 16 }}>
                        <Title level={4} style={{ margin: 0 }}>{contentData[t].title}</Title>
                        <Paragraph style={{ marginTop: 8 }}>{contentData[t].overview}</Paragraph>
                        <Button type="primary" onClick={() => navigate(`/walkthrough/topics/${t}`)}>Open</Button>
                      </Card.Content>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }

  const info = contentData[topic];
  if (!info) return <div style={{ padding: 40 }}>Topic not found.</div>;

  const difficultyColor = info.difficulty === 'Easy' ? 'green' : info.difficulty === 'Medium' ? 'orange' : 'red';

  return (
    <Layout style={{ background: 'transparent', minHeight: '100vh', padding: '60px 0' }}>
      <Content>
        <Row justify="center">
          <Col xs={22} md={16} lg={14}>
            <Card bordered={false} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderRadius: 16, color: 'white', marginBottom: 40 }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <Space align="center">
                    <SecurityScanOutlined style={{ fontSize: 24 }} />
                    <Title level={2} style={{ color: 'white', margin: 0 }}>{info.title}</Title>
                  </Space>
                  <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginTop: 12 }}>{info.overview}</Paragraph>
                </Col>
                <Col>
                  <Space direction="vertical">
                    <Tag color={difficultyColor}>Difficulty: {info.difficulty}</Tag>
                    <Tag color="blue">Topic</Tag>
                  </Space>
                </Col>
              </Row>
              <div style={{ marginTop: 24 }}>
                <Paragraph style={{ color: 'white', marginBottom: 8 }}>Completion Progress</Paragraph>
                <Progress percent={info.progress} strokeColor="#1890ff" />
              </div>
            </Card>

            <Row justify="center" style={{ marginBottom: 30 }}>
              <Space size="large">
                <Button type={view === 'concepts' ? 'primary' : 'default'} icon={<BookOutlined />} size="large" shape="round" onClick={() => setView('concepts')}>Concepts</Button>
                <Button type={view === 'guide' ? 'primary' : 'default'} icon={<SafetyOutlined />} size="large" shape="round" onClick={() => setView('guide')}>Simulation Guide</Button>
              </Space>
            </Row>

            <Card bordered={false} style={{ borderRadius: 20, minHeight: 280 }}>
              {view === 'concepts' ? (
                <>
                  <Title level={4}>Key Learning Points</Title>
                  <ul style={{ paddingLeft: 20 }}>
                    {info.bullets.map((item, index) => (
                      <li key={index} style={{ marginBottom: 10 }}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <Title level={4}>Step-by-Step Simulation Guide</Title>
                  <ol style={{ paddingLeft: 20 }}>
                    <li>Open the simulation and read the scenario.</li>
                    <li>Identify vulnerabilities or attack vectors.</li>
                    <li>Test safely without destructive actions.</li>
                    <li>Apply mitigation strategies.</li>
                    <li>Re-test and document findings.</li>
                  </ol>
                </>
              )}
            </Card>

            <Row justify="center" style={{ marginTop: 40 }}>
              <Space size="large">
                <Button type="primary" size="large" shape="round" icon={<PlayCircleOutlined />} onClick={() => navigate(`/rooms/${topic}`)}>Open Simulation</Button>
                <Button size="large" shape="round" icon={<ArrowLeftOutlined />} onClick={() => navigate('/walkthrough')}>Back</Button>
              </Space>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default WalkthroughTopics;
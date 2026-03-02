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
import api from '../../utils/api';

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

const WalkthroughRoom = () => {
  const { room } = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState("concepts");

  const info = contentData[room];

  if (!info) return null;

  const difficultyColor =
    info.difficulty === "Easy"
      ? "green"
      : info.difficulty === "Medium"
      ? "orange"
      : "red";

  return (
    <Layout style={{ background: "transparent", minHeight: "100vh", padding: "60px 0" }}>
      <Content>
        <Row justify="center">
          <Col xs={22} md={16} lg={14}>
            
            {/* HEADER CARD */}
            <Card
              bordered={false}
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                borderRadius: 16,
                color: "white",
                marginBottom: 40,
              }}
            >
              <Row justify="space-between" align="middle">
                <Col>
                  <Space align="center">
                    <SecurityScanOutlined style={{ fontSize: 24 }} />
                    <Title level={2} style={{ color: "white", margin: 0 }}>
                      {info.title}
                    </Title>
                  </Space>

                  <Paragraph style={{ color: "rgba(255,255,255,0.8)", marginTop: 12 }}>
                    {info.overview}
                  </Paragraph>
                </Col>

                <Col>
                  <Space direction="vertical">
                    <Tag color={difficultyColor}>
                      Difficulty: {info.difficulty}
                    </Tag>
                    <Tag color="blue">Cybersecurity Room</Tag>
                  </Space>
                </Col>
              </Row>

              <div style={{ marginTop: 24 }}>
                <Paragraph style={{ color: "white", marginBottom: 8 }}>
                  Completion Progress
                </Paragraph>
                <Progress percent={info.progress} strokeColor="#1890ff" />
              </div>
            </Card>

            {/* TOGGLE BUTTONS */}
            <Row justify="center" style={{ marginBottom: 30 }}>
              <Space size="large">
                <Button
                  type={view === "concepts" ? "primary" : "default"}
                  icon={<BookOutlined />}
                  size="large"
                  shape="round"
                  onClick={() => setView("concepts")}
                >
                  Concepts
                </Button>

                <Button
                  type={view === "guide" ? "primary" : "default"}
                  icon={<SafetyOutlined />}
                  size="large"
                  shape="round"
                  onClick={() => setView("guide")}
                >
                  Simulation Guide
                </Button>
              </Space>
            </Row>

            {/* CONTENT CARD */}
            <Card
              bordered={false}
              style={{
                borderRadius: 20,
                minHeight: 280,
              }}
            >
              {view === "concepts" ? (
                <>
                  <Title level={4}>Key Learning Points</Title>
                  <ul style={{ paddingLeft: 20 }}>
                    {info.bullets.map((item, index) => (
                      <li key={index} style={{ marginBottom: 10 }}>
                        {item}
                      </li>
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

            {/* ACTION BUTTONS */}
            <Row justify="center" style={{ marginTop: 40 }}>
              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  icon={<PlayCircleOutlined />}
                  onClick={() => navigate(`/rooms/${room}`)}
                >
                  Open Simulation
                </Button>

                <Button
                  size="large"
                  shape="round"
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem('token');
                      await api.post('/api/progress/complete-walkthrough', { topic: room, points: 10 }, { headers: { Authorization: `Bearer ${token}` } });
                      // feedback
                      // simple alert so we avoid importing message from antd
                      alert('Walkthrough marked complete (+10 pts)');
                    } catch (err) {
                      console.error(err);
                      alert('Failed to mark walkthrough complete');
                    }
                  }}
                >
                  Mark Complete
                </Button>

                <Button
                  size="large"
                  shape="round"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate("/walkthrough")}
                >
                  Back
                </Button>
              </Space>
            </Row>

          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default WalkthroughRoom;
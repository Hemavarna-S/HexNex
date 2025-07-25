import React, { useState } from "react";
import { Button, Input, Typography, Card, Space, Tag, message as antMessage, Comment, Avatar, List } from "antd";
import { askGroq } from "../utils/groq";

const { Title } = Typography;
const tools = ["General", "YARA", "Scapy", "OpenCTI", "Metasploit"];

const botAvatar = "https://api.dicebear.com/7.x/bottts/svg";    // or any image url
const userAvatar = "https://api.dicebear.com/7.x/pixel-art/svg";

const AIBotChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [tool, setTool] = useState("General");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newUserMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);
    try {
      const reply = await askGroq(input, tool);
      setMessages(prev => [...prev, newUserMessage, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      antMessage.error("Unable to reach Groq API.");
      setMessages(prev => [...prev, { sender: "bot", text: "Error: Unable to reach Groq API." }]);
    }
    setLoading(false);
  };

  return (
    <Space direction="vertical" style={{ width: "100%", padding: 24 }}>
      <Title level={3}>🧠 Cybersecurity AI Chatbot</Title>
      <Space wrap>
        {tools.map(t => (
          <Tag
            key={t}
            color={tool === t ? "blue" : "default"}
            style={{ cursor: "pointer" }}
            onClick={() => setTool(t)}
          >
            {t}
          </Tag>
        ))}
      </Space>

      <Card style={{ height: 400, overflowY: "auto" }}>
        <List
          dataSource={messages}
          renderItem={(msg, idx) => (
            <Comment
              key={idx}
              author={msg.sender === "user" ? "You" : "CyberBot"}
              avatar={<Avatar src={msg.sender === "user" ? userAvatar : botAvatar} />}
              content={msg.text}
              style={{ marginBottom: 8 }}
            />
          )}
        />
      </Card>

      <Space>
        <Input
          placeholder={`Ask about ${tool}...`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onPressEnter={sendMessage}
          disabled={loading}
          style={{ width: 400 }}
        />
        <Button type="primary" onClick={sendMessage} loading={loading}>
          Send
        </Button>
      </Space>
    </Space>
  );
};

export default AIBotChat;

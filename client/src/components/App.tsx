import React from 'react';
import { Layout, Row, Col, Typography, Card } from 'antd';
import Timetable from './Timetable';
import ChatDialog from './ChatDialog';

const App: React.FC = () => {
  const desktopWidth = { span: 12, offset: 6 };
  const mobileWidth = { span: 18, offset: 3 };

  return (
    <Layout id="app" className="App" style={{ height: '100%', width: '100%' }}>
      <Layout.Header
        className="App-header"
        style={{ textAlign: 'center', backgroundColor: 'inherit' }}
      >
        <Typography.Title level={2}>교양 뭐 듣지?</Typography.Title>
      </Layout.Header>
      <Layout.Content style={{ margin: '3% 0' }}>
        <Row>
          <Col md={desktopWidth} sm={mobileWidth} xs={mobileWidth}>
            <ChatDialog />
            <ChatDialog />
          </Col>
        </Row>
        <Row>
          <Col md={desktopWidth} sm={mobileWidth} xs={mobileWidth}>
            <Timetable />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default App;

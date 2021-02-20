import React, { useEffect } from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { startApp } from '../actions/actions';
import { AppState } from '../reducers';
import ChatDialog from './ChatDialog';
import ChatForm from './ChatForm';
import Timetable from './Timetable';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: AppState) => state.status);
  const messages = useSelector((state: AppState) => state.messages);

  const desktopWidth = { span: 12, offset: 6 };
  const mobileWidth = { span: 22, offset: 1 };

  useEffect(() => {
    dispatch(startApp());
  }, []);

  return (
    <Layout id="app" className="App" style={{ height: '100%', width: '100%' }}>
      <Layout.Header
        className="App-header"
        style={{ textAlign: 'center', backgroundColor: 'inherit' }}
      >
        <Typography.Title style={{ marginTop: '20px' }} level={2}>
          교양 뭐 듣지?
        </Typography.Title>
      </Layout.Header>
      <Layout.Content style={{ margin: '0', overflow: 'scroll' }}>
        <Row>
          <Col md={desktopWidth} sm={mobileWidth} xs={mobileWidth}>
            {messages.map(({ me, message, carouselList }) => (
              <ChatDialog me={me} text={message} selection={carouselList} />
            ))}
          </Col>
        </Row>
        <Row style={{ display: status === 'HELLO' ? 'flex' : 'none' }}>
          <Col md={desktopWidth} sm={mobileWidth} xs={mobileWidth}>
            <ChatForm />
          </Col>
        </Row>
        <Row
          style={{
            display: status === 'TIMETABLE_REQUESTED' ? 'flex' : 'none',
          }}
        >
          <Col md={desktopWidth} sm={mobileWidth} xs={mobileWidth}>
            <Timetable />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default App;

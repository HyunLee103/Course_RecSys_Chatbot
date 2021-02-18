import React, { useEffect } from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import Timetable from './Timetable';
import ChatDialog from './ChatDialog';
import { useDispatch, useSelector } from 'react-redux';
import { startApp } from '../actions/actions';
import { AppState } from '../reducers';
import ChatForm from './ChatForm';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: AppState) => state.messages);

  const desktopWidth = { span: 12, offset: 6 };
  const mobileWidth = { span: 18, offset: 3 };

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
        <Row>
          <Col md={desktopWidth} sm={mobileWidth} xs={mobileWidth}>
            <ChatForm />
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

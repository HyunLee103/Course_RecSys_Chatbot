import React from 'react';

import { Col, Row } from 'antd';
import ChatDialog from './ChatDialog';
import { Message } from '../reducers';
import { desktopWidth, mobileWidth } from './Layout';

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => (
  <Row>
    <Col md={desktopWidth} sm={mobileWidth} xs={mobileWidth}>
      {messages.map(({ me, message, carouselList }, index) => (
        <ChatDialog
          key={index}
          me={me}
          text={message}
          selection={carouselList}
        />
      ))}
    </Col>
  </Row>
);

export default ChatWindow;

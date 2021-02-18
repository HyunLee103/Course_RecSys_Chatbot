import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

const ChatDialogWrapper = styled.div`
  margin: 10px 0;
`;

// TODO props 로 선택하면됨
const ChatDialogContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// TODO 마진 주기
const ChatDialog = () => (
  <ChatDialogWrapper>
    <ChatDialogContainer>
      <Card
        size="small"
        style={{
          width: '80%',
          border: '1px solid black',
          borderRadius: '8px',
        }}
      >
        <p style={{ margin: 0 }}>Card content</p>
      </Card>
    </ChatDialogContainer>
  </ChatDialogWrapper>
);

export default ChatDialog;

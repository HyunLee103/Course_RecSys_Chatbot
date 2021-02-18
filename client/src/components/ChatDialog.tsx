import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';

interface ChatDialogStyleProps {
  me: boolean;
}

interface ChatDialogProps {
  me: boolean;
  text: string;
}

const ChatDialogWrapper = styled.div`
  margin: 10px 0;
`;

const ChatDialogContainer = styled.div<ChatDialogStyleProps>`
  display: flex;
  justify-content: ${props => (props.me ? 'flex-end' : 'flex-start')};
`;

const Textbox = styled(Card)<ChatDialogStyleProps>`
  width: 80%;
  background-color: ${props => (props.me ? '#177ddc' : '#ffffff')};
  border: 1px solid;
  border-color: ${props => (props.me ? '#177ddc' : '#ffffff')};
  border-radius: 8px;
  text-align: ${props => (props.me ? 'right' : 'left')};
`;

const Text = styled.p<ChatDialogStyleProps>`
  margin: 0;
  color: ${({ me }) => (me ? '#ffffff' : '#000000')};
`;

const ChatDialog = ({ me, text }: ChatDialogProps) => (
  <ChatDialogWrapper>
    <ChatDialogContainer me={me}>
      <Textbox me={me} size="small">
        <Text me={me} style={{ margin: 0 }}>
          {text}
        </Text>
      </Textbox>
    </ChatDialogContainer>
  </ChatDialogWrapper>
);

export default ChatDialog;

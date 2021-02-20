import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import UserSelectDialog from './UserSelectDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducers';
import { statusChange } from '../actions/actions';

interface ChatDialogStyleProps {
  me: boolean;
}

// FIXME any 고치기
interface ChatDialogProps {
  me: boolean;
  text: string;
  selection?: any[];
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

const ChatDialog = ({ me, text, selection }: ChatDialogProps) => {
  const dispatch = useDispatch();
  const status = useSelector((state: AppState) => state.status);
  const messages = useSelector((state: AppState) => state.messages);

  const buttons =
    selection && selection.length > 0 ? selection[0].optionList : [];

  useEffect(() => {
    const lastMessageText = messages[messages.length - 1].message;
    if (lastMessageText.slice(-1) === ')' && status !== 'TIMETABLE_REQUESTED') {
      dispatch(statusChange('TIMETABLE_REQUESTED'));
    }
  }, [messages, status, dispatch]);

  if (!text) {
    return <React.Fragment />;
  }

  return (
    <ChatDialogWrapper>
      <ChatDialogContainer me={me}>
        <Textbox me={me} size="small">
          <Text me={me} style={{ margin: 0 }}>
            {text}
          </Text>
          <UserSelectDialog buttons={buttons} />
        </Textbox>
      </ChatDialogContainer>
    </ChatDialogWrapper>
  );
};
export default ChatDialog;

import React from 'react';
import styled from 'styled-components';
import { Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducers';
import { sendMessage, writeMessage } from '../actions/actions';

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
  const chatInfo = useSelector(
    ({ ins_id, intent_id, param_id, user_id }: AppState) => ({
      ins_id,
      intent_id,
      param_id,
      user_id,
    })
  );

  const buttons =
    selection && selection.length > 0 ? selection[0].optionList : undefined;

  const handleClick = (value: number, label: string) => (event: any) => {
    dispatch(writeMessage(label));
    dispatch(sendMessage({ ...chatInfo, input_sentence: value }));
  };

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
          {buttons ? (
            buttons.map(({ value, label }: any) => (
              <Button
                style={{ margin: '2px' }}
                type="default"
                block
                onClick={handleClick(value, label)}
              >
                {label}
              </Button>
            ))
          ) : (
            <React.Fragment />
          )}
        </Textbox>
      </ChatDialogContainer>
    </ChatDialogWrapper>
  );
};
export default ChatDialog;

import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { sendMessage, statusChange, writeMessage } from '../actions/actions';
import { AppState } from '../reducers';
import { desktopWidth, mobileWidth } from './Layout';

interface ChatFormProps {
  show: boolean;
}

const ChatFormWrapper = styled(Row)<ChatFormProps>`
  display: ${props => (props.show ? 'flex' : 'none')};
`;

const { Search } = Input;

const ChatForm = ({ show }: ChatFormProps) => {
  const [value, setValue] = useState<string>('');

  const dispatch = useDispatch();
  const chatInfo = useSelector(
    ({ ins_id, intent_id, param_id, user_id }: AppState) => ({
      ins_id,
      intent_id,
      param_id,
      user_id,
    })
  );

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = () => {
    dispatch(writeMessage(value));
    dispatch(sendMessage({ ...chatInfo, input_sentence: value }));
    dispatch(statusChange('START_CONVERSATION'));
    setValue('');
  };

  return (
    <ChatFormWrapper show={show}>
      <Col md={desktopWidth} sm={mobileWidth} xs={mobileWidth}>
        <Search
          placeholder="답변을 입력하세요"
          allowClear
          enterButton="보내기!"
          size="large"
          onSearch={handleSubmit}
          onChange={handleChange}
          value={value}
        />
      </Col>
    </ChatFormWrapper>
  );
};

export default ChatForm;

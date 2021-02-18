import React, { useState } from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, writeMessage } from '../actions/actions';
import { AppState } from '../reducers';
import styled from 'styled-components';

const ChatInput = styled(Input.Search)`
  margin: 0 10px;
  border-radius: 8px;
`;

const ChatForm: React.FC = () => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const chatInfo = useSelector(
    ({ ins_id, intent_id, param_id, user_id }: AppState) => ({
      ins_id,
      intent_id,
      param_id,
      user_id,
    })
  );

  const handleChange = (event: any) => {
    setValue(event.currentTarget.value);
  };

  const handleSubmit = () => {
    dispatch(writeMessage(value));
    dispatch(sendMessage({ ...chatInfo, input_sentence: value }));
    setValue('');
  };

  return (
    <Input.Search
      placeholder="답변을 입력하세요"
      allowClear
      enterButton="보내기!"
      size="large"
      onSearch={handleSubmit}
      onChange={handleChange}
      value={value}
    />
  );
};

export default ChatForm;

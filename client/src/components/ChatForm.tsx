import React from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, writeMessage } from '../actions/actions';
import { AppState } from '../reducers';

const ChatForm: React.FC = () => {
  const dispatch = useDispatch();
  const chatInfo = useSelector(
    ({ ins_id, intent_id, param_id, user_id }: AppState) => ({
      ins_id,
      intent_id,
      param_id,
      user_id,
    })
  );

  const handleSubmit = async (values: any) => {
    dispatch(writeMessage(values));
    await dispatch(sendMessage({ ...chatInfo, input_sentence: values }));
  };

  return (
    <Input.Search
      placeholder="답변을 입력하세요"
      allowClear
      enterButton="보내기!"
      size="large"
      onSearch={handleSubmit}
    />
  );
};

export default ChatForm;

import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, writeMessage } from '../actions/actions';
import { AppState } from '../reducers';

interface UserSelectDialogProps {
  buttons: { value: number; label: string }[];
}

const UserSelectDialog = ({ buttons }: UserSelectDialogProps) => {
  const dispatch = useDispatch();
  const chatInfo = useSelector(
    ({ ins_id, intent_id, param_id, user_id }: AppState) => ({
      ins_id,
      intent_id,
      param_id,
      user_id,
    })
  );

  const handleClick = (value: number, label: string) => (event: any) => {
    dispatch(writeMessage(label));
    dispatch(sendMessage({ ...chatInfo, input_sentence: value }));
  };

  return (
    <React.Fragment>
      {buttons.map(({ value, label }: any) => (
        <Button
          style={{ margin: '2px' }}
          type="default"
          block
          onClick={handleClick(value, label)}
        >
          {label}
        </Button>
      ))}
    </React.Fragment>
  );
};

export default UserSelectDialog;

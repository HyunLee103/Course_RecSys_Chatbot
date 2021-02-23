import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { startApp } from '../actions/actions';
import { AppState } from '../reducers';
import ChatDialog from './ChatDialog';
import ChatForm from './ChatForm';
import Timetable from './Timetable';
import {
  AppLayout,
  AppLayoutContent,
  AppLayoutHeader,
  AppTitle,
} from './Layout';
import ChatWindow from './ChatWindow';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: AppState) => state.status);
  const messages = useSelector((state: AppState) => state.messages);

  useEffect(() => {
    dispatch(startApp());
  }, [dispatch]);

  return (
    <AppLayout id="app" className="App">
      <AppLayoutHeader className="App-header">
        <AppTitle level={2}>교양 뭐 듣지?</AppTitle>
      </AppLayoutHeader>
      <AppLayoutContent>
        <ChatWindow messages={messages} />
        <ChatForm show={status === 'HELLO'} />
        <Timetable show={status === 'TIMETABLE_REQUESTED'} />
      </AppLayoutContent>
    </AppLayout>
  );
};

export default App;

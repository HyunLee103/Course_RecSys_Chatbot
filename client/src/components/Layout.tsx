import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Header, Content } = Layout;

export const desktopWidth = { span: 12, offset: 6 };
export const mobileWidth = { span: 22, offset: 1 };

export const AppLayout = styled(Layout)`
  height: 100%;
  width: 100%;
`;

export const AppLayoutHeader = styled(Header)`
  text-align: center;
  background-color: inherit;
`;

export const AppTitle = styled(Typography.Title)`
  margin-top: 20px;
`;

export const AppLayoutContent = styled(Content)`
  margin: 0;
`;

import React from 'react';
import { Layout, Button } from 'antd';

type Props = {
  children?: React.ReactNode
}

const { Header, Footer, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#FF9900',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#000',
  backgroundColor: '#ffffff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#FF9900',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};

export const DefaultStyle:React.FC<Props> = (props) => {
  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}/>
        <Content style={contentStyle}>{props.children}</Content>
        <Footer style={footerStyle}/>
      </Layout>
    </>
  );
}

export default DefaultStyle;
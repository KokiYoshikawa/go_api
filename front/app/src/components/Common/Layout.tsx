import React from 'react';
import { Navigate } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Layout, Dropdown, Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

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

export const AppStyle:React.FC<Props> = (props) => {
  // const items: MenuProps['items'] = [
  //   {
  //     key: '1',
  //     label: (
  //       <>
  //       <label>sss</label>
  //       <Navigate to='/app'/>
  //       </>
  //     ),
  //   },
  //   {
  //     key: '2',
  //     label: (
  //       <>
  //       <label>sss</label>
  //       <Navigate to='/app/user/login'/>
  //       </>
  //     ),
  //   },
  // ];
  return (
    <>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          {/* <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown> */}
        </Header>
        <Content style={contentStyle}>{props.children}</Content>
        <Footer style={footerStyle}/>
      </Layout>
    </>
  );
}
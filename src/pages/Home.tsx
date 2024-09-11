import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);

const Home: React.FC = () => {
  return <PageContainer>welcome</PageContainer>;
};

export default Home;

import React from 'react';
import wrapper from '../redux/store/config';

interface IApp {
  Component: any;
}

const App = ({ Component }: IApp) => (
  <>
    <Component />
  </>
);

export default wrapper.withRedux(App);

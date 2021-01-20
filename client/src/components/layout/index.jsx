import React, { Fragment } from 'react';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, setOpenDrawer, openDrawer }) => (
  <Fragment>
    <Header setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    {children}
    <Footer />
  </Fragment>
);

export default Layout;

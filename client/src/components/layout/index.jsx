import React, { Fragment, useState } from 'react';
import cx from 'classnames';

import Header from './Header';
import Footer from './Footer';

import useStyles from './styles';

const Layout = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { content, contentShift } = useStyles();

  return (
    <>
      <Header setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
      <main
        className={cx(content, {
          [contentShift]: openDrawer,
        })}
      >
        <div style={{ minHeight: 80 }} />

        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;

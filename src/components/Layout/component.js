import React from 'react';

import SideBar from '../SideBar';
import AppNavBar from '../Appbar';

const Layout = ({ classes, children }) => {
  return (
    <div className={classes.layout}>
      <SideBar />
      <div className={classes.container}>
        <AppNavBar />
        <div className={classes.mainContent}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
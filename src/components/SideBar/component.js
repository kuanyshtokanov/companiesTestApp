import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

import SidebarMenu from './SideBarMenu';

class Sidebar extends Component {
  render() {
    const { classes } = this.props;

    return (
      // <div className={classes.wrapper}>

      <SidebarMenu />

      // </div>
    );
  }
}

export default Sidebar;

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Router from 'next/router';
import React, { Component } from 'react';

import Logo from './Logo';

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    const sections = [
      {
        label: "Клиенты",
        path: "/",
        icon: <AssignmentIcon color={"primary"} />,
        onClick: () => Router.push('/')
      },
      {
        label: "Выход",
        path: "/",
        icon: <ExitToAppIcon color={"secondary"} />,
        onClick: () => alert('Нет такого метода в API')
      },
    ];

    return (
      <Drawer
        className={classes.fullHeight}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Logo />
        <List component="nav">
          {sections.map(section => (
            <MenuItem
              key={section.label}
              className={classes.menuItem}
              onClick={section.onClick}
            >
              {section.icon}
              {section.label}
            </MenuItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default Sidebar;

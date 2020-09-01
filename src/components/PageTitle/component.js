import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import React from 'react';

const PageTitle = ({ classes, children, active, onClick }) => (
  <Link
    component="button"
    className={active ? classes.activePageTitle : classes.pageTitle}
    variant="h4"
    onClick={() => onClick()}
  >
    {children}
  </Link>
);

export default PageTitle;

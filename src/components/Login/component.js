import React from 'react';
import { Paper } from '@material-ui/core';
import Form from './Form';

const Login = ({ classes, submit }) => {
  return (
    <div className={classes.paperWrap}>
      <Paper className={classes.paper}>
        <Form submit={submit} />
      </Paper>
    </div>
  )
}

export default Login;
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import AddCompanyDialog from '../AddCompanyDialog';

const AppNavBar = ({ classes, submit }) => {
  const [isDialogOpen, setDialog] = useState(false);
  const value = useContext(AuthContext);

  const handleDialogOpenClose = () => {
    setDialog(!isDialogOpen);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            {value.title}
          </Typography>

          <Button
            style={{ backgroundColor: '#007BFF' }}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => handleDialogOpenClose()}
          >
            Добавить
            </Button>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <AddCompanyDialog open={isDialogOpen} handleClose={handleDialogOpenClose} />
    </div>
  )
}

export default AppNavBar;
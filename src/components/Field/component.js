import React from 'react';
import TextField from '@material-ui/core/TextField';

const Field = ({ classes, label, name, value, onChange, large }) => {
  return (
    <div className={large ? classes.itemFieldLarge : classes.itemFieldSmall}>
      <TextField
        variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        // fullWidth={true}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export default Field;
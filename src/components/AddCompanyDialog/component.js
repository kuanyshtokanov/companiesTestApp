import React, { useState, useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import { post } from '../../api';
import { getCompanyModel } from '../../utils/model';
import Field from '../Field';

const AddCompanyDialog = ({ classes, open, handleClose }) => {
  const [data, setData] = useState(getCompanyModel());

  // useEffect(() => {
  //   setData(getCompanyModel());
  // }, []);

  const saveData = async () => {
    await post('companies/', JSON.stringify(data))
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((ex) => {
        console.log(ex);
        alert("Ошибка");
      });
  };

  const handleSaveData = () => {
    if (!data.name) {
      alert("Заполните поле Наименование компании");
    } else if (!data.shortname) {
      alert("Заполните поле Короткое Наименование");
    } else if (!validateEmail(data.email)) {
      alert("Email кривой");
    } else {
      saveData();
    }
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Добавить клиента</DialogTitle>
      <div className={classes.info}>
        <div className={classes.infoPartInside}>
          <Field
            label={"Наименование компании"}
            value={data.name || ''}
            onChange={handleChange}
            name={'name'}
            large={true}
          />
          <Field
            label={"Короткое название"}
            value={data.shortname || ''}
            onChange={handleChange}
            name={'shortname'}
          />
        </div>
        <div className={classes.infoPartInside}>
          <Field
            label={"Тип юр.дица"}
            value={data.registered_type || ''}
            onChange={handleChange}
            name={'registered_type'}
          />
          <Field
            label={"Сфера деятельности"}
            value={data.workscope || ''}
            onChange={handleChange}
            name={'workscope'}
          />
        </div>

        <div className={classes.infoPartInside}>
          <Field
            label={"Регион"}
            value={data.region || ''}
            onChange={handleChange}
            name={'region'}
          />
          <Field
            label={"Город"}
            value={data.city || ''}
            onChange={handleChange}
            name={'city'}
          />
        </div>

        <div className={classes.infoPartInside}>
          <Field
            label={"Email"}
            value={data.email || ''}
            onChange={handleChange}
            name={'email'}
          />
          <Field
            label={"Телефон"}
            value={data.phone || ''}
            onChange={handleChange}
            name={'phone'}
          />
        </div>

        <Field
          label={"Дополнительно"}
          value={data.description || ''}
          onChange={handleChange}
          name={'description'}
          large={true}
        />

      </div>
      <Button
        style={{ alignSelf: 'flex-end', backgroundColor: '#007BFF', margin: 25 }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => handleSaveData()}
      >
        Сохранить
      </Button>
    </Dialog>
  )
}

export default AddCompanyDialog;
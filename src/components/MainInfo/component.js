import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import Router, { withRouter } from 'next/router';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import Field from '../Field';

import { get, put } from '../../api';

class MainInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: {},
      currentId: props.router.query.id,
    };
  };

  static async getInitialProps(context) {
    let query = context.query;
    return { query }
  }

  setLoading(val) {
    this.setState({ loading: val });
  }

  setData(vals) {
    this.setState({ data: vals });
  }

  async loadData(id) {
    await get('companies/' + id, {})
      .then((response) => {
        this.setData(response);
      })
    this.setLoading(false)
  }

  async saveData() {
    await put('companies/' + this.props.router.query.id + '/', JSON.stringify(this.state.data))
      .then((response) => {
        console.log(response);
        Router.push('/');
      })
      .catch((ex) => {
        alert("Ошибка");
      });
  }

  componentDidMount() {
    this.loadData(this.props.router.query.id);
  };

  handleSaveData = () => {
    if (!this.state.data.name) {
      alert("Заполните поле Наименование компании");
    } else if (!this.state.data.shortname) {
      alert("Заполните поле Короткое Наименование");
    } else {
      this.saveData();
    }
  }

  handleChange = (event) => {
    const data = this.state.data;
    data[event.target.name] = event.target.value;
    this.setState({ data });
  }

  handleSwitch = (event) => {
    const data = this.state.data;
    data[event.target.name] = event.target.checked;
    this.setState({ data });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${this.state.name} ${this.state.shortname}`);
  }

  render() {
    return (
      <div className={'info'}>
        <div className={'info-part'}>
          <Typography
            style={{ marginLeft: '20px', marginTop: '20px' }}
            variant="h5">
            Основная информация
            </Typography>

          <Field
            label={"Наименование компании"}
            value={this.state.data.name || ''}
            onChange={this.handleChange}
            name={'name'}
            large={true}
          />

          <div className={'info-part__inside'}>
            <Field
              label={"Короткое название"}
              value={this.state.data.shortname || ''}
              onChange={this.handleChange}
              name={'shortname'}
            />
            <Field
              label={"Сфера деятельности"}
              value={this.state.data.workscope || ''}
              onChange={this.handleChange}
              name={'workscope'}
            />
          </div>

          <div className={'info-part__inside'}>
            <Field
              label={"Регион"}
              value={this.state.data.region || ''}
              onChange={this.handleChange}
              name={'region'}
            />
            <Field
              label={"Город"}
              value={this.state.data.city || ''}
              onChange={this.handleChange}
              name={'city'}
            />
          </div>

          <div className={'info-part__inside'}>
            <Field
              label={"Email"}
              value={this.state.data.email || ''}
              onChange={this.handleChange}
              name={'email'}
            />
            <Field
              label={"Телефон"}
              value={this.state.data.phone || ''}
              onChange={this.handleChange}
              name={'phone'}
            />
          </div>

          <Field
            label={"Дополнительно"}
            value={this.state.data.description || ''}
            onChange={this.handleChange}
            name={'description'}
            large={true}
          />
        </div>

        <div className={'info-part'}>
          <Typography
            style={{ marginLeft: '20px', marginTop: '20px' }}
            variant="h5"
          >
            Реквизиты компании
            </Typography>

          <Field
            label={"Наименование юр.лица"}
            value={this.state.data.registered_name || ''}
            onChange={this.handleChange}
            name={'registered_name'}
            large={true}
          />

          <div className={'info-part__inside'}>
            <Field
              label={"Тип юр.лица"}
              value={this.state.data.registered_type || ''}
              onChange={this.handleChange}
              name={'registered_type'}
            />
            <Field
              label={"БИН/ИИН"}
              value={this.state.data.bin_iin || ''}
              onChange={this.handleChange}
              name={'bin_iin'}
            />
          </div>

          <div className={'info-part__inside'}>
            <Field
              label={"Руководитель"}
              value={this.state.data.leader || ''}
              onChange={this.handleChange}
              name={'leader'}
            />
            <Field
              label={"Должность руководителя"}
              value={this.state.data.leader_position || ''}
              onChange={this.handleChange}
              name={'leader_position'}
            />
          </div>

          <div className={'info-part__inside'}>
            <Field
              label={"Юридический адрес"}
              value={this.state.data.registered_address || ''}
              onChange={this.handleChange}
              name={'registered_address'}
            />
            <Field
              label={"Фактический адрес"}
              value={this.state.data.address || ''}
              onChange={this.handleChange}
              name={'address'}
            />
          </div>
          <div className={'info-part__inside'}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.data.tax_payer ? true : false}
                  onChange={this.handleSwitch}
                  color="primary"
                  name="tax_payer"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
              label="Плательщик НДС (Нет/Да)"
              labelPlacement="start"
            />
          </div>
          <Button
            style={{ alignSelf: 'flex-end', backgroundColor: '#007BFF' }}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => this.handleSaveData()}
          >
            Сохранить
            </Button>
        </div>



        <style jsx>{`
        .info {
          display: flex;
          flex=direction: column;
          justify-content: space-around;
        }

        .info-part {
          display: flex;
          flex-direction: column;
          width: 45%;
        }

        .info-part__inside {
          display: flex;
          align-items: stretch;
          width: 100%;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
      </div>
    )
  };
}

// Home.getInitialProps = async ({ req }) => {
//   const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
//   const res = await fetch(`${baseURL}/api/thoughts`);
//   return {
//     thoughts: await res.json()
//   };
// };

export default withRouter(MainInfo);

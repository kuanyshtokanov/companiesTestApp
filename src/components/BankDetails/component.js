import React, { useState, useEffect, useContext } from 'react';
import MUIDataTable from "mui-datatables";
import MaterialTable from 'material-table';
import Router from 'next/router';

import { put, remove } from '../../api';

const BankDetails = ({ classes, data, companyId }) => {
  const [state, setState] = useState({
    columns: [
      {
        field: "bank",
        title: "Банк",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        field: "bank_id_code",
        title: "БИК",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        field: "account_number",
        title: "Номер счета",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        field: "currency",
        title: "Валюта",
        options: {
          filter: true,
          sort: true,
        }
      },
    ],
    data: data.bank_details,
  });

  const saveData = async (newData) => {
    await put('companies/' + companyId + '/bank_details/' + newData.id + '/', JSON.stringify(newData))
      .then((response) => {
        console.log(response);
        // Router.push('/');
      })
      .catch((ex) => {
        alert("Ошибка");
      });
  };

  const removeData = async (id) => {
    await remove('companies/' + companyId + '/bank_details/' + id + '/', {})
      .then((response) => {
        console.log(response);
        // Router.push('/');
      })
      .catch((ex) => {
        alert("Ошибка");
      });
  }

  const getDataId = (id) => {
    return state.data[id].id;
  }

  return (
    <>
      <MaterialTable
        className={classes.dataTable}
        title="Банковские реквизиты компании"
        data={state.data}
        columns={state.columns}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  }, saveData(newData));

                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                }, removeData(oldData.id));
              }, 600);
            }),
        }}
      />
    </>
  )
}

export default BankDetails;
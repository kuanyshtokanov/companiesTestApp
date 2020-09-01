import React, { useState, useEffect, useContext } from 'react';
import MUIDataTable from "mui-datatables";
import Router from 'next/router';

import { AuthContext } from '../../context/AuthProvider';
import { get } from '../../api';

const DataTable = ({ classes, children }) => {
  const value = useContext(AuthContext);
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);

  const columns = [
    {
      name: "name",
      label: "Наименование компании",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "registered_type",
      label: "Тип юр.лица",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "region",
      label: "Регион",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "city",
      label: "Город",
      options: {
        filter: true,
        sort: true,
      }
    },
  ];

  const getDataId = (id) => {
    return data[id].id;
  }

  useEffect(() => {
    async function loadData() {
      await get('companies/', {})
        .then((response) => {
          console.log(response.results);
          setData(response.results);
        })
      setLoading(false)
    }
    loadData()
  }, []);

  const options = {
    selectableRows: 'none',
    standard: 'standard',
    onRowClick: (rowData, rowMeta) => {
      value.setTitle('');
      Router.push('/companies/' + getDataId(rowMeta.dataIndex));
    }
  };
  return (
    <MUIDataTable
      className={classes.dataTable}
      // title={"Employee List"}
      data={data}
      columns={columns}
      options={options}
    />
  )
}

export default DataTable

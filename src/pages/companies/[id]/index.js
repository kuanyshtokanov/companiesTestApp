import React, { Component } from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';


import Layout from '../../../components/Layout';
import MainInfo from '../../../components/MainInfo';
import PageTitle from '../../../components/PageTitle';
import BankDetails from '../../../components/BankDetails';
import { get } from '../../../api';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfoPage: true,
      loading: true,
      data: {},
    }
  };

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

  componentDidMount() {
    this.loadData(this.props.router.query.id);
  };

  static async getInitialProps(context) {
    let query = context.query;
    return { query }
  }

  handlelinkClick = (val) => {
    this.setState({ isInfoPage: val });
  }

  render() {
    const { isInfoPage, data } = this.state;
    return (
      <Layout>
        <Head>
          <title>Company page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div style={{
          display: 'flex', alignItems: 'center', borderBottom: '1px solid #C4C4C4'
        }}>
          <PageTitle active={isInfoPage} onClick={() => this.handlelinkClick(true)}>Информация</PageTitle>
          <PageTitle active={!isInfoPage} onClick={() => this.handlelinkClick(false)}>Банковские реквизиты</PageTitle>
        </div>
        {isInfoPage ? (<MainInfo />)
          : (<BankDetails companyId={this.props.router.query.id} data={data} />)}

        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      </Layout >
    )
  };
}

export default withRouter(Client);

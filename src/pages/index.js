import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Layout from '../components/Layout';
import DataTable from '../components/DataTable';
import { ProtectRoute } from '../hocs/withAuth';

function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <DataTable />
      </main>

      <style jsx>{`
        .container {
          // // min-height: 100vh;
          // // padding: 0 0.5rem;
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          // align-items: center;
        }

        main {
          // padding: 5rem 0;
          // flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

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
    </Layout>
  )
}

// Home.getInitialProps = async ({ req }) => {
//   const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
//   const res = await fetch(`${baseURL}/api/thoughts`);
//   return {
//     thoughts: await res.json()
//   };
// };

export default ProtectRoute(Home);

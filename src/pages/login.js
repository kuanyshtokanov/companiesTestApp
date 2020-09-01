import { useEffect, useContext } from "react";
import Router from 'next/router';

import { AuthContext } from '../context/AuthProvider';
// import Layout from "../components/layout";
import Login from '../components/Login';

const LoginPage = () => {
  useEffect(() => {
    // Prefetch the dashboard page as the user will go there after the login
    Router.prefetch('/dashboard')
  }, [])
  const value = useContext(AuthContext);

  const handleSubmit = async (username, password) => {
    try {
      value.login(username, password)
        .then((res) => {
          if (!value.isAuthenticated) {
            console.log('Error login');
          }
          console.log(res)
        });
    } catch (error) {
      console.error(
        "You have an error in your code or there are Network issues.",
        error
      );
      throw new Error(error);
    }
  }

  return (
    <>
      <Login submit={handleSubmit} />
    </>
  );

}

export default LoginPage;
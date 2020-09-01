import React, { createContext, useState, useContext, useEffect } from 'react'
import Router from 'next/router'

//api here is an axios instance
import { post, getAuthToken, setAuthToken, setRefreshToken } from '../api';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('Клиенты')

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = getAuthToken();
      if (token) {
        await post('token/verify/', {
          token: token
        })
          .then((response) => {
            if (response.code) {
              console.log(response.detail);
              Router.push('/login');
            } else {
              setUser('asd');
            }
          })
      } else {
        Router.push('/login');
      }
      setLoading(false)
    }
    loadUserFromCookies()
  }, [])

  const login = async (email, password) => {
    await post('token/', { email, password })
      .then((response) => {

        if (!response.access) {
          console.log(response.detail);
        } else {
          console.log("Got token");
          setUser('asd');
          setAuthToken(response.access);
          setRefreshToken(response.refresh);
          Router.push('/');
        }
      })
      .catch((e) => {
        console.log('Error while Login');
        console.error(e);
      });
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, title, setTitle, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const context = useContext(AuthContext)

  return context
};

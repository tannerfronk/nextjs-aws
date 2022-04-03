import '../styles/globals.css'
import React from 'react'
import Layout from '../components/layout/Layout'
import { Amplify } from "aws-amplify"
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import awsmobile from '../aws-exports'
Amplify.configure(awsmobile) 

function MyApp({ Component, pageProps }) {

  return (
    <Authenticator variation='modal'>
      {({ signOut, user }) => (
            <Layout user={user} signOut={signOut}>
              {/* <h1>Hello {user.username}</h1> */}
              <Component {...pageProps} />  
            </Layout>
      )}
      {/* <Layout>
        <Component {...pageProps} />  
      </Layout> */}
    </Authenticator>
  )
}

export default MyApp

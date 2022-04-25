import '../styles/globals.css'
import React from 'react'
import Layout from '../components/layout/Layout'
import { Amplify, AuthModeStrategyType } from "aws-amplify"
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../aws-exports'
Amplify.configure({
  ...config,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
}) 

function MyApp({ Component, pageProps }) {

  return (
    <Authenticator variation='modal'>
      {({ signOut, user }) => (
            <Layout user={user} signOut={signOut}>
              <Component {...pageProps} user={user} />  
            </Layout>
      )}
      {/* <Layout>
        <Component {...pageProps} />  
      </Layout> */}
    </Authenticator>
  )
}

export default MyApp

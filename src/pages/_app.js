import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { Amplify } from "aws-amplify"
import awsmobile from '../aws-exports'
Amplify.configure(awsmobile) 

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />  
    </Layout>
  )
}

export default MyApp

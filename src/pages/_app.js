import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { Amplify } from "aws-amplify"
import { awsExports } from '../aws-exports'
Amplify.configure({ ...awsExports, ssr: true }); // this allows graphql fetching with getStaticProps

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />  
    </Layout>
  )
}

export default MyApp

import Authentication from "../components/Authentication"
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Signup(){
    return <div>
        <Head>
            <title>Sign up - Jonathan Freire</title>
            <meta name="description" content="Sign up" />
        </Head>
        <Layout title="Social art." subtitle="Jonathan Freire." refTitle="/">
            <Authentication type="signup" />
        </Layout>
    </div>
}
import Authentication from "../components/Authentication"
import Head from 'next/head'
import Layout from '../components/Layout'

export default function Signin(){
    return <div>
        <Head>
            <title>Sign in - Jonathan Freire</title>
            <meta name="description" content="Sign in" />
        </Head>
        <Layout title="Social art." subtitle="Jonathan Freire." refTitle="/">
            <Authentication type="signin" />
        </Layout>
    </div>
}
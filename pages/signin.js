import Authentication from "../components/Authentication"
import Head from 'next/head'
import Layout from '../components/Layout'

export default function signin(){
    return <div>
        <Head>
            <title>Sign in - Jonathan Freire</title>
            <meta name="description" content="Sign in" />
        </Head>
        <Layout title="Social art." subtitle="Jonathan Freire." refTitle="/" firstRef="/#works" firstName="Works." secondRef="#footer" secondName="Contact me.">
            <Authentication type="signin" />
        </Layout>
    </div>
}
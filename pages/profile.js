import Head from 'next/head'
import Layout from '../components/Layout'
import Account from '../components/Account'
import { useSession } from "next-auth/client"
import Loading from "../components/Loading"
import { useRouter } from "next/router";

export default function Profile(){
    const router = useRouter();
    const [session, loading] = useSession();
    if(loading) {
        return <Loading />
    }
    if(!session){
        router.push('/signin');
        return <Loading />
    }

    return <div>
        <Head>
            <title>Profile - Jonathan Freire</title>
            <meta name="description" content="Edit your profile" />
        </Head>
        <Layout title="Social art." subtitle="Jonathan Freire." refTitle="/">
            <Account session={session} />
        </Layout>
    </div>
}
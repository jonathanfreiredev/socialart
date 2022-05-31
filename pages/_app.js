import '../styles/globals.scss'
import Head from 'next/head'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  const urlCookieHubDev = "https://dash.cookiehub.com/dev/";
  const urlCookieHubProd = "https://cookiehub.net/c2/";
  const dev = process.env.NODE_ENV === "development" ? urlCookieHubDev : urlCookieHubProd;
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap" rel="stylesheet"></link>
      <link rel="icon" href="/favicon/favicon.ico" />
      <script 
        type="text/javascript" 
        dangerouslySetInnerHTML={{ __html: `
          let cpm={};(function(a,c,d){var b=a.getElementsByTagName("script")[0];a=a.createElement("script");a.async=!0;a.src="${dev}c3f6f836.js";a.onload=function(){c.cookiehub.load(d)};b.parentNode.insertBefore(a,b)})(document,window,cpm);
        `}}
      >
      </script>
    </Head>
    <Provider
    // Provider options are not required but can be useful in situations where
    // you have a short session maxAge time. Shown here with default values.
    options={{
      // Client Max Age controls how often the useSession in the client should
      // contact the server to sync the session state. Value in seconds.
      // e.g.
      // * 0  - Disabled (always use cache value)
      // * 60 - Sync session state with server if it's older than 60 seconds
      clientMaxAge: 0,
      // Keep Alive tells windows / tabs that are signed in to keep sending
      // a keep alive request (which extends the current session expiry) to
      // prevent sessions in open windows from expiring. Value in seconds.
      //
      // Note: If a session has expired when keep alive is triggered, all open
      // windows / tabs will be updated to reflect the user is signed out.
      keepAlive: 0
    }}
    session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp

import '../styles/globals.scss'
import Head from 'next/head'

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
    <Component {...pageProps} />
  </>
}

export default MyApp

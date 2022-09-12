import { Html, Head, Main, NextScript } from "next/document"

const Document = () => (
  <Html>
    <Head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link rel="icon" href="/eth.svg" />
    </Head>
    <body>
      <Main />
      <p>IP: </p>
      <NextScript />
    </body>
  </Html>
)

export default Document

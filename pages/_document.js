import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
            rel='stylesheet'
          />
          <script
            async
            defer
            data-domain='ghutils.dingran.me'
            src='https://plausible.dingran.me/js/index.js'
          ></script>
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="960c9de1-2146-4fb1-8ded-0595aa107bd1";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

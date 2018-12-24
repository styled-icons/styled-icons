import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [...(initialProps.styles as any), ...sheet.getStyleElement()],
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta http-equiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          <link rel="shortcut icon" href="/icons/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
          <link rel="manifest" href="/icons/manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#fff" />
          <meta name="application-name" content="styled-icons" />

          <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />

          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="styled-icons" />

          <link
            rel="apple-touch-startup-image"
            media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)"
            href="/icons/apple-touch-startup-image-320x460.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)"
            href="/icons/apple-touch-startup-image-640x920.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            href="/icons/apple-touch-startup-image-640x1096.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            href="/icons/apple-touch-startup-image-750x1294.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)"
            href="/icons/apple-touch-startup-image-1182x2208.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)"
            href="/icons/apple-touch-startup-image-1242x2148.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)"
            href="/icons/apple-touch-startup-image-748x1024.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)"
            href="/icons/apple-touch-startup-image-768x1004.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"
            href="/icons/apple-touch-startup-image-1496x2048.png"
          />
          <link
            rel="apple-touch-startup-image"
            media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)"
            href="/icons/apple-touch-startup-image-1536x2008.png"
          />

          <link rel="shortcut icon" href="/icons/icon-48x48.png" />
          <link rel="manifest" href="/manifest.webmanifest" />
          <meta name="theme-color" content="#db7093" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

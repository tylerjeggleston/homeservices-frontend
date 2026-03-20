import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Remodel Your Home",
  description: "Remodel funnel for home improvement services",
};

export default function RootLayout({ children }) {
  const BACKEND = "https://consent-5553e2e57659.herokuapp.com";

  return (
    <html lang="en">
      <body>
        {children}

        {/* Your recorder */}
        <Script
          src={`${BACKEND}/embed/recorder.js`}
          strategy="afterInteractive"
          data-backend={BACKEND}
          data-append-interval="5000"
          data-max-duration="600000"
          data-idle-hidden-finalize="300000"
          data-finalize-on="[data-rec-finalize]"
        />

        {/* TrustedForm */}
        <Script
          id="trustedform-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var tf = document.createElement('script');
                tf.type = 'text/javascript';
                tf.async = true;
                tf.src = (document.location.protocol === 'https:' ? 'https' : 'http') +
                  '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
                  new Date().getTime() + Math.random();
                var s = document.getElementsByTagName('script')[0];
                if (s && s.parentNode) {
                  s.parentNode.insertBefore(tf, s);
                }
              })();
            `,
          }}
        />

        {/* Google Maps */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />

        {/* Jornaya LeadiD */}
        <Script
          id="LeadiDscript"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var s = document.createElement('script');
                s.id = 'LeadiDscript_campaign';
                s.type = 'text/javascript';
                s.async = true;
                s.src = '//create.lidstatic.com/campaign/4b095f65-6705-68af-b800-3770bed128b3.js?snippet_version=2';
                var LeadiDscript = document.getElementById('LeadiDscript');
                if (LeadiDscript && LeadiDscript.parentNode) {
                  LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
                }
              })();
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="//create.leadid.com/noscript.gif?lac=5B706989-5F15-8CDB-54F3-8AEA22ABE09B&lck=4b095f65-6705-68af-b800-3770bed128b3&snippet_version=2"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
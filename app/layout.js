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
      </body>
    </html>
  );
}
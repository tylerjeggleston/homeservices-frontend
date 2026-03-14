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
        {/* Hidden fields for TrustedForm / Jornaya */}
        <input type="hidden" name="xxTrustedFormCertUrl" />
        <input type="hidden" name="leadid_token" />
        <input type="hidden" name="universal_leadid" />

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
          src="https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl"
          strategy="afterInteractive"
        />

        {/* Jornaya / LeadiD */}
        <Script
          id="jornaya-script"
          src="https://create.lidstatic.com/campaign/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.js?snippet_version=2"
          strategy="afterInteractive"
        />

        {/* Google Maps */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
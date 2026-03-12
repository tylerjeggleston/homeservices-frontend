import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Remodel Your Home",
  description: "Remodel funnel demo",
};

export default function RootLayout({ children }) {
  const BACKEND = "https://consent-5553e2e57659.herokuapp.com";
  return (
    <html lang="en">
      <body>

        {children}

        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
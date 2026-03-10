import "./globals.css";

export const metadata = {
  title: "Remodel Your Home",
  description: "Remodel funnel demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
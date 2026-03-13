import Link from "next/link";
import { MARKETING_PARTNERS } from "../../lib/marketingPartners";

export const metadata = {
  title: "Marketing Partners | Remodel Your Home",
  description: "Marketing partners list for Remodel Your Home",
};

export default function MarketingPartnersPage() {
  return (
    <div className="marketing-page">
      <header className="marketing-header">
        <Link href="/" className="marketing-logo-link">
          <div className="marketing-logo-wrap" aria-label="Remodel Your Home">
            <div className="marketing-logo-mark">///</div>
            <div className="marketing-logo-text">
              <div className="marketing-logo-small">REMODEL</div>
              <div className="marketing-logo-big">YOUR HOME</div>
            </div>
          </div>
        </Link>
      </header>

      <main className="marketing-main">
        <h1 className="marketing-title">Marketing Partners</h1>

        <p className="marketing-intro">
          If you signed up on our website you may be contacted by one or more of
          these companies:
        </p>

        <section className="marketing-list-wrap">
          <ul className="marketing-list">
            {MARKETING_PARTNERS.map((partner, index) => (
              <li key={`${partner}-${index}`} className="marketing-list-item">
                {partner}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="marketing-footer">
        <div>© 2026 RemodelYourHome.net</div>

        <div className="marketing-footer-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms">Terms of Use</Link>
          <span>|</span>
          <Link href="/do-not-sell-my-personal-information">Do Not Sell My Personal Information</Link>
          <span>|</span>
          <Link href="/contact">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}
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
          <div className="rw-logo" aria-label="Remodel Wiz">
            <span className="rw-logo-badge">RW</span>
            <div className="rw-logo-text">
              <span className="rw-logo-top">REMODEL</span>
              <span className="rw-logo-bottom">WIZ</span>
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
        <div>© 2026 RemodelWiz.com</div>

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
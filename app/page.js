import Link from "next/link";

const services = [
  { title: "Roofing", slug: "roofing-v1pvcs" },
  { title: "Windows", slug: "windows-v1pvcs" },
  { title: "Solar", slug: "solar-v1pvcs" },
  { title: "Bathroom", slug: "bathroom-v1pvcs" },
  { title: "Gutters", slug: "gutters-v1pvcs" },
  { title: "HVAC", slug: "hvac-v1pvcs" },
  { title: "Painting", slug: "painting-v1pvcs" },
  { title: "Siding", slug: "siding-v1pvcs" },
  { title: "Walk in Tubs", slug: "walk-in-tubs-v1pvcs" },
];

export default function Home() {
  return (
    <div>
      <header className="topbar home-topbar">
        <div className="logo-wrap">
          <div className="logo-mark">///</div>
          <div className="logo-text">
            <div className="logo-small">REMODEL</div>
            <div className="logo-big">YOUR HOME</div>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Let us Take care of Your Home Project</h1>

            <ul className="hero-list">
              <li>
                <span className="check">✔</span>
                <span>
                  <strong>Free</strong> - Get the quote for your home project free
                  of charge.
                </span>
              </li>
              <li>
                <span className="check">✔</span>
                <span>
                  <strong>No obligation</strong> - Get quote without obligation to
                  purchase.
                </span>
              </li>
              <li>
                <span className="check">✔</span>
                <span>
                  <strong>Backup Available</strong> - Get up to 4 FREE quotes from
                  our partners if we are not servicing your area.
                </span>
              </li>
            </ul>

            <Link href="/roofing-v1pvcs" className="cta-link">
              <button className="cta">Get Started ›</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="services-section">
  <div className="services-grid">
    {services.map((item) => (
      <Link
        key={item.slug}
        href={`/${item.slug}`}
        className="service-link"
      >
        <div className="service-card">
          <div className="service-title">{item.title}</div>

          <img
            src={`/services/${item.slug.replace("-v1pvcs","")}.jpg`}
            className="service-image"
          />

          <div className="service-btn">Learn More</div>
        </div>
      </Link>
    ))}
  </div>
</section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <p>
          Our Team receives your request and call you to set an appointment for
          Free Inspection and Quote to get Started
        </p>
        <p>
          If you are outside our Service area, we help to connect you with our
          network of industry-leading contractors to get your home improvement
          projects done.
        </p>

        <div className="how-grid">
          <div className="how-card">
            <div className="how-icon">👍</div>
            <h3>Choose a project</h3>
            <p>
              Take our 30 seconds survey, answer a few questions about your needs
              and preferences for your upcoming home improvement project.
            </p>
          </div>

          <div className="how-card">
            <div className="how-icon">👥</div>
            <h3>Match with contractors</h3>
            <p>
              Our screening process ensures you have peace of mind. Whether we do
              the job for you, or we will match you with reliable and most
              recommended home improvement service professionals.
            </p>
          </div>

          <div className="how-card">
            <div className="how-icon">📋</div>
            <h3>Compare quote</h3>
            <p>
              If we won&apos;t be able to serve your area, we will send you up to
              4 FREE quotes by email, phone and text. Compare each quote, select
              your contractor and get started with your home project.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>©2026 leadlockerroom.com</div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Do Not Sell My Personal Information</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
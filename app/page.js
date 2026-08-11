"use client";

import Link from "next/link";
import Image from "next/image";

const services = [
  { title: "Solar", slug: "solar-v1pvcs", emoji: "☀️" },
  { title: "Roofing", slug: "roofing-v1pvcs", emoji: "🏠" },
  { title: "Windows", slug: "windows-v1pvcs", emoji: "🪟" },
  { title: "Bathroom", slug: "bathroom-v1pvcs", emoji: "🛁" },
  { title: "Gutters", slug: "gutters-v1pvcs", emoji: "🌧️" },
  { title: "HVAC", slug: "hvac-v1pvcs", emoji: "❄️" },
  { title: "Painting", slug: "painting-v1pvcs", emoji: "🎨" },
  { title: "Siding", slug: "siding-v1pvcs", emoji: "🏡" },
  { title: "Walk in Tubs", slug: "walk-in-tubs-v1pvcs", emoji: "🛀" },
  { title: "Artificial Turf", slug: "turf-v1pvcs", emoji: "🌿" },
  { title: "Pest Control", slug: "pest-control-v1pvcs", emoji: "🪲" },
  { title: "Home Security", slug: "home-security-v1pvcs", emoji: "🔒" },
];

function buildTrackedHref(slug) {
  if (typeof window === "undefined") return `/${slug}`;

  const params = new URLSearchParams(window.location.search);

  const allowedKeys = [
    "aff",
    "affiliate_id",
    "sub1",
    "sub2",
    "click_id",
    "clickid",
    "transaction_id",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  const nextParams = new URLSearchParams();

  for (const key of allowedKeys) {
    const value = params.get(key);
    if (value) nextParams.set(key, value);
  }

  const qs = nextParams.toString();
  return qs ? `/${slug}?${qs}` : `/${slug}`;
}

export default function Home() {


  return (
    <div className="rw-page">

      {/* HEADER */}
      <header className="rw-header">
        <div className="rw-logo">
          <span className="rw-logo-badge">RW</span>
          <div className="rw-logo-text">
            <span className="rw-logo-top">REMODEL</span>
            <span className="rw-logo-bottom">WIZ</span>
          </div>
        </div>
        <div className="rw-tagline-header">Your Home Improvement Wizard ✨</div>
      </header>

      {/* HERO */}
      <section className="rw-hero">
        <div className="rw-hero-left">
          <div className="rw-hero-eyebrow">⭐ Trusted by 10,000+ Homeowners</div>
          <h1 className="rw-hero-title">
            See Which Home Improvement Programs <span>You Qualify For</span>
          </h1>
          <p className="rw-hero-sub">
            We match you with top-rated local contractors offering no upfront cost programs for solar, windows, HVAC, roofing, and more.
          </p>
          <ul className="rw-hero-list">
            <li><span className="rw-check">✔</span><span><strong>Free Quotes</strong> — Zero cost, zero obligation.</span></li>
            <li><span className="rw-check">✔</span><span><strong>Top Contractors</strong> — Screened and matched to your area.</span></li>
            <li><span className="rw-check">✔</span><span><strong>No Upfront Cost Programs</strong> — Available in most areas.</span></li>
          </ul>
          <div className="rw-hero-cta-row">
            <a href="#services" className="rw-cta-link">
              <button className="rw-cta-btn">See What You Qualify For ›</button>
            </a>
            <span className="rw-hero-social-proof">Takes only <strong>30 seconds</strong></span>
          </div>
        </div>
        <div className="rw-hero-right">
          <Image
            src="/remodel-wizard.webp"
            alt="Remodel Wiz Mascot"
            width={420}
            height={420}
            className="rw-mascot"
            priority
          />
        </div>
      </section>

      {/* STATS BAR */}
      <div className="rw-stats">
        <div className="rw-stats-inner">
          <div className="rw-stat">
            <span className="rw-stat-icon">🏠</span>
            <div className="rw-stat-text">
              <strong>10,000+</strong>
              <span>Homeowners Helped</span>
            </div>
          </div>
          <div className="rw-stat">
            <span className="rw-stat-icon">⭐</span>
            <div className="rw-stat-text">
              <strong>4.9 / 5.0</strong>
              <span>Average Rating</span>
            </div>
          </div>
          <div className="rw-stat">
            <span className="rw-stat-icon">💰</span>
            <div className="rw-stat-text">
              <strong>$0 Upfront</strong>
              <span>Programs Available</span>
            </div>
          </div>
          <div className="rw-stat">
            <span className="rw-stat-icon">⚡</span>
            <div className="rw-stat-text">
              <strong>30 Seconds</strong>
              <span>To Check Eligibility</span>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="rw-services">
        <h2 className="rw-section-title">What Do You Need Done?</h2>
        <p className="rw-section-sub">Select your project and see if you qualify for a no upfront cost program in your area.</p>
        <div className="rw-services-grid">
          {services.map((item) => (
            <Link
              key={item.slug}
              href={buildTrackedHref(item.slug)}
              className="rw-service-link"
            >
              <div className="rw-service-card">
                <div className="rw-service-img-wrap">
                  <Image
                    src={["turf-v1pvcs", "pest-control-v1pvcs", "home-security-v1pvcs"].includes(item.slug) ? `/services/${item.slug.replace("-v1pvcs", "")}.png` : `/services/${item.slug.replace("-v1pvcs", "")}.webp`}
                    className="rw-service-img"
                    alt={item.title}
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                  <div className="rw-service-overlay" />
                </div>
                <div className="rw-service-footer">
                  <span className="rw-service-emoji">{item.emoji}</span>
                  <span className="rw-service-name">{item.title}</span>
                  <span className="rw-service-arrow">›</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="rw-how">
        <h2 className="rw-section-title">How It Works</h2>
        <p className="rw-how-sub">
          Answer a few quick questions and we&apos;ll match you with top contractors in your area — completely free.
        </p>
        <div className="rw-how-grid">
          <div className="rw-how-card">
            <div className="rw-how-num">1</div>
            <div className="rw-how-icon">📋</div>
            <h3>Tell Us Your Project</h3>
            <p>Answer a quick 30-second survey about your home improvement needs.</p>
          </div>
          <div className="rw-how-card">
            <div className="rw-how-num">2</div>
            <div className="rw-how-icon">🧙</div>
            <h3>We Work Our Magic</h3>
            <p>We match you with screened, reliable contractors in your area.</p>
          </div>
          <div className="rw-how-card">
            <div className="rw-how-num">3</div>
            <div className="rw-how-icon">🏆</div>
            <h3>Compare &amp; Choose</h3>
            <p>Get up to 4 FREE quotes, compare, and pick the best fit for you.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="rw-footer">
        <div className="rw-footer-logo">
          <span className="rw-logo-badge sm">RW</span>
          <span className="rw-footer-brand">ReModelWiz.com</span>
        </div>
        <div className="rw-footer-copy">©2026 ReModelWiz.com · All rights reserved</div>
        <div className="rw-footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <span>·</span>
          <a href="/terms">Terms of Use</a>
          <span>·</span>
          <a href="/do-not-sell-my-personal-information">Do Not Sell My Info</a>
          <span>·</span>
          <a href="#">Contact Us</a>
        </div>
      </footer>

    </div>
  );
}

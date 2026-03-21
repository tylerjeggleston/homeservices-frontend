"use client";

import Link from "next/link";
import Image from "next/image";

const services = [
  { title: "Roofing", slug: "roofing-v1pvcs", emoji: "🏠" },
  { title: "Windows", slug: "windows-v1pvcs", emoji: "🪟" },
  { title: "Solar", slug: "solar-v1pvcs", emoji: "☀️" },
  { title: "Bathroom", slug: "bathroom-v1pvcs", emoji: "🛁" },
  { title: "Gutters", slug: "gutters-v1pvcs", emoji: "🌧️" },
  { title: "HVAC", slug: "hvac-v1pvcs", emoji: "❄️" },
  { title: "Painting", slug: "painting-v1pvcs", emoji: "🎨" },
  { title: "Siding", slug: "siding-v1pvcs", emoji: "🏡" },
  { title: "Walk in Tubs", slug: "walk-in-tubs-v1pvcs", emoji: "🛀" },
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
          <h1 className="rw-hero-title">
            Let the Wizard Handle Your Home Project
          </h1>
          <ul className="rw-hero-list">
            <li><span className="rw-check">✔</span><span><strong>Free Quotes</strong> — No cost, no obligation to purchase.</span></li>
            <li><span className="rw-check">✔</span><span><strong>Top Contractors</strong> — Matched to your area and project.</span></li>
            <li><span className="rw-check">✔</span><span><strong>Up to 4 FREE Quotes</strong> — From our trusted partner network.</span></li>
          </ul>
          <Link href={buildTrackedHref("roofing-v1pvcs")} className="rw-cta-link">
            <button className="rw-cta-btn">Get Your Free Quote ›</button>
          </Link>
        </div>
        <div className="rw-hero-right">
          <Image
            src="/remodel-wizard.png"
            alt="Remodel Wiz Mascot"
            width={420}
            height={420}
            className="rw-mascot"
            priority
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="rw-services">
        <h2 className="rw-section-title">What Can the Wizard Fix for You?</h2>
        <div className="rw-services-grid">
          {services.map((item) => (
            <Link
              key={item.slug}
              href={buildTrackedHref(item.slug)}
              className="rw-service-link"
            >
              <div className="rw-service-card">
                <div className="rw-service-img-wrap">
                  <img
                    src={`/services/${item.slug.replace("-v1pvcs", "")}.jpg`}
                    className="rw-service-img"
                    alt={item.title}
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
        <h2 className="rw-section-title">How the Magic Works</h2>
        <p className="rw-how-sub">
          We connect homeowners with the best local contractors — fast, free, and hassle-free.
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

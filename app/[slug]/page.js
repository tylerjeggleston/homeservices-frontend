import { notFound } from "next/navigation";
import ServiceFunnel from "../../components/ServiceFunnel";
import { funnelConfigs } from "../../components/funnelConfigs";
import Link from "next/link";

export function generateStaticParams() {
  return Object.keys(funnelConfigs).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const config = funnelConfigs[params.slug];

  if (!config) {
    return {
      title: "Remodel Your Home",
      description: "Remodel funnel demo",
    };
  }

  return {
    title: "Remodel Your Home",
    description: config.heading || "Remodel funnel demo",
  };
}

export default function ServicePage({ params }) {
  const config = funnelConfigs[params.slug];

  if (!config) {
    notFound();
  }

  return (
    <div className="roofing-page">
      <header className="topbar">
      <Link href="/" className="logo-link">
    <div className="rw-logo">
      <span className="rw-logo-badge">RW</span>
      <div className="rw-logo-text">
        <span className="rw-logo-top">REMODEL</span>
        <span className="rw-logo-bottom">WIZ</span>
      </div>
    </div>
  </Link>

        <div className="header-right">
          <span className="service-dot">●</span>
          <span className="service-text">24-Hour Service</span>
          <span className="divider">|</span>

        </div>
      </header>

      <main className="funnel-page-wrap">
        <h1 className="funnel-title">{config.heading}</h1>
        <p className="funnel-subtitle">It only takes 30 seconds.</p>

        <ServiceFunnel config={{ ...config, slug: params.slug }} />
      </main>
    </div>
  );
}
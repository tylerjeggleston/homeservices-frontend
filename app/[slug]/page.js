import { notFound } from "next/navigation";
import ServiceFunnel from "../../components/ServiceFunnel";
import { funnelConfigs } from "../../components/funnelConfigs";

export function generateStaticParams() {
  return Object.keys(funnelConfigs).map((slug) => ({ slug }));
}

export default function ServicePage({ params }) {
  const config = funnelConfigs[params.slug];

  if (!config) {
    notFound();
  }

  return (
    <div className="roofing-page">
      <header className="topbar">
        <div className="logo-wrap">
          <div className="logo-mark">///</div>
          <div className="logo-text">
            <div className="logo-small">REMODEL</div>
            <div className="logo-big">YOUR HOME</div>
          </div>
        </div>

        <div className="header-right">
          <span className="service-dot">●</span>
          <span className="service-text">24-Hour Service</span>
          <span className="divider">|</span>
          <span className="phone-number">📞 {config.phoneNumber || "(888) 411-3127"}</span>

        </div>
      </header>

      <main className="funnel-page-wrap">
        <h1 className="funnel-title">{config.heading}</h1>
        <p className="funnel-subtitle">It only takes 30 seconds.</p>

        <ServiceFunnel config={config} />
      </main>
    </div>
  );
}
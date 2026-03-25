import { notFound } from "next/navigation";
import ServiceFunnel from "../../components/ServiceFunnelOTP";
import { funnelConfigs } from "../../components/funnelConfigs";
import HomeLogoButton from "../../components/HomeLogoButton";

export function generateStaticParams() {
  return Object.keys(funnelConfigs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const config = funnelConfigs[slug];

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

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const config = funnelConfigs[slug];

  if (!config) {
    notFound();
  }

  return (
    <div className="roofing-page">
      <header className="topbar">
        <HomeLogoButton />

        <div className="header-right">
          <span className="service-dot">●</span>
          <span className="service-text">24-Hour Service</span>
          <span className="divider">|</span>
        </div>
      </header>

      <main className="funnel-page-wrap">
        <h1 className="funnel-title">{config.heading}</h1>
        <p className="funnel-subtitle">It only takes 30 seconds.</p>

        <ServiceFunnel config={{ ...config, slug }} />
      </main>
    </div>
  );
}
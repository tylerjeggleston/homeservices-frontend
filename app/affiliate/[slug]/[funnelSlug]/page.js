import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { AFFILIATES } from "../../../../lib/affiliates";
import { funnelConfigs } from "../../../../components/funnelConfigs";
import HomeLogoButton from "../../../../components/HomeLogoButton";
import AffiliatePixel from "../../../../components/AffiliatePixel";

const ServiceFunnel = dynamic(() => import("../../../../components/ServiceFunnel"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});

export async function generateMetadata({ params }) {
  const { funnelSlug } = await params;
  const config = funnelConfigs[funnelSlug];
  return {
    title: "Remodel Your Home",
    description: config?.heading || "Remodel funnel for home improvement services",
  };
}

export default async function AffiliateFunnelPage({ params }) {
  const { slug, funnelSlug } = await params;

  const affiliate = AFFILIATES[slug];
  if (!affiliate) notFound();

  const config = funnelConfigs[funnelSlug];
  if (!config) notFound();

  return (
    <>
      <link rel="preload" as="image" href="/single-family-home.webp" />
    <div className="roofing-page">
      <AffiliatePixel pixelId={affiliate.pixelId} />

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
        <ServiceFunnel config={{ ...config, slug: funnelSlug, affiliateSlug: slug }} />
      </main>
    </div>
    </>
  );
}

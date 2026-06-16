import { notFound } from "next/navigation";
import nextDynamic from "next/dynamic";
import { headers } from "next/headers";
import { funnelConfigs } from "../../components/funnelConfigs";
import { getStateFromHeaders } from "../../lib/geoState";
import HomeLogoButton from "../../components/HomeLogoButton";

const ServiceFunnel = nextDynamic(() => import("../../components/ServiceFunnel"), {
  loading: () => <div style={{ minHeight: "400px" }} />,
});

export const dynamic = "force-dynamic";

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

  const headersList = await headers();
  const userState = await getStateFromHeaders(headersList);

  return (
    <>
      {/* Preload first funnel step image so browser discovers it immediately */}
      <link rel="preload" as="image" href="/single-family-home.webp" />
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
        <ServiceFunnel config={{ ...config, slug, userState }} />
      </main>
    </div>
    </>
  );
}